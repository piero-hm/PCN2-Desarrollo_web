import { Component, inject } from '@angular/core';
import { ServiciosService } from '../../core/services/servicios.service';

/** Sección que presenta los servicios que ofrece el hospital. */
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class Servicios {
  protected readonly serviciosService = inject(ServiciosService);
}
