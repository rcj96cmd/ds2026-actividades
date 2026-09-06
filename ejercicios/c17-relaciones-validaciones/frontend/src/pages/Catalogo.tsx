import { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import BookCard from "../components/BookCard";
import { useFetch } from "../hooks/useFetch";
import type { Libro } from "../types/libro";

function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>("/libros.json");

  const [busqueda, setBusqueda] = useState("");
  const [query, setQuery] = useState("");
  const [errorBusqueda, setErrorBusqueda] = useState("");

  function buscarLibros() {
    const texto = busqueda.trim().toLowerCase();
    if (texto === "") {
      setErrorBusqueda("Ingrese un libro para buscar.");
      setQuery("");
      return;
    }
    setErrorBusqueda("");
    setQuery(texto);
  }

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const librosMostrados = query
    ? (libros ?? []).filter(
        (l) =>
          l.titulo.toLowerCase().includes(query) ||
          l.autor.toLowerCase().includes(query)
      )
    : libros ?? [];

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
              onClick={() => { setQuery(""); setBusqueda(""); setErrorBusqueda(""); }}
              style={{ borderRadius: "var(--radius-btn)" }}
            >
              Ver todos
            </Button>
          )}
        </div>

        {errorBusqueda && <p className="search-error">{errorBusqueda}</p>}
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