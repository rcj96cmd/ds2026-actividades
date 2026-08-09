import { Autor } from "../types/autor.types";

const autores: Autor[] = [
  { id: 0, nombre: "Gabriel García Márquez", nacionalidad: "Colombia", bio: "Premio Nobel de Literatura 1982, máximo exponente del realismo mágico." },
  { id: 1, nombre: "Jorge Luis Borges", nacionalidad: "Argentina", bio: "Escritor y poeta, referente de la literatura fantástica del siglo XX." },
  { id: 2, nombre: "Miguel de Cervantes", nacionalidad: "España", bio: "Autor de Don Quijote de la Mancha, considerado el padre de la novela moderna." },
];
let proximoId = autores.length;

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find(a => a.id === id);
}

export function create(datos: Omit<Autor, "id">): Autor {
  const nuevo: Autor = { id: proximoId++, ...datos };
  autores.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Autor, "id">): Autor | undefined {
  const index = autores.findIndex(a => a.id === id);
  if (index === -1) return undefined;
  autores[index] = { ...datos, id };
  return autores[index];
}

export function remove(id: number): boolean {
  const index = autores.findIndex(a => a.id === id);
  if (index === -1) return false;
  autores.splice(index, 1);
  return true;
}