import { useState, useEffect } from "react";
import { apiFetch } from "../services/api";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  recargar: () => void;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);
        const resultado = await apiFetch<T>(url);
        setData(resultado);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [url, version]);

  const recargar = () => setVersion((actual) => actual + 1);

  return { data, loading, error, recargar };
}
