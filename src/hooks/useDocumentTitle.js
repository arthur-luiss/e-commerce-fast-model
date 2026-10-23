import { useEffect } from 'react';
import { brand } from '../config/brand';

export function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} | ${brand.name}`;
    return () => {
      document.title = previous;
    };
  }, [title]);
}