import { Container } from "react-bootstrap";

type Props = {
  setPagina: (pagina: string) => void;
};

function Footer({ setPagina }: Props) {
  return (
    <footer style={{ backgroundColor: "#1a1a2e", color: "#b0b8c8", padding: "40px 0 24px", marginTop: 80 }}>
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div>
            <span style={{ fontWeight: 800, fontSize: "1.3rem", color: "#f4c542" }}>
              📚 Librería
            </span>
            <p style={{ margin: "6px 0 0", fontSize: "0.88rem" }}>
              Tu próxima lectura favorita te espera.
            </p>
          </div>
          <nav className="d-flex gap-4">
            <span onClick={() => setPagina("inicio")} style={{ color: "#b0b8c8", fontSize: "0.9rem", cursor: "pointer" }}>Inicio</span>
            <span onClick={() => setPagina("catalogo")} style={{ color: "#b0b8c8", fontSize: "0.9rem", cursor: "pointer" }}>Catálogo</span>
            <span onClick={() => setPagina("contacto")} style={{ color: "#b0b8c8", fontSize: "0.9rem", cursor: "pointer" }}>Contacto</span>
          </nav>
        </div>
        <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "24px 0 16px" }} />
        <p style={{ textAlign: "center", fontSize: "0.82rem", margin: 0 }}>
          © {new Date().getFullYear()} Librería — Ejercicio C08 · DS26 UTN FRLP
        </p>
      </Container>
    </footer>
  );
}

export default Footer;