import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Contacto from "./pages/Contacto";
import LibroDetalle from "./pages/LibroDetalle";
import LibroNuevo from "./pages/LibroNuevo";
import LibroEditar from "./pages/LibroEditar";
import Login from "./pages/Login";
import SinPermiso from "./pages/SinPermiso";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/libros/:id" element={<LibroDetalle />} />
          <Route path="/sin-permiso" element={<SinPermiso />} />
          <Route element={<PrivateRoute rol="ADMIN" />}>
            <Route path="/libros/nuevo" element={<LibroNuevo />} />
            <Route path="/libros/:id/editar" element={<LibroEditar />} />
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
