import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import type { Libro } from "../types/libro";
import { libroSchema } from "../schemas/libroSchema";

const PORTADA_PLACEHOLDER = "https://covers.openlibrary.org/b/id/0-M.jpg";

interface Props {
  onAgregar?: (libro: Libro) => void;
}

function LibroNuevo({ onAgregar }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    precio: "",
    portada: "",
  });
  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const resultado = libroSchema.safeParse(form);

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

    const nuevoLibro: Libro = {
      id: Date.now(),
      titulo: resultado.data.titulo,
      autor: resultado.data.autor,
      descripcion: resultado.data.descripcion,
      precio: `$${resultado.data.precio.toLocaleString("es-AR")}`,
      portada: resultado.data.portada || PORTADA_PLACEHOLDER,
    };

    onAgregar?.(nuevoLibro);
    navigate("/catalogo");
  };

  return (
    <section className="page-section">
      <Container style={{ maxWidth: 480 }}>
        <h2 className="section-title">Nuevo libro</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              isInvalid={!!errores.titulo}
            />
            <Form.Control.Feedback type="invalid">
              {errores.titulo}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              name="autor"
              value={form.autor}
              onChange={handleChange}
              isInvalid={!!errores.autor}
            />
            <Form.Control.Feedback type="invalid">
              {errores.autor}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              isInvalid={!!errores.descripcion}
            />
            <Form.Control.Feedback type="invalid">
              {errores.descripcion}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              isInvalid={!!errores.precio}
            />
            <Form.Control.Feedback type="invalid">
              {errores.precio}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Portada (URL, opcional)</Form.Label>
            <Form.Control
              name="portada"
              value={form.portada}
              onChange={handleChange}
              isInvalid={!!errores.portada}
              placeholder="https://..."
            />
            <Form.Control.Feedback type="invalid">
              {errores.portada}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="btn-primary-libreria">
            Agregar libro
          </Button>
        </Form>
      </Container>
    </section>
  );
}

export default LibroNuevo;