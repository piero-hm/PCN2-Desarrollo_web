import { Component, inject } from '@angular/core';
import { AlertaService } from '../../core/services/alerta.service';

/**
 * Alerta global de la aplicación.
 * Se suscribe a la señal `alerta` del AlertaService y representa el estado
 * visual con las clases de alerta de Bootstrap (success, danger, warning...).
 */
@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.html',
  styleUrl: './alerta.css',
})
export class AlertaComponent {
  protected readonly alertaService = inject(AlertaService);

  /** Devuelve el ícono de Bootstrap Icons asociado al tipo de alerta. */
  protected iconoDe(tipo: string): string {
    const iconos: Record<string, string> = {
      success: 'bi-check-circle-fill',
      danger: 'bi-exclamation-triangle-fill',
      warning: 'bi-exclamation-circle-fill',
      info: 'bi-info-circle-fill',
      primary: 'bi-bell-fill',
    };
    return iconos[tipo] ?? 'bi-bell-fill';
  }
}
