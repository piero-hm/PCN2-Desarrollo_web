/** Modelo que representa un servicio ofrecido por el hospital. */
export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  /** Clase del ícono de Bootstrap Icons */
  icono: string;
  horario: string;
}
