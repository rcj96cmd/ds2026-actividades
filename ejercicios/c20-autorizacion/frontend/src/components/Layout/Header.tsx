import { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

function Header() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  
  const { usuario, logout, estaAutenticado } = useAuth(); 

  const manejarSesion = () => {
    if (usuario) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

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
            
            {/* ⬅️ EXTENSIÓN #3: Botón "Agregar libro" solo visible para ADMIN */}
            {estaAutenticado && usuario?.rol === 'ADMIN' && (
              <Nav.Link 
                as={NavLink} 
                to="/libros/nuevo"
                style={{ marginLeft: '10px', color: '#f0ad4e' }}
              >
                Agregar libro
              </Nav.Link>
            )}
          </Nav>
          
          {usuario ? (
            <>
              <NavDropdown 
                title={`Hola, ${usuario.nombre}`} 
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={manejarSesion}>
                  Salir
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <button 
              className="btn-login ms-3" 
              onClick={manejarSesion}
              style={{ backgroundColor: '#0d6efd', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px' }}
            >
              Ingresar
            </button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
