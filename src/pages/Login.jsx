import { useState } from "react";

const inputClasses =
  "mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [notice, setNotice] = useState("");

  const selectMode = (nextMode) => {
    setMode(nextMode);
    setNotice("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    if (
      mode === "register" &&
      form.get("password") !== form.get("passwordConfirmation")
    ) {
      setNotice(
        "As senhas não coincidem. Confira os campos e tente novamente.",
      );
      return;
    }

    setNotice(
      "A autenticação ainda não está conectada. Seus dados não foram enviados.",
    );
  };

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-9">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Sua conta
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            Bem-vindo à Fast Model
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Entre ou crie sua conta para continuar.
          </p>
        </div>

        <div
          className="mb-7 grid grid-cols-2 rounded-full bg-slate-100 p-1"
          role="tablist"
          aria-label="Acesso à conta"
        >
          {[
            { id: "login", label: "Entrar" },
            { id: "register", label: "Criar Conta" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${tab.id}-tab`}
              aria-selected={mode === tab.id}
              aria-controls={`${tab.id}-panel`}
              onClick={() => selectMode(tab.id)}
              className={`rounded-full cursor-pointer px-4 py-2.5 text-sm font-semibold transition-colors ${
                mode === tab.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form
          id={`${mode}-panel`}
          role="tabpanel"
          aria-labelledby={`${mode}-tab`}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {mode === "register" && (
            <div>
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-slate-700"
              >
                Nome completo
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                className={inputClasses}
                placeholder="Seu nome"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputClasses}
              placeholder="voce@exemplo.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              required
              className={inputClasses}
              placeholder="Digite sua senha"
            />
          </div>

          {mode === "register" ? (
            <div>
              <label
                htmlFor="passwordConfirmation"
                className="text-sm font-medium text-slate-700"
              >
                Confirmação de senha
              </label>
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                autoComplete="new-password"
                required
                className={inputClasses}
                placeholder="Digite sua senha novamente"
              />
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-slate-900 focus:ring-slate-400"
                />
                Lembrar de mim
              </label>
              <button
                type="button"
                onClick={() =>
                  setNotice("A recuperação de senha ainda não está disponível.")
                }
                className="font-medium text-slate-700 cursor-pointer underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
              >
                Esqueceu a senha?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-full cursor-pointer bg-slate-900 py-3.5 text-sm font-bold text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            {mode === "login" ? "Entrar" : "Criar minha conta"}
          </button>
        </form>

        {notice && (
          <p
            role="status"
            className="mt-5 rounded-lg cursor-pointer bg-slate-100 px-4 py-3 text-sm text-slate-700"
          >
            {notice}
          </p>
        )}
      </div>
    </section>
  );
}
