import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const corsOptions = {
  origin: [process.env.FRONTEND_URL ?? "http://localhost:5173"],
};
app.use(cors(corsOptions));

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

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

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

export default app;
