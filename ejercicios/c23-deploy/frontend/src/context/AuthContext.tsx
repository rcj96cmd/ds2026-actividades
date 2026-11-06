import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { apiFetch } from '../services/api';
import type { Usuario, Credenciales, AuthContextType } from '../types/sesionType';
import { guardarToken, borrarToken, obtenerToken } from '../services/sesion';

export const AuthContext = createContext<AuthContextType | null>(null);

// Provider que envuelve todo
export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(obtenerToken() !== null);
  
  // Calculados para facilitar el uso
  const estaAutenticado = usuario !== null;
  const tieneRol = (rol: string): boolean => {
    return usuario?.rol === rol;
  };

  // Función login
  const login = async (credenciales: Credenciales) => {
    const resultado = await apiFetch<{
      token: string;
      usuario: Usuario;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });

    guardarToken(resultado.token);
    setUsuario(resultado.usuario);
  };

  const logout = () => {
    borrarToken();
    setUsuario(null);
  };

  useEffect(() => {
    if (!obtenerToken()) return;

    apiFetch<Usuario>('/auth/yo')
      .then(setUsuario)
      .catch(() => borrarToken())
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    // Escuchar el evento que dispara apiFetch ante un 401 con token
    window.addEventListener('sesion-expirada', logout);

    // Limpiar listener al desmontar
    return () => {
      window.removeEventListener('sesion-expirada', logout);
    };
  }, []);

  const valor = {
    usuario,
    cargando,
    estaAutenticado,
    tieneRol,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={valor}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return contexto;
}
