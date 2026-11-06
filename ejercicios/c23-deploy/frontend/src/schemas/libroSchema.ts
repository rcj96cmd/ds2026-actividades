import { z } from "zod";

export const libroSchema = z.object({
  titulo: z.string().trim().min(1, "El título es obligatorio"),
  descripcion: z.string().trim().min(1, "La descripción es obligatoria"),
  precio: z.coerce.number().int("El precio debe ser un número entero").positive("El precio debe ser mayor a 0"),
  portada: z.string().trim().url("Debe ser una URL válida").optional().or(z.literal("")),
});

// El autor se elige de la lista o se crea: cada caso valida campos distintos
export const autorElegidoSchema = z.object({
  autorId: z.coerce.number().int().positive("El autor es obligatorio"),
});

export const autorNuevoSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio").max(200),
  nacionalidad: z.string().trim().min(1, "La nacionalidad es obligatoria").max(100),
});

export type LibroValidado = z.infer<typeof libroSchema>;
