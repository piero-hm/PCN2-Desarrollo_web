import { Injectable, signal } from '@angular/core';
import { Promocion } from '../interfaces';

const PROMOCIONES: Promocion[] = [
  {
    id: 1,
    titulo: 'Chequeo Preventivo Anual',
    descripcion:
      'Paquete completo: consulta médica, hemograma, perfil lipídico, glucosa y electrocardiograma.',
    descuento: '30% dcto.',
    precioDesde: 'S/ 149',
    vigencia: 'Vigente hasta el 31 de diciembre',
    icono: 'bi-clipboard2-heart-fill',
  },
  {
    id: 2,
    titulo: 'Control Pediátrico',
    descripcion:
      'Consulta pediátrica, control de crecimiento y vacunación al día para niños menores de 12 años.',
    descuento: '25% dcto.',
    precioDesde: 'S/ 79',
    vigencia: 'Vigente hasta el 30 de noviembre',
    icono: 'bi-balloon-fill',
  },
  {
    id: 3,
    titulo: 'Limpieza Dental + Blanqueamiento',
    descripcion:
      'Profilaxis dental con ultrasonido y sesión de blanqueamiento dental en consultorio.',
    descuento: '40% dcto.',
    precioDesde: 'S/ 129',
    vigencia: 'Vigente hasta el 15 de octubre',
    icono: 'bi-emoji-smile-fill',
  },
  {
    id: 4,
    titulo: 'Paquete Maternidad',
    descripcion:
      '4 controles prenatales, ecografías de control y curso de parto para la mamá y su acompañante.',
    descuento: '20% dcto.',
    precioDesde: 'S/ 399',
    vigencia: 'Vigente todo el año',
    icono: 'bi-gender-female',
  },
  {
    id: 5,
    titulo: 'Sesiones de Fisioterapia',
    descripcion:
      'Bonificación de 10 sesiones de rehabilitación física valoradas por traumatología.',
    descuento: '35% dcto.',
    precioDesde: 'S/ 249',
    vigencia: 'Vigente hasta el 30 de noviembre',
    icono: 'bi-activity',
  },
];

/** Servicio que expone las promociones vigentes del hospital. */
@Injectable({ providedIn: 'root' })
export class PromocionesService {
  private readonly promocionesSignal = signal<Promocion[]>(PROMOCIONES);

  /** Lista reactiva de promociones (solo lectura). */
  readonly promociones = this.promocionesSignal.asReadonly();
}
