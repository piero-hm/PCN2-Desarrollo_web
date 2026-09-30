# Hospital Dr. Santo — Página institucional

Página web institucional del **Hospital Dr. Santo**, desarrollada con **Angular** y
estilada con **Bootstrap 5** (responsive).

## Requisitos cubiertos

| Requisito | Implementación |
| --- | --- |
| Servicios del hospital | `src/app/core/services/servicios.service.ts` + página `servicios` |
| Médicos y especialidades | `medicos.service.ts` + página `medicos` (filtro con Signals) |
| Reseñas de pacientes | `resenas.service.ts` + página `resenas` (listado + formulario con Signals) |
| Promociones vigentes | `promociones.service.ts` + página `promociones` |
| Responsive y visualmente atractiva | Bootstrap (grillas, cards, navbar, alerts) + estilos propios |
| Framework Angular | Angular 22 (componentes standalone, rutas lazy, SSR) |
| Formulario que almacena y muestra información | Página `contacto` (Signals + `consultas.service.ts` + `localStorage`) |
| Repositorio Git | Historial de commits descriptivos por etapa |

## Estructura del proyecto

```
src/app/
├── core/
│   ├── interfaces/          # Modelos de datos (Servicio, Medico, Resena, Promocion, Consulta, Alerta)
│   └── services/            # Servicios con Signals
│       ├── servicios.service.ts
│       ├── medicos.service.ts
│       ├── promociones.service.ts
│       ├── resenas.service.ts      # leer y agregar reseñas
│       ├── consultas.service.ts    # almacenar formularios (localStorage)
│       └── alerta.service.ts       # alertas globales reactivas
├── shared/
│   ├── navbar/              # Navegación responsive (estado con Signal)
│   ├── footer/              # Pie de página institucional
│   └── alerta/              # Componente de alertas de Bootstrap
├── features/
│   ├── inicio/              # Hero, estadísticas y accesos rápidos
│   ├── servicios/           # Listado de servicios
│   ├── medicos/             # Médicos + filtro por especialidad (computed)
│   ├── promociones/         # Promociones vigentes
│   ├── resenas/             # Reseñas + formulario (Signals)
│   └── contacto/            # Formulario que almacena y muestra datos
├── app.routes.ts            # Rutas con carga diferida (lazy)
└── app.ts                   # Componente raíz (navbar + router + footer)
```

## Conceptos de Angular utilizados

- **Componentes standalone**: cada página y elemento compartido es un componente
  independiente con su plantilla (`.html`), estilos (`.css`) y lógica (`.ts`).
- **Interfaces**: contratos de datos en `core/interfaces` para tipar toda la
  información que circula por la aplicación.
- **Servicios**: `@Injectable({ providedIn: 'root' })` centralizan los datos y la
  lógica reutilizable; los componentes solo consumen (`inject(...)`).
- **Signals**: `signal()`, `.asReadonly()`, `.update()` y `computed()` mantienen
  el estado reactivo (formulario, filtros, alertas, listas).
- **Rutas con lazy loading** y títulos por ruta (`TitleStrategy`).
- **SSR / prerender** habilitados por la plantilla de Angular.

## Formularios con Signals

**Formulario de contacto (`features/contacto`)** — requisito de almacenar y mostrar información:

1. El estado vive en una única señal: `datos = signal<DatosFormulario>({...})`
   y cada campo se actualiza de forma inmutable con
   `datos.update((actuales) => ({ ...actuales, [campo]: valor }))`.
2. `enviado = signal(false)` controla cuándo aparecen las validaciones.
3. `formularioValido = computed(...)` deriva del estado de los dos signals
   anteriores (nombre, email, teléfono, servicio y mensaje).
4. Al enviar, `ConsultasService.registrar()` guarda la solicitud (id y fecha
   automáticos) y la persiste en `localStorage`.
5. Las consultas almacenadas se muestran **debajo del formulario** en una tabla
   responsive (tarjetas en móvil) y se pueden eliminar.
6. Cada acción muestra una **alerta de Bootstrap** con `AlertaService`
   (`success`, `danger`, `info`).

**Formulario de reseñas (`features/resenas`)**: `formulario = signal<Resena>({...})`
y `errores = signal<string[]>([])`; al validar se registra con
`ResenasService.agregar()` y la nueva reseña aparece de inmediato en la lista.

## Correr el proyecto

```bash
npm install
npm start          # http://localhost:4200
npm run build      # build de producción
npm test           # pruebas unitarias (Vitest)
```

## Estructura de las rutas

| Ruta | Página |
| --- | --- |
| `/inicio` | Portada institucional |
| `/servicios` | Servicios del hospital |
| `/medicos` | Médicos y especialidades |
| `/promociones` | Promociones vigentes |
| `/resenas` | Reseñas + formulario |
| `/contacto` | Formulario de citas (almacena y muestra datos) |
