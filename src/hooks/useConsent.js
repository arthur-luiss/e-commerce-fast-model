import { useContext } from 'react';
import { ConsentContext } from '../context/consent-context';

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent deve ser usado dentro de <ConsentProvider>');
  return ctx;
}