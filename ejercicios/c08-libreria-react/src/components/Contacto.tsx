import { Container, Form, Button } from "react-bootstrap";

function Contacto() {
  return (
    <section id="contacto" style={{ padding: "60px 0" }}>
      <Container>
        <h1 style={{ fontWeight: 800, marginBottom: 8 }}>Contacto</h1>
        <p style={{ color: "#888", marginBottom: 32 }}>
          Completá el formulario y nos ponemos en contacto con vos.
        </p>
        <div style={{ maxWidth: 560 }}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <Form.Control type="text" id="nombre" placeholder="Tu nombre" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <Form.Control type="email" id="email" placeholder="Tu email" />
          </div>
          <div className="mb-3">
            <label htmlFor="asunto" className="form-label">Asunto</label>
            <Form.Select id="asunto">
              <option value="" disabled>Seleccioná un asunto</option>
              <option value="consulta">Consulta</option>
              <option value="reclamo">Reclamo</option>
              <option value="sugerencia">Sugerencia</option>
            </Form.Select>
          </div>
          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">Mensaje</label>
            <Form.Control as="textarea" id="mensaje" rows={4} placeholder="Tu mensaje" />
          </div>
          <Button
            style={{
              backgroundColor: "#f4c542",
              borderColor: "#f4c542",
              color: "#1a1a2e",
              fontWeight: 700,
              borderRadius: 20,
              padding: "10px 32px",
            }}
          >
            Enviar
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default Contacto;