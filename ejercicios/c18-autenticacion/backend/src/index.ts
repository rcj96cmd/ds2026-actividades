import express from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un container! 🐳" });
});

// Rutas públicas de autenticación (el Router se pasa DIRECTO, no como función)
app.use("/api/auth", authRoutes);

// Rutas de libros y autores (los Routers se pasan DIRECTO, no como funciones)
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
