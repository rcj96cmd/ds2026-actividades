const TOKEN_KEY = "token";

export async function guardarToken(token: string): Promise<void> {
  localStorage.setItem(TOKEN_KEY, token);
}

export async function obtenerToken(): Promise<string | null> {
  return localStorage.getItem(TOKEN_KEY);
}

export async function borrarToken(): Promise<void> {
  localStorage.removeItem(TOKEN_KEY);
  location.reload();  // Recargar para desloguearse
}
