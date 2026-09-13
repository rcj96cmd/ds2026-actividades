import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      className="navbar-libreria"
      variant="dark"
      sticky="top"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          📚 Librería
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-collapse" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="nav-collapse">
          <Nav className="ms-auto" onClick={() => setExpanded(false)}>
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/catalogo">Catálogo</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
            <Nav.Link as={NavLink} to="/libros/nuevo">Agregar libro</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;