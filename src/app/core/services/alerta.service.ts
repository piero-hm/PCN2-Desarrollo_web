import { Injectable, signal } from '@angular/core';
import { Alerta } from '../interfaces';

/**
 * Servicio global de alertas.
 * Mantiene una señal reactiva con la alerta visible y permite
 * cerrarla automáticamente después de unos segundos.
 */
@Injectable({ providedIn: 'root' })
export class AlertaService {
  private readonly alertaSignal = signal<Alerta | null>(null);
  private temporizador: ReturnType<typeof setTimeout> | undefined;

  /** Alerta actualmente visible (null si no hay ninguna). */
  readonly alerta = this.alertaSignal.asReadonly();

  mostrar(
    tipo: Alerta['tipo'],
    titulo: string,
    mensaje: string,
    autoCierreMs = 5000,
  ): void {
    if (this.temporizador) {
      clearTimeout(this.temporizador);
    }
    this.alertaSignal.set({ id: Date.now(), tipo, titulo, mensaje });
    if (autoCierreMs > 0) {
      this.temporizador = setTimeout(() => this.cerrar(), autoCierreMs);
    }
  }

  cerrar(): void {
    if (this.temporizador) {
      clearTimeout(this.temporizador);
      this.temporizador = undefined;
    }
    this.alertaSignal.set(null);
  }
}
