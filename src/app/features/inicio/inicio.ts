import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiciosService } from '../../core/services/servicios.service';

/** Sección de inicio: presentación del hospital y llamados a la acción. */
@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  protected readonly serviciosService = inject(ServiciosService);

  protected readonly datos = [
    { valor: '35', etiqueta: 'Años cuidando tu salud' },
    { valor: '120+', etiqueta: 'Profesionales de salud' },
    { valor: '24/7', etiqueta: 'Emergencias siempre abiertas' },
    { valor: '4.8', etiqueta: 'Calificación de pacientes' },
  ];
}
