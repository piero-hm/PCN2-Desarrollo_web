/** Solicitud de consulta o cita registrada mediante el formulario. */
export interface Consulta {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  mensaje: string;
  fecha: string;
}
