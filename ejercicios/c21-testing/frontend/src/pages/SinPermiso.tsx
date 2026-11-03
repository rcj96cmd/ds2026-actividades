import { useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button } from "react-bootstrap";

function SinPermiso() {
  const navigate = useNavigate();

  return (
    <Container className="page-section py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card className="shadow-sm text-center p-4">
            <Card.Body>
              <h2 className="text-danger mb-4">⛔ Acceso denegado</h2>
              <p className="lead text-muted mb-4">
                No tienes permiso para acceder a esta página.
              </p>
              
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => navigate("/")}
              >
                Volver al inicio
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SinPermiso;
