import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Rutas del servidor: las páginas se generan en tiempo de compilación
 * (prerender) y cualquier otra ruta se renderiza bajo demanda (SSR).
 */
export const serverRoutes: ServerRoute[] = [
  { path: 'inicio', renderMode: RenderMode.Prerender },
  { path: 'servicios', renderMode: RenderMode.Prerender },
  { path: 'medicos', renderMode: RenderMode.Prerender },
  { path: 'promociones', renderMode: RenderMode.Prerender },
  { path: 'resenas', renderMode: RenderMode.Prerender },
  { path: 'contacto', renderMode: RenderMode.Prerender },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
