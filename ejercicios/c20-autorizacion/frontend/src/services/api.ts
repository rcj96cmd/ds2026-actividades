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
  const token = await obtenerToken();
  
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

  let cuerpo: any = null;
  
  try {
    cuerpo = await res.json();
  } catch (e) {

  }

  // Verificar status codes y lanzar el mensaje real del backend
  if (!res.ok) {
    // Para 401 con token → disparar evento de sesión expirada
    if (res.status === 401 && token) {
      window.dispatchEvent(new Event('sesion-expirada'));
    }
    
    throw new ApiError(res.status, cuerpo?.error ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}

export { ApiError, obtenerToken };
