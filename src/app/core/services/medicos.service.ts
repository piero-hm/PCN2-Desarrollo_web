import { Injectable, signal } from '@angular/core';
import { Medico } from '../interfaces';

const MEDICOS: Medico[] = [
  {
    id: 1,
    nombre: 'Dra. Carolina Mendoza',
    especialidad: 'Cardiología',
    cargo: 'Jefa de Servicio de Cardiología',
    experiencia: 16,
    colegiatura: 'CMP 45231 - RNE 21876',
    descripcion:
      'Especialista en cardiología intervencionista y ecocardiografía. Responsable del programa de prevención cardiovascular.',
  },
  {
    id: 2,
    nombre: 'Dr. Luis Ramírez',
    especialidad: 'Cirugía General',
    cargo: 'Director Médico Quirúrgico',
    experiencia: 21,
    colegiatura: 'CMP 31208 - RNE 10455',
    descripcion:
      'Cirujano con amplia experiencia en cirugía laparoscópica y de urgencias abdominales.',
  },
  {
    id: 3,
    nombre: 'Dra. Sofía Torres',
    especialidad: 'Pediatría',
    cargo: 'Jefa de Neonatología',
    experiencia: 12,
    colegiatura: 'CMP 52874 - RNE 30912',
    descripcion:
      'Pediatra neonatóloga, responsable de la unidad de cuidados intensivos neonatales.',
  },
  {
    id: 4,
    nombre: 'Dr. Jorge Salazar',
    especialidad: 'Traumatología',
    cargo: 'Traumatólogo de Emergencias',
    experiencia: 14,
    colegiatura: 'CMP 47790 - RNE 25331',
    descripcion:
      'Especialista en lesiones deportivas, fracturas y cirugía de columna vertebral.',
  },
  {
    id: 5,
    nombre: 'Dra. Valeria Ponce',
    especialidad: 'Ginecología y Obstetricia',
    cargo: 'Jefa de Maternidad',
    experiencia: 18,
    colegiatura: 'CMP 39415 - RNE 17620',
    descripcion:
      'Obstetra responsable del programa de control prenatal y parto humanizado.',
  },
  {
    id: 6,
    nombre: 'Dr. Andrés Castillo',
    especialidad: 'Medicina Interna',
    cargo: 'Internista consultor',
    experiencia: 10,
    colegiatura: 'CMP 56102 - RNE 34788',
    descripcion:
      'Encargado de la evaluación clínica prequirúrgica y del seguimiento de enfermedades crónicas.',
  },
  {
    id: 7,
    nombre: 'Dra. Fernanda Ríos',
    especialidad: 'Dermatología',
    cargo: 'Dermatóloga clínica',
    experiencia: 9,
    colegiatura: 'CMP 58420 - RNE 36120',
    descripcion:
      'Atención de patologías de la piel, control de lunares y tratamientos estéticos dermatológicos.',
  },
  {
    id: 8,
    nombre: 'Dr. Miguel Ortega',
    especialidad: 'Neurología',
    cargo: 'Neurólogo clínico',
    experiencia: 15,
    colegiatura: 'CMP 42377 - RNE 20114',
    descripcion:
      'Especialista en cefaleas, epilepsia y trastornos del movimiento.',
  },
];

/** Servicio que centraliza la información del personal médico. */
@Injectable({ providedIn: 'root' })
export class MedicosService {
  private readonly medicosSignal = signal<Medico[]>(MEDICOS);

  /** Lista reactiva de médicos (solo lectura). */
  readonly medicos = this.medicosSignal.asReadonly();

  /** Devuelve la lista de especialidades disponibles (sin duplicados). */
  obtenerEspecialidades(): string[] {
    return [...new Set(this.medicosSignal().map((medico) => medico.especialidad))];
  }
}
