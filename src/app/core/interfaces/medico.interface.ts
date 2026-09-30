/** Modelo que representa a un médico que labora en el hospital. */
export interface Medico {
  id: number;
  nombre: string;
  especialidad: string;
  cargo: string;
  experiencia: number;
  colegiatura: string;
  descripcion: string;
}
