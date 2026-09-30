import { Component, computed, inject, signal } from '@angular/core';
import { Consulta } from '../../core/interfaces';
import { AlertaService } from '../../core/services/alerta.service';
import { ConsultasService } from '../../core/services/consultas.service';
import { ServiciosService } from '../../core/services/servicios.service';

/** Datos del formulario (sin id ni fecha, que se generan al registrar). */
type DatosFormulario = Omit<Consulta, 'id' | 'fecha'>;

const DATOS_VACIOS: DatosFormulario = {
  nombre: '',
  email: '',
  telefono: '',
  servicio: '',
  mensaje: '',
};

/**
 * Sección de contacto con el formulario de solicitud de cita.
 * El estado se administra con Signals: `datos` guarda lo escrito por el
 * usuario, `enviado` controla las validaciones visibles y `formularioValido`
 * deriva de ambas. Las consultas registradas se almacenan en el
 * ConsultasService (también con Signals) y se muestran debajo del formulario.
 */
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  private readonly consultasService = inject(ConsultasService);
  private readonly serviciosService = inject(ServiciosService);
  protected readonly alertaService = inject(AlertaService);

  /** Servicios disponibles para el select del formulario. */
  protected readonly servicios = this.serviciosService.servicios;

  /** Consultas almacenadas y mostradas al usuario. */
  protected readonly consultas = this.consultasService.consultas;

  /** Información ingresada en el formulario. */
  protected readonly datos = signal<DatosFormulario>({ ...DATOS_VACIOS });

  /** Indica si el formulario ya fue intentado enviar. */
  protected readonly enviado = signal(false);

  /** Estado derivado: true cuando todos los campos son válidos. */
  protected readonly formularioValido = computed(() => {
    const datos = this.datos();
    return (
      datos.nombre.trim().length >= 3 &&
      this.emailValido(datos.email) &&
      this.telefonoValido(datos.telefono) &&
      datos.servicio !== '' &&
      datos.mensaje.trim().length >= 10
    );
  });

  /** Actualiza un campo del formulario dentro de la señal `datos`. */
  protected actualizar<Campo extends keyof DatosFormulario>(
    campo: Campo,
    valor: string,
  ): void {
    this.datos.update((actuales) => ({ ...actuales, [campo]: valor }));
  }

  /** Marca el campo como inválido (solo después del primer envío). */
  protected invalido(campo: keyof DatosFormulario): boolean {
    if (!this.enviado()) {
      return false;
    }
    const datos = this.datos();
    switch (campo) {
      case 'nombre':
        return datos.nombre.trim().length < 3;
      case 'email':
        return !this.emailValido(datos.email);
      case 'telefono':
        return !this.telefonoValido(datos.telefono);
      case 'servicio':
        return datos.servicio === '';
      case 'mensaje':
        return datos.mensaje.trim().length < 10;
      default:
        return false;
    }
  }

  /** Valida, registra la consulta y muestra la alerta correspondiente. */
  protected enviar(): void {
    this.enviado.set(true);

    if (!this.formularioValido()) {
      this.alertaService.mostrar(
        'danger',
        'Formulario incompleto',
        'Revisa los campos marcados en rojo antes de enviar tu solicitud.',
      );
      return;
    }

    this.consultasService.registrar(this.datos());
    this.alertaService.mostrar(
      'success',
      'Solicitud registrada',
      'Gracias por escribirnos. Te contactaremos muy pronto para confirmar tu cita.',
    );
    this.datos.set({ ...DATOS_VACIOS });
    this.enviado.set(false);
  }

  /** Elimina una consulta almacenada y lo notifica al usuario. */
  protected eliminar(id: number): void {
    this.consultasService.eliminar(id);
    this.alertaService.mostrar(
      'info',
      'Solicitud eliminada',
      'La consulta seleccionada ya no está en la lista.',
    );
  }

  private emailValido(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  }

  private telefonoValido(telefono: string): boolean {
    return /^[0-9+\s()-]{7,15}$/.test(telefono.trim());
  }
}
