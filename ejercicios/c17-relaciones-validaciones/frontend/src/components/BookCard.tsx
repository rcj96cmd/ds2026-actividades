import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { Libro } from "../types/libro";

type BookCardProps = Libro;

function BookCard({ id, titulo, autor, portada }: BookCardProps) {
  const [likes, setLikes] = useState<number>(0);
  const liked = likes > 0;

  return (
    <Card className="book-card h-100">
      <div className="book-card-img-wrapper">
        <Card.Img variant="top" src={portada} alt={`Portada de ${titulo}`} />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="book-card-title">{titulo}</Card.Title>
        <Card.Text className="book-card-author">{autor}</Card.Text>
        <div className="mt-auto d-flex gap-2">
          <Button
            as={Link as any}
            to={`/libros/${id}`}
            size="sm"
            className="btn-primary-libreria flex-fill"
          >
            Ver más
          </Button>
          <Button
            size="sm"
            onClick={() => setLikes(likes + 1)}
            className={`btn-like ${liked ? "liked" : "not-liked"}`}
          >
            {liked ? "❤️" : "🤍"} {likes}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BookCard;