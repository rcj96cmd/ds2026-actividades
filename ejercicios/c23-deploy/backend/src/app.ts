import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// Solo el front puede llamar a la API desde el navegador. En Render, FRONTEND_URL es la URL del Static Site
const corsOptions = { origin: [process.env.FRONTEND_URL ?? "http://localhost:5173"] };

app.use(cors(corsOptions));

app.use(express.json());

// Solo una configuración de Content-Type
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un container! 🐳" });
});

// Rutas públicas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de libros y autores
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);

// Ninguna ruta coincidió
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Error handler
app.use(errorHandler);

export default app;
