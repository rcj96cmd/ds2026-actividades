import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import type { Libro } from "../types/libro";
import { libroSchema } from "../schemas/libroSchema";
import { ApiError } from '../services/api';

const PORTADA_PLACEHOLDER = "https://covers.openlibrary.org/b/id/0-M.jpg";

function LibroNuevo() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    titulo: "",
    autor: searchParams.get('autor') || "",
    descripcion: "",
    precio: "",
    portada: "",
  });
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    setLoading(true);

    try {
      const nuevoLibro: Libro = {
        id: Date.now(),
        titulo: resultado.data.titulo,
        autorId: Number.isFinite(Number(resultado.data.autor))
          ? Number(resultado.data.autor)
          : 0,
        descripcion: resultado.data.descripcion,
        precio: resultado.data.precio,
        portada: resultado.data.portada || PORTADA_PLACEHOLDER,
        disponible: true,
      };

      // Simular POST /api/libros (en producción llamarías a la API real)
      await fetch('/api/libros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          titulo: nuevoLibro.titulo,
          autorId: nuevoLibro.autorId,
          descripcion: nuevoLibro.descripcion,
          precio: nuevoLibro.precio,
          portada: nuevoLibro.portada
        })
      });

      alert("Libro agregado correctamente");
      navigate("/catalogo");
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 403) {
          setErrores({ titulo: "No tienes permiso para agregar libros" });
        } else if (error.status === 401) {
          window.location.href = '/login';
        } else {
          setErrores({ portada: `Error del servidor (${error.status}): ${error.message}` });
        }
      } else {
        setErrores({ portada: "Error inesperado. Intentá de nuevo." });
      }
    } finally {
      setLoading(false);
    }
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

          <Button 
            type="submit" 
            className="btn-primary-libreria"
            variant="primary"
            disabled={loading}
          >
            {loading ? "Procesando..." : "Agregar libro"}
          </Button>
        </Form>
      </Container>
    </section>
  );
}

export default LibroNuevo;
