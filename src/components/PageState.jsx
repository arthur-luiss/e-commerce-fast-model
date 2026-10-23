export function PageLoading({ label = 'Carregando...' }) {
  return (
    <div role="status" className="py-20 text-center text-sm text-slate-500">
      {label}
    </div>
  );
}

export function PageError({ onRetry, message = 'Não foi possível carregar os dados.' }) {
  return (
    <div role="alert" className="py-20 text-center">
      <p className="text-slate-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold hover:border-slate-900"
        >
          Tentar de novo
        </button>
      )}
    </div>
  );
}