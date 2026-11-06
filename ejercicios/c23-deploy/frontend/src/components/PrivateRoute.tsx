import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ rol }: { rol?: string }) {
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

  // Si no hay usuario autenticado, redirigir a login recordando la página de origen
  if (!usuario) {
    return <Navigate to="/login" state={{ desde: location.pathname }} replace />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene, mostrar sin-permiso
  if (rol && usuario.rol !== rol) {
    return <Navigate to="/sin-permiso" replace />;
  }

  // Autorizado: la ruta hija se renderiza en el Outlet
  return <Outlet />;
}

export default PrivateRoute;
