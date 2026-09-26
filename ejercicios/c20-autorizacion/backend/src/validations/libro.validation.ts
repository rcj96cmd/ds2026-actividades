import { z } from "zod";

// Para CREATE - todos los campos obligatorios excepto id
export const libroCreateSchema = z.object({
  titulo: z.string().trim().min(1, "El título es obligatorio").max(200),
  autorId: z.number().int().positive("El autor debe existir"),
  descripcion: z.string().optional(),
  precio: z.number().int().positive("El precio debe ser mayor a 0"),
  portada: z.string().min(1, "La imagen es obligatoria"),
});

// Para UPDATE - todos los campos opcionales (con .partial)
export const libroUpdateSchema = libroCreateSchema.partial();

// Para params validation (GET /libros/:id)
export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un número positivo"),
});
