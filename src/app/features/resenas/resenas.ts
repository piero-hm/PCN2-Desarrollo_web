import { Component, inject, signal } from '@angular/core';
import { Resena } from '../../core/interfaces';
import { AlertaService } from '../../core/services/alerta.service';
import { ResenasService } from '../../core/services/resenas.service';

/** Estado inicial del formulario de nueva reseña. */
const RESENA_VACIA: Resena = {
  id: 0,
  paciente: '',
  puntuacion: 5,
  comentario: '',
  fecha: '',
};

/**
 * Sección de reseñas: muestra las opiniones de los pacientes y permite
 * registrar nuevas. El formulario se administra con Signals (`formulario`
 * guarda los datos y `errores` los mensajes de validación).
 */
@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.html',
  styleUrl: './resenas.css',
})
export class Resenas {
  protected readonly resenasService = inject(ResenasService);
  private readonly alertaService = inject(AlertaService);

  /** Rango para pintar las estrellas. */
  protected readonly estrellas = [1, 2, 3, 4, 5];

  /** Expuesto para usar Math.round en la plantilla. */
  protected readonly Math = Math;

  /** Datos ingresados en el formulario (Signal). */
  protected readonly formulario = signal<Resena>({ ...RESENA_VACIA });

  /** Mensajes de validación del formulario (Signal). */
  protected readonly errores = signal<string[]>([]);

  /** Actualiza un campo de texto del formulario de forma inmutable. */
  protected actualizarCampo(campo: 'paciente' | 'comentario', valor: string): void {
    this.formulario.update((datos) => ({ ...datos, [campo]: valor }));
  }

  /** Cambia la puntuación seleccionada. */
  protected actualizarPuntuacion(valor: number): void {
    this.formulario.update((datos) => ({ ...datos, puntuacion: valor }));
  }

  /** Valida, registra la reseña y muestra la alerta correspondiente. */
  protected enviar(): void {
    const datos = this.formulario();
    const errores: string[] = [];

    if (datos.paciente.trim().length < 3) {
      errores.push('Ingresa tu nombre completo (mínimo 3 caracteres).');
    }
    if (datos.comentario.trim().length < 10) {
      errores.push('El comentario debe tener al menos 10 caracteres.');
    }

    this.errores.set(errores);

    if (errores.length > 0) {
      this.alertaService.mostrar('danger', 'Revisa tu reseña', errores[0]);
      return;
    }

    this.resenasService.agregar({
      paciente: datos.paciente.trim(),
      puntuacion: datos.puntuacion,
      comentario: datos.comentario.trim(),
    });

    this.formulario.set({ ...RESENA_VACIA });
    this.errores.set([]);
    this.alertaService.mostrar(
      'success',
      '¡Gracias por tu opinión!',
      'Tu reseña se registró correctamente y ya aparece en la lista.',
    );
  }

  /** Iniciales del paciente para el avatar. */
  protected iniciales(nombre: string): string {
    return nombre
      .split(' ')
      .slice(0, 2)
      .map((parte) => parte.charAt(0))
      .join('')
      .toUpperCase();
  }
}
