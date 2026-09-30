/** Alerta visual que se muestra al usuario (estilos de Bootstrap). */
export interface Alerta {
  id: number;
  tipo: 'success' | 'danger' | 'warning' | 'info' | 'primary';
  titulo: string;
  mensaje: string;
}
