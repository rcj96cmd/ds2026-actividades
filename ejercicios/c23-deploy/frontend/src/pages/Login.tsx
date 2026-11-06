import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { loginSchema } from "../schemas/loginSchema";
import { useAuth } from '../context/AuthContext';
import { ApiError } from "../services/api";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Obtener la página original donde estaba antes del login
  const fromPathname = location.state?.desde || '/catalogo';

  const handleSesion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar con Zod schema
    const resultado = loginSchema.safeParse({ email, password });
    
    if (!resultado.success) {
      const nuevosErrores: Record<string, string> = {};
      for (const issue of resultado.error.issues) {
        const campo = String(issue.path[0]);
        if (!nuevosErrores[campo]) nuevosErrores[campo] = issue.message;
      }
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});
    setError(null);
    setLoading(true);

    try {
      // Intentar login con el backend
      await login(resultado.data);

      // Redirigir a la página original (o /catalogo por defecto)
      navigate(fromPathname, { replace: true });
    } catch (error) {
      // Mensajes de error específicos según el status que devuelve el backend
      if (error instanceof ApiError && error.status === 401) {
        setError("Email o contraseña incorrectos");
      } else {
        setError("Error al conectar con el servidor. Intentá de nuevo.");
      }
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
              
              <Form noValidate onSubmit={handleSesion}>
                <Form.Group className="mb-3" controlId="login-email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!errores.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="login-password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errores.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.password}
                  </Form.Control.Feedback>
                </Form.Group>

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
