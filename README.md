# pagweb-proyecto3-grupo7
# MarketOps - Plataforma de Monitoreo de Equipos

Proyecto realizado por el grupo 7 del ramo Desarrollo Web y Móvil.
Esta plataforma web busca centralizar y visibilizar el estado operativo de los equipos (cajas, balanzas e impresoras) en las 12 sucursales de la cadena de supermercados MarketOps, 
optimizando la gestión del equipo de soporte técnico.

## Estado Actual: Hito 1 (Maqueta Visual)

El proyecto actualmente, es solo una maqueta con las siguientes funciones a nivel de navegación:

*   **Pantalla de Inicio de Sesión:** Interfaz base para el acceso a la plataforma.
    * para considerar:  Se ha implementado un **Modo Debug ** temporal en la interfaz. Dado que el sistema de autenticación real corresponde a fases posteriores, 
      este atajo permite simular el ingreso y testear las vistas de las paginas, en las cuales solo serán vistas según el rol del usuario.
*   **Panel General de Sucursales:** Tablero de control principal. Muestra las 12 sucursales en una cuadrícula y 
      alerta de forma visual e inmediata si se han detectado fallas en los equipos de algún local.
*   **Detalle por Sucursal:** Al seleccionar una sucursal en estado de alerta desde el panel principal, 
      el sistema redirige a una vista detallada. Esta pantalla aísla la información, mostrando 
      el listado exacto de equipos de ese local y mostrando cuál es el que presenta la falla.



