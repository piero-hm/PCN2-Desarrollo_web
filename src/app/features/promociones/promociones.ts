import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PromocionesService } from '../../core/services/promociones.service';

/** Sección que muestra las promociones vigentes del hospital. */
@Component({
  selector: 'app-promociones',
  imports: [RouterLink],
  templateUrl: './promociones.html',
  styleUrl: './promociones.css',
})
export class Promociones {
  protected readonly promocionesService = inject(PromocionesService);
}
