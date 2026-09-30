import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Consulta } from '../interfaces';

const CLAVE_STORAGE = 'hospital-dr-santo-consultas';

/**
 * Servicio encargado de almacenar y exponer los formularios de consulta.
 * Utiliza Signals y persiste la información en localStorage del navegador.
 */
@Injectable({ providedIn: 'root' })
export class ConsultasService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly consultasSignal = signal<Consulta[]>([]);

  /** Lista reactiva de consultas registradas (solo lectura). */
  readonly consultas = this.consultasSignal.asReadonly();

  constructor() {
    this.cargarDesdeStorage();
  }

  /** Registra una nueva consulta generando id y fecha automáticamente. */
  registrar(datos: Omit<Consulta, 'id' | 'fecha'>): Consulta {
    const nueva: Consulta = {
      ...datos,
      id: Date.now(),
      fecha: new Date().toLocaleString('es-PE', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
    };
    this.consultasSignal.update((lista) => [nueva, ...lista]);
    this.guardarEnStorage();
    return nueva;
  }

  /** Elimina una consulta registrada por su identificador. */
  eliminar(id: number): void {
    this.consultasSignal.update((lista) => lista.filter((c) => c.id !== id));
    this.guardarEnStorage();
  }

  private cargarDesdeStorage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    try {
      const datos = localStorage.getItem(CLAVE_STORAGE);
      if (datos) {
        this.consultasSignal.set(JSON.parse(datos) as Consulta[]);
      }
    } catch {
      this.consultasSignal.set([]);
    }
  }

  private guardarEnStorage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(this.consultasSignal()));
  }
}
