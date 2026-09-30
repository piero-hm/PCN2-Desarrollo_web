import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertaComponent } from './shared/alerta/alerta';
import { FooterComponent } from './shared/footer/footer';
import { NavbarComponent } from './shared/navbar/navbar';

/** Componente raíz: estructura general de la página institucional. */
@Component({
  imports: [RouterOutlet, NavbarComponent, FooterComponent, AlertaComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Hospital Dr. Santo');
}
