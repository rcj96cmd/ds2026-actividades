import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
  rol?: string;
}

function PrivateRoute({ children, rol }: PrivateRouteProps) {
  const { usuario, cargando } = useAuth();
  const location = useLocation();

  // Si aún se está cargando la sesión
  if (cargando) {
    return <div className="loading">Cargando...</div>;
  }

  // Si no hay usuario autenticado
  if (!usuario) {
    const from = location.state?.from?.pathname || "/catalogo";
    return <Navigate to="/login" state={{ from }} replace />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene
  if (rol && usuario.rol !== rol) {
    return <Navigate to="/sin-permiso" replace />;
  }

  // Autorizado - renderizar los hijos del componente
  return <>{children}</>;
}

export default PrivateRoute;
