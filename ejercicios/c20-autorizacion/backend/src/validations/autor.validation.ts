import { z } from "zod";

// Para CREATE - todos los campos obligatorios excepto id
export const autorCreateSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio").max(200),
  nacionalidad: z.string().trim().min(1, "La nacionalidad es obligatoria").max(100),
});

// Para UPDATE - todos los campos opcionales (con .partial)
export const autorUpdateSchema = autorCreateSchema.partial();

// Para params validation (GET /autores/:id)
export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un número positivo"),
});
