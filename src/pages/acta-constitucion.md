---
layout: ../layouts/Documento.astro
title: Acta de constitución
fecha: 2026-09-25
---

| Proyecto | Patrocinadora | Líder del proyecto |
| --- | --- | --- |
| Transformación Digital y Gobernanza de Datos en Roma Bag's | Nathaly Milagros Rupay Vega, Gerencia General | Maria Camargo, Equipo Consultor UNTELS |

## Necesidad del negocio

Roma Bag's es una microempresa de 19 personas que fabrica y vende carteras (3 máquinas, 30–40 carteras al día). Su
información está fragmentada: el inventario se anota en cuadernos, las ventas se reparten entre seis celulares sin
sincronizar y la conciliación se hace a mano en Excel. Los efectos están documentados:

- El 70,8 % de los registros de despacho carece de información financiera o logística completa (Anexo 2.5, Excel 2026).
- La Gerencia dedica un día laborable a la semana, el sábado, a cuadrar registros.
- Hay nueve pedidos incompletos al mes, con un sobrecosto de S/ 19 a S/ 24 por envío duplicado.
- No existe un historial confiable para proyectar la demanda de temporada.

## Solución elegida

Una **transformación digital por fases**: primero reglas de datos y un piloto de captura, luego Odoo Community y al
final la analítica. Obtuvo el mayor puntaje en la evaluación de viabilidad (30/35).

| Alternativa | Decisión |
| --- | --- |
| Arquitectura BI a medida (Data Warehouse + ETL + Power BI) | Descartada: costosa y sobredimensionada para una empresa sin área de TI. |
| Ecosistema no-code (Google Sheets API + AppSheet) | Descartada por las mismas razones. |
| ERP Odoo Community instalado directamente | Viable (18/21), pero riesgosa sin hábito de dato digital ni conectividad estable. |
| **Transformación digital por fases** | **Elegida** (30/35): integra las opciones anteriores de forma gradual. |

## Objetivos

**Objetivo general:** integrar y estandarizar la información operativa y comercial con reglas de datos, un piloto de
captura y Odoo Community, para que Gerencia, Ventas y Producción consulten datos confiables de inventario, ventas y
despachos al cierre del proyecto.

| N.º | Objetivo específico | Plazo |
| --- | --- | --- |
| 1 | Definir responsables, diccionario, reglas de calidad, accesos y respaldo; aprobar el flujo venta–stock–despacho. | Gate 1 |
| 2 | Estabilizar la conectividad y probar en un piloto la captura central y la consulta móvil de stock en menos de 2 minutos. | Gate 1 |
| 3 | Configurar Odoo, migrar y conciliar datos, y superar la UAT sin defectos críticos abiertos. | Gate 2 |
| 4 | Operar el flujo obligatorio de venta, stock y despacho y bajar los registros incompletos del 70,8 % al 5 % o menos. | Tras la salida en vivo |
| 5 | Habilitar reportes móviles de stock, calidad de datos y rentabilidad, verificados con operaciones reales. | Gate 3 |
| 6 | Capacitar a los usuarios, activar Odoo en los dispositivos, retirar el piloto y transferir los controles al Comité de Datos. | Cierre |

**Beneficios esperados:** bajar los pedidos incompletos de nueve a uno o menos al mes, evitar dobles envíos y reducir
la conciliación gerencial de un día a menos de una hora por semana. La organización los medirá durante la operación.

## Alcance

- **Incluye:** diagnóstico AS-IS / TO-BE, limpieza de Excel, roles, respaldos, SOP, catálogo, talleres, flujo
  venta–stock–despacho, pruebas y entrega documental, usando los 3 portátiles y 6 celulares existentes. Excel
  coexiste durante el piloto; tras el corte, Odoo es la fuente oficial.
- **Excluye:** hardware nuevo, facturación electrónica, contabilidad formal, SUNAT, comercio electrónico, maquinaria,
  almacén de datos y soporte permanente. Cualquier desarrollo a medida se trata como cambio de alcance.

El desglose completo del trabajo está en la [línea base del alcance](/lineas-base/alcance).

## Hitos

| Hito | Fecha | Criterio de aceptación |
| --- | --- | --- |
| Acta de constitución | 25/09/2026 | Firma de la patrocinadora y de la líder del proyecto. |
| Gate 1 · Cimentar | 17/11/2026 | Red verificada; reglas, SOP y respaldo aprobados; datos validados y piloto revisado. |
| Gate 2 · Integrar | 08/03/2027 | Odoo configurado y probado, migración conciliada y UAT sin defectos críticos abiertos. |
| Salida en vivo | 31/03/2027 | Usuarios capacitados, lote final conciliado y Odoo activo en los dispositivos. |
| Gate 3 · Conformidad | 21/04/2027 | Aceptación y reportes verificados; controles transferidos. |
| Fin administrativo | 26/04/2027 | Entrega final de documentación y archivo del proyecto. |

## Autoridad y roles

- **Gerencia General (patrocinadora):** autoriza el proyecto, firma el acta y los gates, valida SOP y políticas y
  aprueba los cambios de alcance, cronograma o presupuesto. El Socio de Producción participa de forma consultiva en
  las decisiones que afectan al taller.
- **Líder del proyecto / Equipo Consultor UNTELS:** dirige el diagnóstico, diseña y configura la solución, mantiene
  el cronograma y el registro de cambios, presenta avances semanales y conduce las capacitaciones y los gates.
- **Socio / Jefe de Producción, Ventas y Empaque:** validan y adoptan el nuevo flujo en su área y participan en la UAT.

## Restricciones y factores críticos de éxito

| Restricciones | Factores críticos de éxito |
| --- | --- |
| Sin hardware nuevo: solo 3 portátiles y 6 celulares. | Uso diario del sistema por la Gerencia, no solo su aprobación. |
| La solución debe operar desde el celular en todas las fases. | Adopción del Socio de Producción, que tiene veto operativo en el taller. |
| Excel coexiste durante toda la fase Cimentar. | Conectividad estable antes de escalar a Odoo. |
| Entorno de pruebas separado del productivo. | Cumplir los tres gates sin saltos prematuros. |
| Herramientas intuitivas que no entorpezcan la atención al cliente. | Cero errores críticos en la UAT antes del reemplazo. |
| Sin área de TI; el soporte posterior al cierre queda fuera del alcance. | Coexistencia planificada con Excel para reducir la resistencia al cambio. |

## Documentos

- [Acta de constitución del proyecto.pdf](/documentos/acta-constitucion/acta-constitucion.pdf)
