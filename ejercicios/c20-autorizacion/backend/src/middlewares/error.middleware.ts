import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client";
import { ErrorHttp } from "../errors/ErrorHttp";

// Express 4 no captura los errores de funciones async: hay que pasarlos a next()
export const asyncHandler = (handler: RequestHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };

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
  
  // 3. Captura errores de negocio lanzados por los services
  if (err instanceof ErrorHttp) {
    return res.status(err.status).json({ error: err.message });
  }

  // 4. Captura errores desconocidos
  console.error('Unknown Error:', err);
  return res.status(500).json({ error: "Error interno del servidor" });
};
