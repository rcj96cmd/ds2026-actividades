import { useState, useEffect } from "react";
import { apiFetch } from "../services/api";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        // ← CAMBIA: usa apiFetch en lugar de fetch directo
        const resultado = await apiFetch<T>(url);
        setData(resultado);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [url]);

  return { data, loading, error };
}
