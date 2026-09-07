import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import libreriaImg from "../assets/libreria.jpg";
import BookCard from "../components/BookCard";
import { libros } from "../data/libros";

function Home() {
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
          <Button as={Link as any} to="/catalogo" className="btn-accent">
            Ver catálogo
          </Button>
        </Container>
      </section>

      <section className="page-section">
        <Container>
          <h2 className="section-title">Libros destacados</h2>
          <p className="section-subtitle">Explorá nuestra colección de títulos destacados.</p>
          <Row xs={1} sm={2} md={3} className="g-4">
            {libros.map((libro) => (
              <Col key={libro.id}>
                <BookCard {...libro} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;