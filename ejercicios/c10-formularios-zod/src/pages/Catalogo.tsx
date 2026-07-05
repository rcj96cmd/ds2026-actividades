import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import BookCard from "../components/BookCard";
import type { Libro } from "../types/libro";

interface Props {
  libros: Libro[];
}

function Catalogo({ libros }: Props) {
  const [busqueda, setBusqueda] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  function buscarLibros() {
    const texto = busqueda.trim().toLowerCase();
    if (texto === "") {
      setError("Ingrese un libro para buscar.");
      setQuery("");
      return;
    }
    setError("");
    setQuery(texto);
  }

  const librosMostrados = query
    ? libros.filter(
        (l) =>
          l.titulo.toLowerCase().includes(query) ||
          l.autor.toLowerCase().includes(query)
      )
    : libros;

  return (
    <section className="page-section">
      <Container>
        <h2 className="section-title">Catálogo</h2>
        <p className="section-subtitle">Explorá nuestra colección completa.</p>

        <div className="d-flex gap-2 search-wrapper">
          <Form.Control
            type="text"
            placeholder="Buscar por título o autor..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscarLibros()}
          />
          <Button onClick={buscarLibros} className="btn-primary-libreria" style={{ whiteSpace: "nowrap" }}>
            Buscar
          </Button>
          {query && (
            <Button
              variant="outline-secondary"
              onClick={() => { setQuery(""); setBusqueda(""); setError(""); }}
              style={{ borderRadius: "var(--radius-btn)" }}
            >
              Ver todos
            </Button>
          )}
        </div>

        {error && <p className="search-error">{error}</p>}
        {query !== "" && librosMostrados.length === 0 && (
          <p className="search-error">No se encontraron libros.</p>
        )}

        <Row xs={1} sm={2} md={3} className="g-4">
          {librosMostrados.map((libro) => (
            <Col key={libro.id}>
              <BookCard {...libro} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Catalogo;