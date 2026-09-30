/** Promoción vigente del hospital. */
export interface Promocion {
  id: number;
  titulo: string;
  descripcion: string;
  descuento: string;
  precioDesde: string;
  vigencia: string;
  icono: string;
}
