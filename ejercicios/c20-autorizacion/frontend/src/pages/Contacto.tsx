import { Container, Form, Button } from "react-bootstrap";

function Contacto() {
  return (
    <section className="page-section">
      <Container>
        <h1 className="section-title">Contacto</h1>
        <p className="section-subtitle">Completá el formulario y nos ponemos en contacto con vos.</p>
        <div className="contacto-wrapper">
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
              <option value="">Seleccioná un asunto</option>
              <option value="consulta">Consulta</option>
              <option value="reclamo">Reclamo</option>
              <option value="sugerencia">Sugerencia</option>
            </Form.Select>
          </div>
          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">Mensaje</label>
            <Form.Control as="textarea" id="mensaje" rows={4} placeholder="Tu mensaje" />
          </div>
          <Button className="btn-enviar">Enviar</Button>
        </div>
      </Container>
    </section>
  );
}

export default Contacto;