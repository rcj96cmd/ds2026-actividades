import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import LibroForm from "../components/LibroForm";
import { useFetch } from "../hooks/useFetch";
import { apiFetch } from '../services/api';
import type { Libro, LibroDatos } from "../types/libro";

function LibroEditar() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: libro, loading } = useFetch<Libro>(`/libros/${id}`);

  if (loading) {
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

  const guardar = async (datos: LibroDatos) => {
    await apiFetch(`/libros/${id}`, {
      method: 'PUT',
      body: JSON.stringify(datos)
    });

    alert("Libro actualizado correctamente");
    navigate(`/libros/${id}`);
  };

  return (
    <section className="page-section">
      <Container style={{ maxWidth: 480 }}>
        <h2 className="section-title">Editar libro</h2>
        <LibroForm libro={libro} textoBoton="Guardar cambios" onGuardar={guardar} />
      </Container>
    </section>
  );
}

export default LibroEditar;
