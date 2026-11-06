import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import libreriaImg from "../assets/libreria.jpg";
import BookCard from "../components/BookCard";
import { useFetch } from "../hooks/useFetch";
import type { Libro } from "../types/libro";

const LIBROS_DESTACADOS = 6;

function Home() {
  const { data: libros, loading, error, recargar } = useFetch<Libro[]>("/libros");

  return (
    <>
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${libreriaImg})` }}
      >
        <div className="hero-overlay" />
        <Container className="text-center text-white position-relative">
          <p className="hero-eyebrow">Tu próxima gran lectura te espera</p>
          <h1 className="hero-title">
            Bienvenido a la<br />
            <span>Librería</span>
          </h1>
          <p className="hero-subtitle">
            Descubrí tu próxima lectura favorita entre cientos de títulos cuidadosamente seleccionados.
          </p>
          <Link to="/catalogo" className="btn btn-accent">
            Ver catálogo
          </Link>
        </Container>
      </section>

      <section className="page-section">
        <Container>
          <h2 className="section-title">Libros destacados</h2>
          <p className="section-subtitle">Explorá nuestra colección de títulos destacados.</p>
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          <Row xs={1} sm={2} md={3} className="g-4">
            {(libros ?? []).slice(0, LIBROS_DESTACADOS).map((libro) => (
              <Col key={libro.id}>
                <BookCard 
                  id={libro.id}
                  titulo={libro.titulo}
                  autor={libro.autor}
                  portada={libro.portada}
                  disponible={libro.disponible}
                  onBorrado={recargar}
                  />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;