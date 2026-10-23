import { useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/Field";
import { brand } from "../config/brand";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { isEmail } from "../utils/validators";
import { services } from "../services";

const { company } = brand;

const subjects = [
  "Dúvida sobre produto",
  "Acompanhamento de pedido",
  "Troca ou devolução",
  "Problema com pagamento",
  "Privacidade e dados pessoais",
  "Outro assunto",
];

const initialForm = { name: "", email: "", subject: "", message: "" };

function validate(f) {
  const errors = {};
  if (f.name.trim().length < 2) errors.name = "Informe seu nome.";
  if (!isEmail(f.email)) errors.email = "Informe um e-mail válido.";
  if (!f.subject) errors.subject = "Escolha um assunto.";
  if (f.message.trim().length < 10)
    errors.message = "Escreva pelo menos 10 caracteres.";
  return errors;
}

export default function Contact() {
  useDocumentTitle("Fale conosco");

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      await services.messages.create(form);
      setSent(true);
      setForm(initialForm);
    } catch {
      setSubmitError("Não foi possível enviar a mensagem. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = (hasError) =>
    `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors ${
      hasError
        ? "border-red-400 focus:border-red-500"
        : "border-slate-300 focus:border-slate-900"
    }`;

  return (
    <div className="pb-20">
      <nav aria-label="Você está em" className="mb-6 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-900">
          Início
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">Fale conosco</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight">Fale conosco</h1>
      <p className="mt-2 text-slate-500">
        Antes de escrever, veja se a sua dúvida já tem resposta nas{" "}
        <Link
          to="/institucional/perguntas-frequentes"
          className="font-semibold text-slate-900 underline"
        >
          perguntas frequentes
        </Link>
        .
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <aside className="space-y-5 text-sm">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400">
              E-mail
            </h2>
            <p className="mt-1 text-slate-700">{company.email}</p>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Telefone
            </h2>
            <p className="mt-1 text-slate-700">{company.phone}</p>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Horário de atendimento
            </h2>
            <p className="mt-1 text-slate-700">{company.hours}</p>
          </div>
        </aside>

        <div className="lg:col-span-2">
          {sent ? (
            <div
              role="status"
              className="rounded-xl border border-slate-200 p-8 text-center"
            >
              <h2 className="text-xl font-bold">Mensagem enviada</h2>
              <p className="mt-2 text-sm text-slate-500">
                {brand.demo
                  ? "Este é um site de demonstração: a mensagem foi guardada só neste navegador e nenhum e-mail foi enviado."
                  : "Recebemos a sua mensagem e vamos responder em breve."}
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold hover:border-slate-900"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4 rounded-xl border border-slate-200 p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Nome"
                  autoComplete="name"
                  value={form.name}
                  error={errors.name}
                  onChange={update("name")}
                />
                <Field
                  label="E-mail"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  error={errors.email}
                  onChange={update("email")}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-1 block text-xs font-medium text-slate-600"
                >
                  Assunto
                </label>
                <select
                  id="contact-subject"
                  value={form.subject}
                  aria-invalid={Boolean(errors.subject)}
                  onChange={update("subject")}
                  className={`${fieldClass(errors.subject)} bg-white`}
                >
                  <option value="">Selecione</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1 block text-xs font-medium text-slate-600"
                >
                  Mensagem
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  aria-invalid={Boolean(errors.message)}
                  onChange={update("message")}
                  className={`${fieldClass(errors.message)} resize-y`}
                />
                {errors.message && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              {submitError && <p role="alert" className="text-sm text-red-600">{submitError}</p>}
              <button
                type="submit"
                className="w-full rounded-full bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-700"
                disabled={submitting}
              >
                Enviar mensagem
              </button>
              <p className="text-xs text-slate-400">
                Usamos seus dados apenas para responder à sua mensagem. Saiba
                mais na{" "} 
                <Link
                  to="/institucional/politica-de-privacidade"
                  className="underline"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
