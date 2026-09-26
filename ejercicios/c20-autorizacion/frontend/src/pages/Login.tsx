import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, Row, Col, Card, Button, Alert, InputGroup } from "react-bootstrap";
import { loginSchema } from "../schemas/loginSchema";
import { apiFetch } from "../services/api";
import { guardarToken } from "../services/sesion";

function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Validación con Zod antes de enviar
const validateAndSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const resultado = loginSchema.safeParse({ email, password });
  
  if (!resultado.success) {
    setError(resultado.error.issues[0]?.message || "Error de validación");
    return;
  }
  
  setError(null);
  setLoading(true);

  try {
    // apiFetch ya maneja el token automáticamente si existe
    const resultadoLogin = await apiFetch<
      { token: string; usuario: { id: number; email: string; nombre: string; rol: string } }
    >('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Guardar el token en localStorage
    guardarToken(resultadoLogin.token);
    
    // Redirigir al catálogo
    navigate("/catalogo");
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Error desconocido";
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};

  return (
    <Container className="page-section py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="text-center mb-3">Iniciar Sesión</h2>
              <p className="text-center text-muted mb-4">Administración de la Librería Digital</p>
              
              {error && (
                <Alert variant="danger">{error}</Alert>
              )}
              
              <Form onSubmit={validateAndSubmit}>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
                
                <InputGroup className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>
                
                <Button 
                  type="submit" 
                  className="w-100 py-2 fw-bold"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? "Verificando..." : "Ingresar"}
                </Button>
              </Form>
              
              <div className="text-center mt-3">
                <small className="text-muted">
                  Admin: admin@libreria.test / Admin1234<br />
                  Cliente: cliente@libreria.test / Cliente1234
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
