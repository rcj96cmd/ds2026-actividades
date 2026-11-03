import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import type { Autor, Libro, LibroDatos } from "../types/libro";
import { libroSchema, autorElegidoSchema, autorNuevoSchema } from "../schemas/libroSchema";
import { ApiError, apiFetch } from '../services/api';
import { useFetch } from "../hooks/useFetch";

const PORTADA_PLACEHOLDER = "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80";
const AUTOR_NUEVO = "nuevo";

interface LibroFormProps {
  libro?: Libro;
  textoBoton: string;
  onGuardar: (datos: LibroDatos) => Promise<void>;
}

function LibroForm({ libro, textoBoton, onGuardar }: LibroFormProps) {
  const { data: autoresApi } = useFetch<Autor[]>("/autores");
  const [autoresCreados, setAutoresCreados] = useState<Autor[]>([]);
  const [form, setForm] = useState({
    titulo: libro?.titulo ?? "",
    autorId: libro ? String(libro.autorId) : "",
    nombre: "",
    nacionalidad: "",
    descripcion: libro?.descripcion ?? "",
    precio: libro ? String(libro.precio) : "",
    portada: libro?.portada ?? "",
  });
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [loading, setLoading] = useState(false);

  const autores = [...(autoresApi ?? []), ...autoresCreados];
  const creandoAutor = form.autorId === AUTOR_NUEVO;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const crearAutor = async (datos: { nombre: string; nacionalidad: string }) => {
    const autor = await apiFetch<Autor>('/autores', {
      method: 'POST',
      body: JSON.stringify(datos)
    });
    // Queda elegido: si falla guardar el libro, reintentar no lo crea de nuevo
    setAutoresCreados([...autoresCreados, autor]);
    setForm((actual) => ({ ...actual, autorId: String(autor.id), nombre: "", nacionalidad: "" }));
    return autor.id;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const datosLibro = libroSchema.safeParse(form);
    const autorElegido = autorElegidoSchema.safeParse(form);
    const autorNuevo = autorNuevoSchema.safeParse(form);
    const datosAutor = creandoAutor ? autorNuevo : autorElegido;

    if (!datosLibro.success || !datosAutor.success) {
      const nuevosErrores: Record<string, string> = {};
      const issues = [...(datosLibro.error?.issues ?? []), ...(datosAutor.error?.issues ?? [])];
      for (const issue of issues) {
        const campo = String(issue.path[0]);
        if (!nuevosErrores[campo]) nuevosErrores[campo] = issue.message;
      }
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});
    setErrorGeneral("");
    setLoading(true);

    try {
      const autorId = creandoAutor
        ? await crearAutor(autorNuevo.data!)
        : autorElegido.data!.autorId;

      await onGuardar({
        ...datosLibro.data,
        autorId,
        portada: datosLibro.data.portada || PORTADA_PLACEHOLDER,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 403) {
          setErrorGeneral("No tenés permiso para realizar esta operación");
        } else if (error.status === 409 && creandoAutor) {
          setErrores({ nombre: "Ya existe un autor con ese nombre" });
        } else {
          setErrorGeneral(`Error del servidor (${error.status}): ${error.message}`);
        }
      } else {
        setErrorGeneral("Error inesperado. Intentá de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}

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
        <Form.Select
          name="autorId"
          value={form.autorId}
          onChange={handleChange}
          isInvalid={!!errores.autorId}
        >
          <option value="">Elegí un autor</option>
          {autores.map((autor) => (
            <option key={autor.id} value={autor.id}>{autor.nombre}</option>
          ))}
          <option value={AUTOR_NUEVO}>+ Agregar autor nuevo</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errores.autorId}
        </Form.Control.Feedback>
      </Form.Group>

      {creandoAutor && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del autor</Form.Label>
            <Form.Control
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              isInvalid={!!errores.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errores.nombre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nacionalidad del autor</Form.Label>
            <Form.Control
              name="nacionalidad"
              value={form.nacionalidad}
              onChange={handleChange}
              isInvalid={!!errores.nacionalidad}
            />
            <Form.Control.Feedback type="invalid">
              {errores.nacionalidad}
            </Form.Control.Feedback>
          </Form.Group>
        </>
      )}

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
        {loading ? "Procesando..." : textoBoton}
      </Button>
    </Form>
  );
}

export default LibroForm;
