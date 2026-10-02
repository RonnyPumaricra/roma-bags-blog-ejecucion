---
layout: ../../layouts/LineaBase.astro
id: alcance
---

## Enunciado del alcance

**Incluido:** diagnóstico AS-IS/TO-BE, conectividad, base piloto temporal, gobierno y limpieza de datos, Odoo
Community para inventario, ventas y despachos, conciliación y migración, pruebas por rol, reportes gerenciales,
capacitación, salida a producción, monitoreo y transferencia al Comité de Datos.

**Excluido:** recuperación de registros perdidos del 2024, contabilidad formal, facturación electrónica, integración
SUNAT, e-commerce, automatización de maquinaria y mantenimiento evolutivo posterior al cierre.

## Estructura de desglose del trabajo (EDT)

El proyecto **Transformación Digital Roma Bag's** se desglosa por entregables en cinco ramas; sus paquetes cubren las
92 actividades e hitos del cronograma.

| Paquete | Entregable y aceptación | Responsable |
| --- | --- | --- |
| **1.1 Dirección y planificación** | | |
| EDT-1.1.01 Dirección y líneas base | Acta firmada, responsables y planes aprobados | Patrocinador / líder |
| EDT-1.1.02 Seguimiento y control | Informes, registro de cambios y seguimiento documentado | Líder |
| **1.2 Diagnóstico AS-IS/TO-BE** | | |
| EDT-1.2.01 Diagnóstico AS-IS | Flujo actual y fuentes auditadas | Analista / Gerencia |
| EDT-1.2.02 Diseño TO-BE y requisitos | Requisitos REQ-01–10 y trazabilidad firmada | Analista / responsables |
| **1.3 Cimentar** | | |
| EDT-1.3.01 Conectividad operativa | Red y respaldo móvil probados en talleres | Infraestructura |
| EDT-1.3.02 Gobierno inicial y calidad | Comité, dueños, diccionario, SOP, respaldo y catálogo depurado | Gerencia / dueños de datos |
| EDT-1.3.03 Piloto centralizado controlado | Modelo mapeado, captura, stock móvil y coexistencia trazable | Analista / usuarios |
| EDT-1.3.04 Aprobación Cimentar | Gate 1 firmado el 17/11/2026 | Gerencia |
| **1.4 Integrar** | | |
| EDT-1.4.01 Servidor y Odoo de prueba | Entorno instalado y configuración inicial verificada | Infraestructura |
| EDT-1.4.02 Roles y permisos | Perfiles por rol y pruebas de restricción | Analista / dueños |
| EDT-1.4.03 Catálogo y migración conciliados | Catálogo homologado, datos de prueba conciliados y plan de corte | Dueños de datos / analista |
| EDT-1.4.04 Flujo operativo Odoo | Venta–stock–despacho, talleres y bloqueos probados | Analista / usuarios |
| EDT-1.4.05 Pruebas y aceptación Integrar | UAT firmada, cero defectos críticos abiertos y Gate 2 del 08/03/2027 | Usuarios / Gerencia |
| **1.5 Optimizar y cerrar** | | |
| EDT-1.5.01 Reportes y controles de calidad | KPIs y rentabilidad verificados en uso real | Gerencia / analista |
| EDT-1.5.02 Manuales y capacitación | Guías y formación por rol | Usuarios / líder |
| EDT-1.5.03 Salida a producción | Corte conciliado, salida en vivo, piloto retirado y operación observada | Dueños / analista |
| EDT-1.5.04 Conformidad y cierre | Comité recibe control, expediente, Gate 3 el 21/04 y archivo el 26/04 | Gerencia / líder |

## Criterios de aceptación por gate

| Gate | Fecha | Criterios |
| --- | --- | --- |
| Gate 1 · Cimentar | 17/11/2026 | Conectividad verificada; comité y responsables designados; diccionario, SOP y respaldo aprobados; catálogo depurado; captura piloto y consulta móvil comprobadas; coexistencia con Excel documentada. |
| Gate 2 · Integrar | 08/03/2027 | Odoo en pruebas con datos conciliados, flujo y permisos verificados, UAT firmadas por Ventas, Producción y Gerencia, sin defectos críticos abiertos y plan de corte aprobado. |
| Gate 3 · Conformidad | 21/04/2027 | Odoo como fuente oficial, monitoreo y auditoría de calidad, reportes en uso real, capacitación, criterios de aceptación e informe final verificados; conformidad firmada. |

## Requisitos

| ID | Requisito | Criterio de aceptación |
| --- | --- | --- |
| REQ-01 | Fuente única de inventario y ventas | Registro consistente y fuente oficial Odoo tras el corte. |
| REQ-02 | Consulta móvil de stock | Consulta cronometrada en menos de 2 minutos. |
| REQ-03 | Conciliación semanal ágil | Comparar tiempo real frente a línea base de 1 día semanal. |
| REQ-04 | Despacho completo y trazable | Casos UAT de ventas, stock y despacho; tras la salida en vivo, 5 % o menos de registros incompletos en la muestra revisada. |
| REQ-05 | Reportes móviles de stock, calidad de datos y rentabilidad operativa | Gerencia valida cifras, fuentes y acceso por rol. |
| REQ-06 | Operación en celulares y dos talleres | Pruebas de conectividad y flujo por ubicación. |
| REQ-07 | Coexistencia controlada y corte del piloto | Un responsable de fuente oficial; piloto bloqueado tras la salida. |
| REQ-08 | Respaldo, seguridad y permisos | Respaldo verificable y acceso probado por rol. |
| REQ-09 | Datos depurados, conciliados y preservados | Conteos y saldos conciliados; originales de 2026 preservados. |
| REQ-10 | Adopción y transferencia de control | Capacitación por rol, evidencias de uso y responsables firmados. |
