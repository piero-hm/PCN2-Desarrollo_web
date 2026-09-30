import { Injectable, signal } from '@angular/core';
import { Resena } from '../interfaces';

const RESENAS: Resena[] = [
  {
    id: 1,
    paciente: 'María Fernanda',
    puntuacion: 5,
    comentario:
      'Me atendieron de emergencias a las 3 de la mañana. El personal es muy humano y la atención fue rápida.',
    fecha: '12 de agosto, 2026',
  },
  {
    id: 2,
    paciente: 'José Luis Quispe',
    puntuacion: 5,
    comentario:
      'La Dra. Mendoza me explicó todo con mucha paciencia. Los resultados del laboratorio llegaron al correo en pocas horas.',
    fecha: '28 de julio, 2026',
  },
  {
    id: 3,
    paciente: 'Rosa Elena',
    puntuacion: 4,
    comentario:
      'Muy buen trato en maternidad, las habitaciones están limpias y cómodas. Solo esperaría un poco menos de espera.',
    fecha: '5 de julio, 2026',
  },
  {
    id: 4,
    paciente: 'Carlos Benites',
    puntuacion: 5,
    comentario:
      'Operaron a mi padre por urgencia y todo salió excelente. La comunicación con el equipo quirúrgico fue constante.',
    fecha: '19 de junio, 2026',
  },
];

/**
 * Servicio de reseñas de pacientes.
 * Permite obtener y registrar nuevas reseñas usando Signals.
 */
@Injectable({ providedIn: 'root' })
export class ResenasService {
  private readonly resenasSignal = signal<Resena[]>(RESENAS);

  /** Lista reactiva de reseñas (solo lectura). */
  readonly resenas = this.resenasSignal.asReadonly();

  /** Registra una nueva reseña y la coloca al inicio de la lista. */
  agregar(resena: Omit<Resena, 'id' | 'fecha'>): Resena {
    const nueva: Resena = {
      ...resena,
      id: Date.now(),
      fecha: new Date().toLocaleDateString('es-PE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };
    this.resenasSignal.update((lista) => [nueva, ...lista]);
    return nueva;
  }

  /** Puntuación promedio de todas las reseñas (redondeada a 1 decimal). */
  promedio(): number {
    const lista = this.resenasSignal();
    if (lista.length === 0) {
      return 0;
    }
    const suma = lista.reduce((total, resena) => total + resena.puntuacion, 0);
    return Math.round((suma / lista.length) * 10) / 10;
  }
}
