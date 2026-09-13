interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
}

export interface Libro {
  id: number;
  titulo: string;
  autorId: number;      
  descripcion?: string;
  precio: number;       
  portada: string;
  disponible: boolean;
  autor?: Autor;        
}

export interface LibroCardProps {
  id: number;
  titulo: string;
  autor: Autor;         
  portada: string;
  disponible: boolean;
}
