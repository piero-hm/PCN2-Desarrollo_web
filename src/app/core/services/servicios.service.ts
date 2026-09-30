import { Injectable, signal } from '@angular/core';
import { Servicio } from '../interfaces';

const SERVICIOS: Servicio[] = [
  {
    id: 1,
    nombre: 'Emergencias 24/7',
    descripcion:
      'Atención inmediata las 24 horas del día con equipo de trauma, ambulancias y sala de estabilización.',
    icono: 'bi-heart-pulse-fill',
    horario: '24 horas, todos los días',
  },
  {
    id: 2,
    nombre: 'Consulta Externa',
    descripcion:
      'Consultorios médicos generales y especializados con citas programadas y resultados en línea.',
    icono: 'bi-clipboard2-pulse-fill',
    horario: 'Lun a Vie 7:00 - 20:00 / Sáb 8:00 - 14:00',
  },
  {
    id: 3,
    nombre: 'Laboratorio y Diagnóstico',
    descripcion:
      'Laboratorio clínico, imagenología (RX, ecografía, tomografía) con resultados digitales.',
    icono: 'bi-eyedropper',
    horario: 'Lun a Sáb 6:30 - 18:00',
  },
  {
    id: 4,
    nombre: 'Cirugía',
    descripcion:
      'Quirófanos equipados para cirugía general, minimamente invasiva y de urgencia.',
    icono: 'bi-scissors',
    horario: 'Lun a Vie 6:00 - 18:00',
  },
  {
    id: 5,
    nombre: 'Hospitalización',
    descripcion:
      'Habitaciones individuales y dobles con enfermería continua y monitoreo constante.',
    icono: 'bi-hospital-fill',
    horario: '24 horas, todos los días',
  },
  {
    id: 6,
    nombre: 'Pediatría y Neonatología',
    descripcion:
      'Atención integral del recién nacido y del niño, con unidad de cuidados intensivos pediátricos.',
    icono: 'bi-person-heart',
    horario: 'Lun a Sáb 8:00 - 19:00',
  },
  {
    id: 7,
    nombre: 'Maternidad',
    descripcion:
      'Parto natural y cesárea, sala de alumbramiento y acompañamiento pre y post parto.',
    icono: 'bi-gender-female',
    horario: '24 horas, todos los días',
  },
  {
    id: 8,
    nombre: 'Rehabilitación Física',
    descripcion:
      'Fisioterapia, terapia ocupacional y programas de recuperación personalizados.',
    icono: 'bi-activity',
    horario: 'Lun a Vie 7:00 - 19:00',
  },
];

/**
 * Servicio encargado de exponer los servicios del hospital.
 * La información se maneja con Signals para una reactividad simple y eficiente.
 */
@Injectable({ providedIn: 'root' })
export class ServiciosService {
  private readonly serviciosSignal = signal<Servicio[]>(SERVICIOS);

  /** Lista reactiva de servicios (solo lectura). */
  readonly servicios = this.serviciosSignal.asReadonly();

  obtenerPorId(id: number): Servicio | undefined {
    return this.serviciosSignal().find((servicio) => servicio.id === id);
  }
}
