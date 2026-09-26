import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// ✅ CORS habilitado para desarrollo con wildcard
app.use(cors({
  origin: "*",  // Para desarrollo local, permite todos los orígenes
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

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

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
