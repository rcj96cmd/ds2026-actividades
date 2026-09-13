import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Contacto from "./pages/Contacto";
import LibroDetalle from "./pages/LibroDetalle";
import LibroNuevo from "./pages/LibroNuevo";
import Login from "./pages/Login";

// Hook para verificar si hay token
const useSession = () => {
  const [hasToken, setHasToken] = useState(false);

  // Checkear al inicio
  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  return hasToken;
};

function App() {
  const loggedIn = useSession();

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={loggedIn ? <Navigate to="/catalogo" /> : <Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={loggedIn ? <Catalogo /> : <Navigate to="/login" />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/libros/nuevo" element={<LibroNuevo />} />
      </Routes>
    </Layout>
  );
}

export default App;
