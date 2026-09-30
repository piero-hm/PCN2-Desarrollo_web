import { Routes } from '@angular/router';

/**
 * Rutas de la página institucional.
 * Cada sección se carga de forma diferida (lazy loading) mediante `loadComponent`,
 * de modo que el navegador solo descarga el código de la página que se visita.
 */
export const routes: Routes = [
  {
    path: 'inicio',
    title: 'Hospital Dr. Santo | Inicio',
    loadComponent: () => import('./features/inicio/inicio').then((m) => m.Inicio),
  },
  {
    path: 'servicios',
    title: 'Hospital Dr. Santo | Servicios',
    loadComponent: () =>
      import('./features/servicios/servicios').then((m) => m.Servicios),
  },
  {
    path: 'medicos',
    title: 'Hospital Dr. Santo | Médicos',
    loadComponent: () => import('./features/medicos/medicos').then((m) => m.Medicos),
  },
  {
    path: 'resenas',
    title: 'Hospital Dr. Santo | Reseñas',
    loadComponent: () => import('./features/resenas/resenas').then((m) => m.Resenas),
  },
  {
    path: 'promociones',
    title: 'Hospital Dr. Santo | Promociones',
    loadComponent: () =>
      import('./features/promociones/promociones').then((m) => m.Promociones),
  },
  {
    path: 'contacto',
    title: 'Hospital Dr. Santo | Contacto',
    loadComponent: () =>
      import('./features/contacto/contacto').then((m) => m.Contacto),
  },
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', redirectTo: 'inicio' },
];
