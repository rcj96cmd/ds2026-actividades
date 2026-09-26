import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { apiFetch } from '../services/api';
import type { Usuario, Credenciales, AuthContextType } from '../types/sesionType';
import { guardarToken, borrarToken, obtenerToken } from '../services/sesion';

// Creamos el tipo del contexto (nulo o AuthContextType)
const AuthContext = createContext<AuthContextType | null>(null);

// Provider que envuelve todo
export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true); // Empieza en true
  
  // Calculados para facilitar el uso
  const estaAutenticado = usuario !== null;
  const tieneRol = (rol: string): boolean => {
    return usuario?.rol === rol;
  };

  // Función login
  const login = async (credenciales: Credenciales) => {
    try {

      const resultado = await apiFetch<{
        token: string;
        usuario: Usuario;
      }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credenciales),
      });
      
      guardarToken(resultado.token);
      setUsuario(resultado.usuario);
    } catch (error) {
      console.error('Error al login:', error);
      throw error;
    }
  };

  const logout = () => {
    borrarToken();
  };


  useEffect(() => {
    const verificarSesion = async () => {
      const token = await obtenerToken();
      
      if (!token) {
        setCargando(false);
        return;
      }
      
      try {
        const respuesta = await apiFetch<Usuario>('/auth/yo');
        
        setUsuario(respuesta);
      } catch (error) {
        console.error('Error de autenticación:', error);
        borrarToken();
      } finally {
        setCargando(false);
      }
    };
    
    verificarSesion();
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

export default AuthContext;
