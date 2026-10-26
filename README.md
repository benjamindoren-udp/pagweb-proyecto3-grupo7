# MarketOps - Plataforma de Monitoreo y Gestión de Equipos

Plataforma web realizada por el Grupo 7 para el ramo Desarrollo Web y Móvil. Este sistema centraliza y visibiliza el estado operativo de los equipos (cajas, balanzas e impresoras) en las 12 sucursales de la cadena de supermercados MarketOps, optimizando la gestión del equipo de soporte técnico y encargados de tienda.

---

## Integrantes
Integrante 1: Darien Corsi
Integrante 2: Benjamin Doren
Integrante 3: Catalina Órdenes

---

## Descripción del Proyecto y Permisos
MarketOps permite a los encargados de sucursal y al equipo de soporte técnico supervisar la disponibilidad de los equipos, visualizar alertas de fallas y gestionar el estado operativo de los dispositivos de forma centralizada:
- **Pantalla de Inicio de Sesión (Index):** Accesible para todos los usuarios. Cuenta con un **Modo Debug** temporal para simular el ingreso y validar el comportamiento de las vistas según el rol de usuario.
- **Panel General de Sucursales:** Orientado a técnicos de soporte y administradores para visualizar las 12 sucursales en cuadrícula y detectar alertas de fallas de forma inmediata.
- **Detalle de Sucursal:** Vista específica para técnicos, administradores y el encargado del local correspondiente (restringido a su sucursal), permitiendo aislar la información y revisar el listado exacto de equipos.

---

## Entrega 1 (Hito 1) - Maqueta Visual
En la primera entrega se desarrolló la maquetación inicial basada en HTML5 semántico y CSS estático:
- Maquetación base de la pantalla de inicio de sesión, panel de sucursales y detalle.
- Estructuración de navegación e interfaces por rol.
- Carga funcional en servidor web y control de versiones mediante repositorio público en GitHub.

---

## Entrega 2 (Hito 2) - Frontend Dinámico

### Descripción de la Entrega 2
En este Hito 2 la plataforma evolucionó hacia una aplicación de una sola página (SPA) interactiva desarrollada en React. Se implementó el control de estado dinámico para actualizar métricas en tiempo real y el flujo obligatorio de cambio de disponibilidad técnica en equipos.

### Cambios y Mejoras respecto a la Entrega 1
- **Migración a React:** Transformación del marcado estático a componentes reutilizables por responsabilidad (`Login.jsx`, `DetalleSucursal.jsx`, `SucursalCard.jsx`).
- **Manejo de Estado Dinámico (`useState`):** Gestión de datos de sucursales y equipos desde JavaScript, actualizando métricas sin recargar la página.
- **Navegación y Filtrado:** Pestañas interactivas para segmentar sucursales (*Todas*, *Con fallas*, *Sin fallas*) y vista individual por tienda.
- **Flujo con Modal y Validación Obligatoria:** Al cambiar el estado de un equipo se despliega un modal con un formulario que exige **ingresar obligatoriamente el motivo del cambio** antes de guardar.
- **Actualización Reflejada:** El cambio de estado y la observación se actualizan de forma inmediata tanto en la vista de detalle como en el listado general.
- **Diseño Responsivo:** Hoja `style.css` unificada y probada en resoluciones de 390px, 768px y 1366px.

Integrante 1: Benjamin Doren
Integrante 2: Darien Corsi
Integrante 3: Catalina Ordenes
Repositorio: https://github.com/benjamindoren-udp/pagweb-proyecto3-grupo7
Link pagina: http://44.212.201.30/
