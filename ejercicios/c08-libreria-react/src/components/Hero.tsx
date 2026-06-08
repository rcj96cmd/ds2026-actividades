import { Container, Button } from "react-bootstrap";
import libreriaImg from "../assets/libreria.jpg";

function Hero() {
  return (
    <section
      style={{
        backgroundImage: `url(${libreriaImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "500px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* overlay oscuro — igual al hero-overlay del ejercicio 6 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.55)",
        }}
      />

      <Container className="text-center text-white position-relative">
        <p style={{ color: "#f4c542", letterSpacing: 4, fontSize: "0.8rem", textTransform: "uppercase", marginBottom: 16 }}>
          Tu próxima gran lectura te espera
        </p>
        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Bienvenido a la<br />
          <span style={{ color: "#f4c542" }}>Librería</span>
        </h1>
        <p style={{ fontSize: "1.15rem", color: "#b0b8c8", maxWidth: 520, margin: "0 auto 36px" }}>
          Descubrí tu próxima lectura favorita entre cientos de títulos cuidadosamente seleccionados.
        </p>
        <Button
          href="#catalogo"
          style={{
            backgroundColor: "#f4c542",
            borderColor: "#f4c542",
            color: "#1a1a2e",
            fontWeight: 700,
            padding: "14px 40px",
            fontSize: "1rem",
            borderRadius: 50,
          }}
        >
          Ver catálogo
        </Button>
      </Container>
    </section>
  );
}

export default Hero;