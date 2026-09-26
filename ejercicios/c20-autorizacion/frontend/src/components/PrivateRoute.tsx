import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children?: ReactNode;
  rol?: string;
}

function PrivateRoute({ children, rol }: PrivateRouteProps) {
  const { usuario, cargando } = useAuth();
  const location = useLocation();

  // Si aún se está cargando la sesión, mostrar Spinner
  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // Si no hay usuario autenticado, redirigir a login
  if (!usuario) {
    const from = location.state?.from?.pathname || "/catalogo";
    return <Navigate to="/login" state={{ from }} replace />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene, mostrar sin-permiso
  if (rol && usuario.rol !== rol) {
    return <Navigate to="/sin-permiso" replace />;
  }

  // Autorizado - usar Outlet para layout route o renderizar children si es componente inline
  return (
    <>
      {children}
      <Outlet />
    </>
  );
}

export default PrivateRoute;
