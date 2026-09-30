import { Component, computed, inject, signal } from '@angular/core';
import { Medico } from '../../core/interfaces';
import { MedicosService } from '../../core/services/medicos.service';

/** Sección que presenta a los médicos y sus especialidades. */
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.html',
  styleUrl: './medicos.css',
})
export class Medicos {
  private readonly medicosService = inject(MedicosService);

  /** Especialidad seleccionada en el filtro ("Todas" = sin filtro). */
  protected readonly especialidadActiva = signal('Todas');

  /** Lista completa de médicos (signal del servicio). */
  protected readonly medicos = this.medicosService.medicos;

  /** Especialidades disponibles para poblar el selector. */
  protected readonly especialidades = ['Todas', ...this.medicosService.obtenerEspecialidades()];

  /** Médicos filtrados según la especialidad activa. */
  protected readonly medicosFiltrados = computed<Medico[]>(() => {
    const especialidad = this.especialidadActiva();
    if (especialidad === 'Todas') {
      return this.medicos();
    }
    return this.medicos().filter((medico) => medico.especialidad === especialidad);
  });

  /** Cambia la especialidad usada para filtrar la lista. */
  protected filtrar(especialidad: string): void {
    this.especialidadActiva.set(especialidad);
  }

  /** Iniciales del médico para mostrar en el avatar. */
  protected iniciales(nombre: string): string {
    return nombre
      .replace(/(Dr|Dra)\.\s*/, '')
      .split(' ')
      .slice(0, 2)
      .map((parte) => parte.charAt(0))
      .join('')
      .toUpperCase();
  }
}
