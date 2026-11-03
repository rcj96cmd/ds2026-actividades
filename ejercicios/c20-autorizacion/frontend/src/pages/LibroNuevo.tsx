import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import LibroForm from "../components/LibroForm";
import { apiFetch } from '../services/api';
import type { LibroDatos } from "../types/libro";

function LibroNuevo() {
  const navigate = useNavigate();

  const guardar = async (datos: LibroDatos) => {
    await apiFetch('/libros', {
      method: 'POST',
      body: JSON.stringify(datos)
    });

    alert("Libro agregado correctamente");
    navigate("/catalogo");
  };

  return (
    <section className="page-section">
      <Container style={{ maxWidth: 480 }}>
        <h2 className="section-title">Nuevo libro</h2>
        <LibroForm textoBoton="Agregar libro" onGuardar={guardar} />
      </Container>
    </section>
  );
}

export default LibroNuevo;
