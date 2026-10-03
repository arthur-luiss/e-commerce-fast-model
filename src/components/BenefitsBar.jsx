import Icon from './Icon';

const benefits = [
  { icon: 'truck', label: 'Frete grátis' },
  { icon: 'card', label: 'Parcelamento facilitado' },
  { icon: 'swap', label: 'Troca e devolução' },
  { icon: 'star', label: 'Marcas exclusivas' },
  { icon: 'diamond', label: 'Pix' },
  { icon: 'ticket', label: 'Cupons' },
  { icon: 'bolt', label: 'Entrega rápida' },
];

export default function BenefitsBar() {
  return (
    <div className="bg-[#8b807d] text-white">
      <ul className="mx-auto flex h-52px max-w-1400px items-center justify-start gap-8 overflow-x-auto whitespace-nowrap px-4 text-xs font-light scrollbar-width:none md:justify-center">
        {benefits.map(({ icon, label }) => (
          <li key={label} className="flex items-center gap-2">
            <Icon name={icon} className="h-5 w-5" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}