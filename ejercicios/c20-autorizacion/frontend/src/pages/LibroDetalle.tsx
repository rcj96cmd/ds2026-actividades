import { Container, Button, Spinner } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useFetch } from "../hooks/useFetch";
import { apiFetch } from "../services/api";
import type { Libro } from "../types/libro";

function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { usuario, tieneRol } = useAuth();

  const [loading, setLoading] = useState(false);

  const { data: libro, loading: cargando } = useFetch<Libro>(`/libros/${id}`);

  if (cargando) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!libro) {
    return (
      <Container className="page-section">
        <p className="search-error">Libro no encontrado.</p>
        <Link to="/catalogo">Volver al catálogo</Link>
      </Container>
    );
  }

  // EXTENSIÓN #4: Botones solo visibles para ADMIN
  const mostrarBotonesAdmin = usuario && tieneRol('ADMIN');

  const handleDelete = async () => {
    if (confirm(`¿Seguro que quieres eliminar "${libro.titulo}"?`)) {
      setLoading(true);
      
      try {
        await apiFetch(`/libros/${id}`, { method: 'DELETE' });

        alert("Libro eliminado correctamente");
        navigate('/catalogo');
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert("Hubo un error al eliminar el libro");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="page-section">
      <Container>
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <img
              src={libro.portada}
              alt={`Portada de ${libro.titulo}`}
              className="libro-detalle-img"
            />
          </div>
          
          <div className="col-md-8">
            <h1 className="libro-detalle-titulo">{libro.titulo}</h1>
            <h5 className="libro-detalle-autor">{libro.autor.nombre}</h5>
            <p className="libro-detalle-descripcion">{libro.descripcion}</p>
            <p className="libro-detalle-precio">
              Precio: <span style={{ color: "var(--color-primary)" }}>{libro.precio}</span>
            </p>
            
            <div className="d-flex gap-3 mb-4">
              <Button className="btn-comprar">Comprar</Button>
              
              {/* ⬅️ EXTENSIÓN #4: Solo visible para ADMIN */}
              {mostrarBotonesAdmin && (
                <>
                  <Button 
                    variant="outline-primary"
                    onClick={() => navigate(`/libros/${id}/editar`)}
                  >
                    Editar
                  </Button>
                  
                  <Button 
                    variant="danger"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    {loading ? '...' : 'Borrar'}
                  </Button>
                </>
              )}
              
              <Button
                variant="outline-secondary"
                onClick={() => navigate(-1)}
                className="btn-volver"
              >
                Volver
              </Button>
            </div>
            
            {mostrarBotonesAdmin && (
              <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <small className="text-muted">
                  <strong>ℹ️ Nota:</strong> Estos botones son exclusivos para administradores. 
                  Los clientes solo pueden comprar libros, no editar ni eliminarlos.
                </small>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default LibroDetalle;
