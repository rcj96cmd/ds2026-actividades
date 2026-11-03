import { obtenerToken } from "./sesion";

const BASE = import.meta.env.VITE_API_URL;

class ApiError extends Error {
  status: number;
  
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(
  ruta: string, 
  opciones: RequestInit = {}
): Promise<T> {
  const token = obtenerToken();
  
  const headersWithAuth = token 
    ? { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...(opciones.headers || {})
      }
    : { "Content-Type": "application/json", ...opciones.headers };

  const res = await fetch(`${BASE}${ruta}`, { 
    ...opciones,
    headers: headersWithAuth 
  });

  let cuerpo: unknown = null;

  try {
    cuerpo = await res.json();
  } catch {
    // La respuesta no trae JSON (por ejemplo, un 204 al borrar)
  }

  if (!res.ok) {
    if (res.status === 401 && token) {
      window.dispatchEvent(new Event('sesion-expirada'));
    }

    const mensaje = (cuerpo as { error?: string } | null)?.error;
    throw new ApiError(res.status, mensaje ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}

export { ApiError };
