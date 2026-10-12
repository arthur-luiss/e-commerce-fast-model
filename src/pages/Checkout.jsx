import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Field from '../components/Field';
import { useCart } from '../hooks/useCart';
import { formatBRL } from '../utils/format';
import { getShipping } from '../utils/shipping';
import { maskCPF, maskPhone, maskCEP, maskCardNumber, maskExpiry, onlyDigits } from '../utils/masks';
import { validateCheckout } from '../utils/validators';
import { createOrderId, createPaymentCode, saveOrder } from '../utils/orders';

const initialForm = {
  name: '', email: '', cpf: '', phone: '',
  cep: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '',
  method: 'pix',
  cardNumber: '', cardName: '', cardExpiry: '', cardCvv: '', installments: '1',
};

const masks = {
  cpf: maskCPF,
  phone: maskPhone,
  cep: maskCEP,
  cardNumber: maskCardNumber,
  cardExpiry: maskExpiry,
  cardCvv: (v) => onlyDigits(v).slice(0, 4),
  state: (v) => v.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase(),
};

const methods = [
  { id: 'pix', label: 'Pix', desc: 'Aprovação imediata' },
  { id: 'card', label: 'Cartão de crédito', desc: 'Em até 6x sem juros' },
  { id: 'boleto', label: 'Boleto', desc: 'Vence em 3 dias' },
];

const cepMessages = {
  loading: 'Buscando endereço...',
  notfound: 'CEP não encontrado. Preencha o endereço manualmente.',
  error: 'Não foi possível buscar o CEP. Preencha o endereço manualmente.',
};

