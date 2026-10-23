import Icon from './Icon';
import { steps, getStepIndex, getStepTime, getPaidAt } from '../utils/tracking';

const formatTime = (ms) =>
  new Date(ms).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

export default function OrderTimeline({ order, now }) {
  const current = getStepIndex(order, now);
  const paid = Boolean(getPaidAt(order));
  const last = steps.length - 1;

  return (
    <ol>
      {steps.map((step, i) => {
        const state =
          i < current || (i === current && i === last) ? 'done' : i === current ? 'current' : 'pending';
        const time = getStepTime(order, i);
        const reached = time !== null && time <= now;

        let detail = null;
        if (reached) detail = formatTime(time);
        else if (i === 1 && !paid) detail = 'Aguardando pagamento';

        const circle = {
          done: 'border-slate-900 bg-slate-900 text-white',
          current: 'border-slate-900 bg-white',
          pending: 'border-slate-200 bg-white',
        }[state];

        return (
          <li
            key={step.id}
            aria-current={state === 'current' ? 'step' : undefined}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            {i < last && (
              <span
                aria-hidden="true"
                className={`absolute left-3 top-6 h-full w-px -translate-x-1/2 ${
                  i < current ? 'bg-slate-900' : 'bg-slate-200'
                }`}
              />
            )}

            <span className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${circle}`}>
              {state === 'done' && <Icon name="check" className="h-3.5 w-3.5" />}
              {state === 'current' && <span className="h-2 w-2 rounded-full bg-slate-900" />}
            </span>

            <div className="-mt-0.5">
              <p
                className={`text-sm ${
                  state === 'pending' ? 'text-slate-400' : state === 'current' ? 'font-semibold' : 'font-medium'
                }`}
              >
                {step.label}
              </p>
              {detail && <p className="text-xs text-slate-500">{detail}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}