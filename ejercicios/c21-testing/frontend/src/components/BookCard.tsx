import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ApiError, apiFetch } from "../services/api";
import type { LibroCardProps } from "../types/libro";

type BookCardProps = LibroCardProps;

function BookCard({ id, titulo, autor, portada, onBorrado }: BookCardProps) {
  const { tieneRol } = useAuth();
  const [likes, setLikes] = useState<number>(0);
  const [borrando, setBorrando] = useState(false);
  const liked = likes > 0;

  const handleDelete = async () => {
    if (!confirm(`¿Seguro que quieres eliminar "${titulo}"?`)) return;

    setBorrando(true);
    try {
      await apiFetch(`/libros/${id}`, { method: 'DELETE' });
      onBorrado();
    } catch (error) {
      alert(error instanceof ApiError ? error.message : "Hubo un error al eliminar el libro");
      setBorrando(false);
    }
  };

  return (
    <Card className="book-card h-100">
      <div className="book-card-img-wrapper">
        <Card.Img variant="top" src={portada} alt={`Portada de ${titulo}`} />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="book-card-title">{titulo}</Card.Title>
        <Card.Text className="book-card-author">{autor.nombre}</Card.Text>
        <div className="mt-auto d-flex gap-2">
          <Link
            to={`/libros/${id}`}
            className="btn btn-sm btn-primary-libreria flex-fill"
          >
            Ver más
          </Link>
          <Button
            size="sm"
            onClick={() => setLikes(likes + 1)}
            className={`btn-like ${liked ? "liked" : "not-liked"}`}
          >
            {liked ? "❤️" : "🤍"} {likes}
          </Button>
        </div>
        {tieneRol('ADMIN') && (
          <div className="d-flex gap-2 mt-2">
            <Link
              to={`/libros/${id}/editar`}
              className="btn btn-sm btn-outline-primary flex-fill"
            >
              Editar
            </Link>
            <Button
              size="sm"
              variant="danger"
              className="flex-fill"
              onClick={handleDelete}
              disabled={borrando}
            >
              {borrando ? "..." : "Borrar"}
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default BookCard;
