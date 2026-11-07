# PROTOCOLO DE COEXISTENCIA CON EXCEL Y CORTE A ODOO

| DATOS GENERALES DEL PROYECTO Y DEL ENTREGABLE | REGISTRO OFICIAL |
| --- | --- |
| **Código EDT:** | 1.3.20 |
| **Nombre del Entregable:** | Protocolo de Coexistencia con Excel y Corte a Odoo |
| **Fase / Componente del Proyecto:** | Fase 3: Configuración, Parametrización y Limpieza — Gobernanza |
| **Responsable:** | Líder del Proyecto |
| **Alcance del Documento:** | Reglas de convivencia entre el Excel actual y la base centralizada del piloto durante la Fase Cimentar, y criterios para declarar el corte hacia Odoo como fuente oficial en la Fase Integrar. |

## 1. Propósito

Fijar las reglas con las que el Excel y el piloto conviven sin generar doble trabajo ni información contradictoria, y definir las condiciones objetivas que deben cumplirse antes de declarar a Odoo como fuente oficial y retirar el piloto.

## 2. Por qué existe este protocolo

El acuerdo de Transición Segura, firmado con la Gerencia desde el inicio del proyecto, establece que ninguna solución reemplazará el Excel de forma abrupta. Este protocolo convierte ese acuerdo en reglas operativas concretas, evitando que la coexistencia se mantenga indefinidamente sin una fecha ni un criterio de cierre.

## 3. Reglas de coexistencia durante el piloto

| Regla | Descripción |
| --- | --- |
| Fuente de verdad del piloto | Mientras dure la coexistencia, los registros de venta, stock y despacho del piloto son la fuente oficial para efectos de conciliación; el Excel se mantiene como respaldo de consulta, no como registro paralelo válido. |
| Sin doble digitación | Ningún dato se registra manualmente dos veces en Excel y en el piloto. Si una excepción obliga a registrar primero en papel o Excel (por ejemplo, falta de conectividad), el dato se transcribe al piloto el mismo día, según el SOP del flujo Venta–Stock–Despacho. |
| Responsable único de conciliación | La Gerencia es la única responsable de resolver diferencias entre el Excel y el piloto; el personal operativo no decide por su cuenta cuál registro prevalece. |
| Preservación del histórico | El Excel con el historial de aproximadamente ocho meses no se elimina ni se sobrescribe durante la coexistencia; se conserva como respaldo y como fuente de comparación para validar la migración. |
| Alcance de la coexistencia | La coexistencia aplica al taller principal y al taller alterno por igual; ambos mantienen sus registros Excel visibles hasta el corte. |

## 4. Criterios de corte hacia Odoo

El corte del piloto y el paso a Odoo como fuente oficial solo se declara cuando se cumplen, en conjunto, las siguientes condiciones:

| Criterio | Condición para el corte |
| --- | --- |
| Migración conciliada | Los registros del piloto migraron a Odoo de pruebas con integridad verificada, sin diferencias no explicadas frente al histórico. |
| Pruebas de aceptación aprobadas | La UAT con Ventas, Producción y Gerencia está aprobada, sin defectos críticos abiertos. |
| Responsable de fuente oficial designado | Existe un único responsable formalmente asignado para mantener Odoo como fuente oficial a partir del corte. |
| Plan de corte aprobado | Gerencia aprueba la fecha y el procedimiento de corte, como parte de los requisitos del Gate 2. |

## 5. Qué ocurre en el momento del corte

1. Se bloquea el registro de nuevas operaciones en la base centralizada del piloto; queda disponible solo para consulta histórica.
2. El Excel deja de usarse para registrar operaciones nuevas, pero se conserva como archivo histórico, sin eliminarse.
3. Odoo pasa a ser la única fuente oficial para ventas, stock y despacho a partir de esa fecha.
4. Cualquier discrepancia detectada después del corte se trata como incidente, no como una razón para reactivar el Excel o el piloto como registro paralelo.

## 6. Resultado y siguiente paso

Este protocolo queda como referencia vigente durante toda la Fase Cimentar y hasta el corte definitivo en la Fase Integrar. Su cumplimiento es uno de los requisitos de coexistencia documentada exigidos para el Gate 1, y sus criterios de corte son la base del plan de corte que se aprueba en el Gate 2.

## Fuentes

- Acta de Constitución del Proyecto.
- SOP del Flujo Venta–Stock–Despacho.
- Plan de involucramiento de los interesados.
