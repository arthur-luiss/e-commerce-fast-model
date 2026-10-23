import { useCallback, useEffect, useRef, useState } from 'react';

// Carrega dados assíncronos. `status`: 'loading' | 'ready' | 'error'.
export function useAsync(load, deps = []) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ key: null });
  const loadRef = useRef(load);
  const key = JSON.stringify([...deps, attempt]);

  useEffect(() => {
    loadRef.current = load;
  });

  useEffect(() => {
    let cancelled = false;
    loadRef.current().then(
      (data) => {
        if (!cancelled) setResult({ key, data });
      },
      (error) => {
        if (!cancelled) setResult((prev) => ({ key, data: prev.data, error }));
      }
    );
    return () => {
      cancelled = true;
    };
  }, [key]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);
  const settled = result.key === key;
  const status = !settled ? 'loading' : result.error ? 'error' : 'ready';

  return { data: result.data, status, error: result.error ?? null, reload };
}