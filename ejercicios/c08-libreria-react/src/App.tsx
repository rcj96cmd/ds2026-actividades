import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import BookCard from "./components/BookCard";
import Contacto from "./components/Contacto";
import { libros } from "./data/libros";

function App() {
  const [pagina, setPagina] = useState("inicio");
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

  const sinResultados = query !== "" && librosMostrados.length === 0;

  return (
    <>
      <Navbar paginaActual={pagina} setPagina={setPagina} />

      {/* ——— INICIO ——— */}
      {pagina === "inicio" && (
        <>
          <Hero onVerCatalogo={() => setPagina("catalogo")} />
          <section style={{ padding: "60px 0" }}>
            <Container>
              <h2 style={{ fontWeight: 800, marginBottom: 8 }}>Libros destacados</h2>
              <p style={{ color: "#888", marginBottom: 32 }}>
                Explorá nuestra colección de títulos destacados.
              </p>
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
      )}

      {/* ——— CATÁLOGO ——— */}
      {pagina === "catalogo" && (
        <section style={{ padding: "60px 0" }}>
          <Container>
            <h2 style={{ fontWeight: 800, marginBottom: 8 }}>Catálogo</h2>
            <p style={{ color: "#888", marginBottom: 32 }}>
              Explorá nuestra colección completa de títulos.
            </p>
            <div className="d-flex gap-2 mb-4" style={{ maxWidth: 480 }}>
              <Form.Control
                type="text"
                placeholder="Buscar por título o autor..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && buscarLibros()}
              />
              <Button
                onClick={buscarLibros}
                style={{ backgroundColor: "#1a1a2e", borderColor: "#1a1a2e", borderRadius: 20, whiteSpace: "nowrap" }}
              >
                Buscar
              </Button>
              {query && (
                <Button
                  variant="outline-secondary"
                  onClick={() => { setQuery(""); setBusqueda(""); setError(""); }}
                  style={{ borderRadius: 20 }}
                >
                  Ver todos
                </Button>
              )}
            </div>
            {error && <p style={{ color: "#e74c3c", marginBottom: 16 }}>{error}</p>}
            {sinResultados && <p style={{ color: "#e74c3c" }}>No se encontraron libros.</p>}
            <Row xs={1} sm={2} md={3} className="g-4">
              {librosMostrados.map((libro) => (
                <Col key={libro.id}>
                  <BookCard {...libro} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* ——— CONTACTO ——— */}
      {pagina === "contacto" && <Contacto />}

      <Footer setPagina={setPagina} />
    </>
  );
}

export default App;