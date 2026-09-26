import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client";

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  
  // 1. Captura errores de validación Zod v4
  if (err instanceof ZodError) {
    console.error('Zod Error:', err.issues);
    return res.status(400).json({ 
      error: "Datos inválidos", 
      detalles: err.issues.map(i => ({ campo: i.path.join("."), mensaje: i.message })) 
    });
  }
  
  // 2. Captura errores de Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.error('Prisma Error:', err.code, err.message);
    
    // Constraint violations de la DB
    switch (err.code) {
      case "P2002":
        return res.status(409).json({ error: "Datos duplicados" });
      case "P2003":
        return res.status(409).json({ 
          error: "Referencia externa inválida",
          detalles: err.message 
        });
      case "P2025":
        return res.status(404).json({ error: "Recurso no encontrado" });
      default:
        console.error('Unknown Prisma error:', err);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  
  // 3. Captura errores desconocidos
  console.error('Unknown Error:', err);
  return res.status(500).json({ error: "Error interno del servidor" });
};
