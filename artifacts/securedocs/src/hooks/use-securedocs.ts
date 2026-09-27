import { useCallback, useEffect, useState } from 'react';
import { readDocuments, setTheme, writeDocuments, type SecureDocument } from '@/lib/securedocs-store';

export function useSecureDocs() {
  const [documents, setDocuments] = useState<SecureDocument[]>(readDocuments);
  const [theme, setThemeState] = useState(() => localStorage.getItem('securedocs-theme') || 'light');

  useEffect(() => {
    const syncDocs = () => setDocuments(readDocuments());
    const syncTheme = () => setThemeState(localStorage.getItem('securedocs-theme') || 'light');
    window.addEventListener('securedocs-documents', syncDocs);
    window.addEventListener('securedocs-theme', syncTheme);
    return () => {
      window.removeEventListener('securedocs-documents', syncDocs);
      window.removeEventListener('securedocs-theme', syncTheme);
    };
  }, []);

  const saveDocument = useCallback((document: SecureDocument) => {
    const next = readDocuments().some((item) => item.id === document.id)
      ? readDocuments().map((item) => item.id === document.id ? document : item)
      : [document, ...readDocuments()];
    writeDocuments(next);
    setDocuments(next);
  }, []);

  const deleteDocument = useCallback((id: string) => {
    const next = readDocuments().filter((item) => item.id !== id);
    writeDocuments(next);
    setDocuments(next);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    setThemeState(next);
  }, [theme]);

  return { documents, saveDocument, deleteDocument, theme, toggleTheme };
}