function Section({ title, children }) {
  return (
    <section className="rounded-xl border border-slate-200 p-6">
      <h2 className="mb-5 text-base font-bold">{title}</h2>
      {children}
    </section>
  );
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [attempts, setAttempts] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [cepStatus, setCepStatus] = useState('idle');
  const lastCep = useRef('');

  // Depois de uma tentativa com erro, leva o foco ao primeiro campo inválido
  useEffect(() => {
    if (attempts === 0) return;
    const el = document.querySelector('[aria-invalid="true"]');
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    el?.focus({ preventScroll: true });
  }, [attempts]);

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Seu carrinho está vazio</h1>
        <p className="mt-2 text-slate-500">Adicione produtos para finalizar a compra.</p>
        <Link
          to="/catalogo"
          className="mt-6 inline-block rounded-full bg-slate-900 px-8 py-3 text-sm font-bold text-white hover:bg-slate-700"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  const shipping = getShipping(subtotal);
  const total = subtotal + shipping;

  const update = (field, value) => {
    const masked = masks[field] ? masks[field](value) : value;
    setForm((f) => ({ ...f, [field]: masked }));
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  };

  const bind = (field) => ({
    value: form[field],
    error: errors[field],
    onChange: (e) => update(field, e.target.value),
  });

  const lookupCep = async (cep) => {
    lastCep.current = cep;
    setCepStatus('loading');
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (lastCep.current !== cep) return; // chegou uma resposta antiga

      if (data.erro) {
        setCepStatus('notfound');
        return;
      }

      setForm((f) => ({
        ...f,
        street: data.logradouro || f.street,
        neighborhood: data.bairro || f.neighborhood,
        city: data.localidade || f.city,
        state: data.uf || f.state,
      }));
      setErrors((e) => ({
        ...e, cep: undefined, street: undefined, neighborhood: undefined, city: undefined, state: undefined,
      }));
      setCepStatus('ok');
    } catch {
      if (lastCep.current === cep) setCepStatus('error');
    }
  };

  const handleCep = (e) => {
    const masked = maskCEP(e.target.value);
    update('cep', masked);
    const digits = onlyDigits(masked);
    if (digits.length === 8) lookupCep(digits);
    else setCepStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const found = validateCheckout(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setAttempts((n) => n + 1);
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200)); // simula o processamento

    const id = createOrderId();
    const installments = form.method === 'card' ? Number(form.installments) : 1;

    saveOrder({
      id,
      createdAt: Date.now(),
      items,
      subtotal,
      shipping,
      total,
      customer: { name: form.name.trim(), email: form.email.trim() },
      address: {
        cep: form.cep,
        street: form.street.trim(),
        number: form.number.trim(),
        complement: form.complement.trim(),
        neighborhood: form.neighborhood.trim(),
        city: form.city.trim(),
        state: form.state,
      },
      // Só os 4 últimos dígitos do cartão são guardados
      payment: {
        method: form.method,
        installments,
        cardLast4: form.method === 'card' ? onlyDigits(form.cardNumber).slice(-4) : null,
        code: createPaymentCode(form.method, id),
      },
    });

    navigate(`/pedido/${id}`, { replace: true });
    clearCart();
  };

  return (
    <div className="pb-20">
      <h1 className="mb-8 text-2xl font-bold tracking-tight">Finalizar compra</h1>

      <div className="grid gap-10 lg:grid-cols-3">
        <form id="checkout-form" onSubmit={handleSubmit} noValidate className="space-y-8 lg:col-span-2">
          <Section title="1. Seus dados">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome completo" className="sm:col-span-2" autoComplete="name" {...bind('name')} />
              <Field label="E-mail" type="email" autoComplete="email" {...bind('email')} />
              <Field label="CPF" inputMode="numeric" placeholder="000.000.000-00" {...bind('cpf')} />
              <Field label="Telefone" type="tel" autoComplete="tel" placeholder="(00) 00000-0000" {...bind('phone')} />
            </div>
          </Section>

          <Section title="2. Entrega">
            <div className="grid gap-4 sm:grid-cols-6">
              <Field
                label="CEP"
                className="sm:col-span-2"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="00000-000"
                hint={cepMessages[cepStatus]}
                value={form.cep}
                error={errors.cep}
                onChange={handleCep}
              />
              <Field label="Rua" className="sm:col-span-4" autoComplete="address-line1" {...bind('street')} />
              <Field label="Número" className="sm:col-span-2" {...bind('number')} />
              <Field label="Complemento (opcional)" className="sm:col-span-4" {...bind('complement')} />
              <Field label="Bairro" className="sm:col-span-3" {...bind('neighborhood')} />
              <Field label="Cidade" className="sm:col-span-2" autoComplete="address-level2" {...bind('city')} />
              <Field label="UF" className="sm:col-span-1" autoComplete="address-level1" {...bind('state')} />
            </div>
          </Section>

          <Section title="3. Pagamento">
            <fieldset>
              <legend className="sr-only">Forma de pagamento</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {methods.map((m) => (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                      form.method === m.id
                        ? 'border-slate-900 bg-slate-50'
                        : 'border-slate-300 hover:border-slate-900'
                    }`}
                  >
                    <input
                      type="radio"
                      name="method"
                      value={m.id}
                      checked={form.method === m.id}
                      onChange={() => update('method', m.id)}
                      className="h-4 w-4 accent-slate-900"
                    />
                    <span>
                      <span className="block text-sm font-semibold">{m.label}</span>
                      <span className="block text-xs text-slate-500">{m.desc}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {form.method === 'card' && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Número do cartão"
                  className="sm:col-span-2"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="0000 0000 0000 0000"
                  {...bind('cardNumber')}
                />
                <Field
                  label="Nome impresso no cartão"
                  className="sm:col-span-2"
                  autoComplete="cc-name"
                  {...bind('cardName')}
                />
                <Field label="Validade" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/AA" {...bind('cardExpiry')} />
                <Field label="CVV" inputMode="numeric" autoComplete="cc-csc" placeholder="123" {...bind('cardCvv')} />

                <div className="sm:col-span-2">
                  <label htmlFor="installments" className="mb-1 block text-xs font-medium text-slate-600">
                    Parcelas
                  </label>
                  <select
                    id="installments"
                    value={form.installments}
                    onChange={(e) => update('installments', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-900"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {`${n}x de ${formatBRL(total / n)} sem juros`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {form.method === 'pix' && (
              <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                O código Pix será exibido na próxima tela, depois de finalizar o pedido.
              </p>
            )}

            {form.method === 'boleto' && (
              <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                O boleto será exibido na próxima tela e vence em 3 dias. O pedido só é processado após a confirmação do pagamento.
              </p>
            )}
          </Section>
        </form>

        <aside className="h-fit rounded-xl border border-slate-200 p-6 lg:sticky lg:top-32">
          <h2 className="mb-4 text-base font-bold">Resumo do pedido</h2>

          <ul className="max-h-72 space-y-4 overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.key} className="flex gap-3">
                <div className="h-20 w-16 shrink-0 overflow-hidden bg-slate-100">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="line-clamp-2">{item.title}</p>
                  <p className="text-xs text-slate-500">
                    Tam. {item.size} · Qtd. {item.quantity}
                  </p>
                  <p className="mt-1 font-semibold">{formatBRL(item.price * item.quantity)}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span>{formatBRL(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Frete</span>
              <span className={shipping === 0 ? 'font-semibold text-green-600' : ''}>
                {shipping === 0 ? 'Grátis' : formatBRL(shipping)}
              </span>
            </div>
            <div className="flex justify-between pt-2 text-base font-bold">
              <span>Total</span>
              <span>{formatBRL(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-slate-900 py-4 text-sm font-bold text-white transition-colors hover:bg-slate-700 disabled:cursor-wait disabled:opacity-60"
          >
            {submitting ? 'Processando...' : `Finalizar pedido · ${formatBRL(total)}`}
          </button>
          <p className="mt-3 text-center text-xs text-slate-400">
            Ambiente de demonstração: nenhum pagamento real é feito.
          </p>
        </aside>
      </div>
    </div>
  );
}