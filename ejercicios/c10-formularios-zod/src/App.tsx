import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Contacto from "./pages/Contacto";
import LibroDetalle from "./pages/LibroDetalle";
import LibroNuevo from "./pages/LibroNuevo";
import { libros as librosIniciales } from "./data/libros";
import type { Libro } from "./types/libro";

function App() {
  const [libros, setLibros] = useState<Libro[]>(librosIniciales);

  const agregarLibro = (nuevo: Libro) => {
    setLibros([...libros, nuevo]);
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
      </Routes>
    </Layout>
  );
}

export default App;