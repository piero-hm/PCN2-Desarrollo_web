import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Enlace {
  ruta: string;
  texto: string;
}

/**
 * Barra de navegación responsive.
 * Mantiene en un signal el estado del menú móvil para poder
 * abrirlo y cerrarlo desde la plantilla.
 */
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  /** Menú colapsado en pantallas pequeñas (false = abierto). */
  protected readonly menuCerrado = signal(true);

  protected readonly enlaces: Enlace[] = [
    { ruta: '/inicio', texto: 'Inicio' },
    { ruta: '/servicios', texto: 'Servicios' },
    { ruta: '/medicos', texto: 'Médicos' },
    { ruta: '/resenas', texto: 'Reseñas' },
    { ruta: '/promociones', texto: 'Promociones' },
    { ruta: '/contacto', texto: 'Contacto' },
  ];

  /** Alterna el menú desplegable en dispositivos móviles. */
  protected alternarMenu(): void {
    this.menuCerrado.update((cerrado) => !cerrado);
  }

  /** Cierra el menú al elegir una sección (útil en móvil). */
  protected cerrarMenu(): void {
    this.menuCerrado.set(true);
  }
}
