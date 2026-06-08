import { useState } from "react";
import { Navbar as BsNavbar, Nav, Container } from "react-bootstrap";

type Props = {
  paginaActual: string;
  setPagina: (pagina: string) => void;
};

function Navbar({ paginaActual, setPagina }: Props) {
  const [expanded, setExpanded] = useState(false);

  const linkStyle = (pagina: string) => ({
    color: paginaActual === pagina ? "#f4c542" : "#e0e0e0",
    fontWeight: paginaActual === pagina ? 700 : 400,
    cursor: "pointer",
  });

  return (
    <BsNavbar
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      style={{ backgroundColor: "#1a1a2e" }}
      variant="dark"
      sticky="top"
    >
      <Container fluid>
        <BsNavbar.Brand
          onClick={() => { setPagina("inicio"); setExpanded(false); }}
          style={{ fontWeight: 700, fontSize: "1.4rem", color: "#f4c542", cursor: "pointer" }}
        >
          📚 Librería
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="nav-collapse" onClick={() => setExpanded(!expanded)} />
        <BsNavbar.Collapse id="nav-collapse">
          <Nav className="ms-auto" onClick={() => setExpanded(false)}>
            <Nav.Link
              style={linkStyle("inicio")}
              onClick={() => setPagina("inicio")}
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              style={linkStyle("catalogo")}
              onClick={() => setPagina("catalogo")}
            >
              Catálogo
            </Nav.Link>
            <Nav.Link
              style={linkStyle("contacto")}
              onClick={() => setPagina("contacto")}
            >
              Contacto
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;