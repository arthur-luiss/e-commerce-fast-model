import { useMemo, useState } from 'react';
import { AuthContext } from './auth-context';

function readStoredSession() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    return user && token ? { user, token } : { user: null, token: null };
  } catch (error) {
    console.error('Não foi possível carregar a sessão salva:', error);
    return { user: null, token: null };
  }
}

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession);

  const value = useMemo(
    () => ({
      user: session.user,
      token: session.token,
      isAuthenticated: Boolean(session.user && session.token),
      login: (user, token) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setSession({ user, token });
      },
      logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setSession({ user: null, token: null });
      },
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
