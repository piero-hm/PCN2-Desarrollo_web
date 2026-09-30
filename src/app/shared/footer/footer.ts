import { Component } from '@angular/core';

/** Pie de página con la información de contacto del hospital. */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  protected readonly anio = new Date().getFullYear();
}
