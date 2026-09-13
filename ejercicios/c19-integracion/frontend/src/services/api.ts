import { obtenerToken } from "./sesion";

const BASE = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(
  ruta: string, 
  opciones: RequestInit = {}
): Promise<T> {
  const token = await obtenerToken();
  
  // Construir headers con Authorization si hay token
  const headersWithAuth = token 
    ? { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...(opciones.headers || {})
      }
    : { "Content-Type": "application/json", ...opciones.headers };

  // Realizar la petición
  const res = await fetch(`${BASE}${ruta}`, { 
    ...opciones,
    headers: headersWithAuth 
  });

  // Manejar respuestas exitosas
  const cuerpo = await res.json().catch(() => null);  // ← El 404 de ruta viene en HTML

  // Verificar status codes y lanzar el mensaje real del backend
  if (!res.ok) {
    throw new Error(cuerpo?.error ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}
