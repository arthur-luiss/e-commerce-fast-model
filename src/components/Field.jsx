import { useId } from 'react';

export default function Field({ label, error, hint, className = '', ...inputProps }) {
  const id = useId();
  const messageId = `${id}-message`;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-slate-600">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? messageId : undefined}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors ${
          error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-slate-900'
        }`}
        {...inputProps}
      />
      {error ? (
        <p id={messageId} role="alert" className="mt-1 text-xs text-red-600">
          {error}
        </p>
      ) : (
        hint && (
          <p id={messageId} className="mt-1 text-xs text-slate-500">
            {hint}
          </p>
        )
      )}
    </div>
  );
}