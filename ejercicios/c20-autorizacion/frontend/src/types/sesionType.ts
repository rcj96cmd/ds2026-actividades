// frontend/src/types/sesionType.ts

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  rol: string;
}

export interface Credenciales {
  email: string;
  password: string;
}

export interface Sesion {
  token: string;
  usuario: Usuario | null;
}

export interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  tieneRol: (rol: string) => boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
}
