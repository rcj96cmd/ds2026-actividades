import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-libreria">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div>
            <span className="footer-brand">📚 Librería</span>
            <p className="footer-tagline">Tu próxima lectura favorita te espera.</p>
          </div>
          <nav className="d-flex gap-4">
            <Link to="/" className="footer-link">Inicio</Link>
            <Link to="/catalogo" className="footer-link">Catálogo</Link>
            <Link to="/contacto" className="footer-link">Contacto</Link>
          </nav>
        </div>
        <hr className="footer-divider" />
        <p className="footer-copy">
          © {new Date().getFullYear()} Librería — Ejercicio C09 · DS26 UTN FRLP
        </p>
      </Container>
    </footer>
  );
}

export default Footer;