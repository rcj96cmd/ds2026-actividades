import { Container, Button } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { libros } from "../data/libros";

function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const libro = libros.find((l) => l.id === Number(id));

  if (!libro) {
    return (
      <Container className="page-section">
        <p className="search-error">Libro no encontrado.</p>
        <Link to="/catalogo">Volver al catálogo</Link>
      </Container>
    );
  }

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
            <h5 className="libro-detalle-autor">{libro.autor}</h5>
            <p className="libro-detalle-descripcion">{libro.descripcion}</p>
            <p className="libro-detalle-precio">
              Precio: <span style={{ color: "var(--color-primary)" }}>{libro.precio}</span>
            </p>
            <div className="d-flex gap-3">
              <Button className="btn-comprar">Comprar</Button>
              <Button
                variant="outline-secondary"
                onClick={() => navigate(-1)}
                className="btn-volver"
              >
                Volver
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default LibroDetalle;