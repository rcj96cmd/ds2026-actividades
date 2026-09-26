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
  const [cargando, setCargando] = useState(true);
  
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
      // Manejo específico de errores comunes
      if (error instanceof Error) {
        const errorMessage = error.message;
        
        // Si el error tiene código de estado, usarlo para mostrar mensaje específico
        if (errorMessage.includes('401')) {
          console.warn('Error 401: Credenciales incorrectas');
        } else if (errorMessage.includes('403')) {
          console.warn('Error 403: Permiso denegado');
        }
      }
      
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
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      } finally {
        setCargando(false);
      }
    };
    
    verificarSesion();
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      console.log('Evento sesión-expirada recibido');
      
      borrarToken();
      setUsuario(null);
      setCargando(false);
      
      // Redirigir a login si no hay usuario
      if (!usuario) {
        window.location.href = '/login';
      }
    };

    // Escuchar el evento globalmente
    window.addEventListener('sesión-expirada', handleSessionExpired);
    
    // Limpiar listener al desmontar
    return () => {
      window.removeEventListener('sesión-expirada', handleSessionExpired);
    };
  }, [usuario]);

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
