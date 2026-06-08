import { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import type { Libro } from "../data/libros";

type BookCardProps = Libro;

function BookCard({ id, titulo, autor, portada, descripcion, precio }: BookCardProps) {
  const [likes, setLikes] = useState<number>(0);
  const [show, setShow] = useState(false);
  const liked = likes > 0;

  return (
    <>
      <Card
        className="h-100"
        style={{
          border: "none",
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
          transition: "transform 0.2s, box-shadow 0.2s",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.18)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.10)";
        }}
      >
        <div style={{ overflow: "hidden", height: 240, background: "#f5f5f5" }}>
          <Card.Img
            variant="top"
            src={portada}
            alt={`Portada de ${titulo}`}
            style={{ height: "100%", objectFit: "cover", width: "100%" }}
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>
            {titulo}
          </Card.Title>
          <Card.Text style={{ color: "#888", fontSize: "0.88rem", marginBottom: 16 }}>
            {autor}
          </Card.Text>
          <div className="mt-auto d-flex gap-2">
            <Button
              size="sm"
              onClick={() => setShow(true)}
              style={{
                backgroundColor: "#1a1a2e",
                borderColor: "#1a1a2e",
                borderRadius: 20,
                fontWeight: 600,
                flex: 1,
              }}
            >
              Ver más
            </Button>
            <Button
              size="sm"
              onClick={() => setLikes(likes + 1)}
              style={{
                backgroundColor: liked ? "#e74c3c" : "transparent",
                borderColor: liked ? "#e74c3c" : "#ccc",
                color: liked ? "#fff" : "#888",
                borderRadius: 20,
                fontWeight: 600,
                minWidth: 72,
                transition: "all 0.15s",
              }}
            >
              {liked ? "❤️" : "🤍"} {likes}
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal — equivalente al libro.html del ejercicio 6 */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: "#1a1a2e", color: "#fff" }}>
          <Modal.Title style={{ fontWeight: 700 }}>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex gap-4 flex-column flex-md-row p-4">
          <img
            src={portada}
            alt={`Portada de ${titulo}`}
            style={{ width: 160, objectFit: "cover", borderRadius: 12, alignSelf: "flex-start" }}
          />
          <div>
            <p style={{ color: "#888", marginBottom: 8 }}><strong>Autor:</strong> {autor}</p>
            <p style={{ color: "#888", marginBottom: 8 }}><strong>Precio:</strong> {precio}</p>
            <p style={{ lineHeight: 1.7 }}>{descripcion}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setShow(false)}
            style={{ backgroundColor: "#1a1a2e", borderColor: "#1a1a2e", borderRadius: 20 }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookCard;