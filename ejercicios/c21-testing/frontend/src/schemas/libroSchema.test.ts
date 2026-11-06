import { describe, it, expect } from 'vitest';
import { libroSchema } from './libroSchema';

const libroValido = {
  titulo: 'Rayuela',
  descripcion: 'Una novela experimental.',
  precio: '7000',
  portada: '',
};

describe('libroSchema', () => {
  it('convierte el precio "7000" del <input> en el número 7000', () => {
    const r = libroSchema.safeParse(libroValido);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.precio).toBe(7000);
  });

  it('rechaza un precio con decimales, porque la base guarda enteros', () => {
    const r = libroSchema.safeParse({ ...libroValido, precio: '12.5' });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].message).toBe('El precio debe ser un número entero');
  });

  it('acepta la portada vacía, pero no una URL inválida', () => {
    expect(libroSchema.safeParse(libroValido).success).toBe(true);
    expect(libroSchema.safeParse({ ...libroValido, portada: 'no-es-url' }).success).toBe(false);
  });
});
