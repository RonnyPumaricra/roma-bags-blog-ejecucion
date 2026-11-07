# SOP — Flujo Venta–Stock–Despacho

| DATOS GENERALES DEL PROYECTO Y DEL ENTREGABLE | REGISTRO OFICIAL |
| --- | --- |
| **Código EDT:** | 1.3.10 |
| **Nombre del Entregable:** | SOP del Flujo Venta–Stock–Despacho |
| **Fase / Componente del Proyecto:** | Fase 3: Configuración, Parametrización y Limpieza — Gobernanza |
| **Responsable de redacción:** | Analista de Calidad |
| **Revisión y aprobación:** | Gerencia General y Socio de Producción (EDT 1.3.11) |
| **Insumos:** | Flujo AS-IS (EDT 1.2.1, 1.2.5) y flujo TO-BE (EDT 1.2.6), piloto en base centralizada (Fase Cimentar) con migración posterior a Odoo (Fase Integrar) |
| **Fecha de Emisión:** | 17/10/2026 |

## 1. Propósito

Establecer el procedimiento estándar que el personal de Roma Bag's debe seguir para registrar una venta, descontar el stock correspondiente y confirmar el despacho de un pedido, reemplazando el registro fragmentado actual (WhatsApp, cuaderno físico y Excel) por un flujo único y secuencial.

## 2. Alcance

Aplica a toda venta minorista o mayorista que implique salida de producto terminado del taller principal o del taller alterno. No aplica a movimientos internos de insumos o materia prima (cubiertos por el control de inventario de producción).

## 3. Principio rector

**Un pedido no puede declararse despachado sin haber pasado, en orden, por los tres pasos: Venta → Stock → Despacho.** Ningún paso puede registrarse fuera de secuencia ni de forma retroactiva sin dejar evidencia de la corrección.

## 4. Roles y responsables

| Rol | Responsabilidad en el flujo |
| --- | --- |
| Personal de Ventas | Recibe el pedido, confirma disponibilidad y registra la venta en el punto de captura (celular). |
| Gerencia General | Supervisa el flujo, resuelve excepciones que el sistema no puede resolver solo y valida los cierres semanales. |
| Socio / Jefe de Producción | Recibe la orden de despacho, prepara el pedido físico y confirma el despacho. |
| Personal de Empaque | Ejecuta el empaque según la orden confirmada y reporta incidencias de producto antes del despacho. |

## 5. Flujo del procedimiento

### Paso 1 — Registro de la venta

1. El personal de Ventas recibe el pedido (WhatsApp, atención en vivo o presencial).
2. Antes de confirmar al cliente, consulta la disponibilidad del modelo en el punto de captura del piloto (celular). No se confirma un pedido sin haber verificado stock en el sistema.
3. Si hay disponibilidad, registra la venta con: modelo, color, cantidad, cliente y canal de origen.
4. El sistema reserva automáticamente el stock vendido; el pedido queda en estado **"Vendido – pendiente de despacho"**.

> Excepción: si no hay conectividad, el registro se hace en el formato de respaldo físico acordado y se transcribe al sistema al reconectar el mismo día, antes del cierre de turno.

### Paso 2 — Descuento y verificación de stock

1. El descuento de stock es automático al confirmar la venta (Paso 1); el personal no lo hace manualmente.
2. Producción/Empaque verifica que el stock reflejado en el sistema coincide con el stock físico antes de armar el pedido. Si hay una discrepancia, se detiene el flujo y se reporta a Gerencia antes de continuar (no se "ajusta a ojo").
3. Si el modelo no tiene stock suficiente, el pedido pasa a estado **"Pendiente de producción"** y se comunica al Socio de Producción qué fabricar, con prioridad según fecha de compromiso con el cliente.

### Paso 3 — Despacho

1. El Socio de Producción o Personal de Empaque prepara el pedido según la orden generada en el Paso 1.
2. Antes de despachar, se verifica que el pedido esté completo contra la orden (modelo, color, cantidad). Esta verificación es la que reduce los pedidos incompletos (línea base: 9 al mes).
3. Se confirma el despacho en el sistema. Solo en este momento el pedido cambia a estado **"Despachado"**.
4. Si el pedido requiere envío por motorizado, la confirmación de despacho incluye la validación de que es un solo envío por pedido (control del indicador de doble envío, línea base: 2 de cada 10 pedidos).

## 6. Manejo de excepciones

| Situación | Acción |
| --- | --- |
| Pedido incompleto detectado antes del despacho | Se detiene el despacho, se completa el pedido y se registra la causa (falta de stock, error de preparación). |
| Pedido incompleto detectado después del despacho | Se registra como incidente, se coordina reenvío y se evalúa el sobrecosto (S/19–24 de referencia). |
| Caída de conectividad durante el registro | Se usa el respaldo físico acordado; se transcribe al sistema el mismo día. |
| Discrepancia entre stock del sistema y stock físico | Se detiene el flujo, se informa a Gerencia y no se despacha hasta resolver la discrepancia. |
| Pedido del taller alterno | Se registra bajo el mismo flujo; sus existencias se consolidan según el acuerdo de integración vigente. |

## 7. Registros y evidencia

- Todo pedido debe quedar identificable en el sistema con sus tres estados (Vendido, Pendiente de producción si aplica, Despachado) y su fecha de cambio de estado.
- El cuadre semanal de Gerencia se hace contra estos registros, no contra el cuaderno físico ni el Excel paralelo.
- Durante el periodo de coexistencia, el Excel se mantiene como respaldo de consulta, pero el sistema es la fuente de verdad para efectos de conciliación.

## 8. Criterios de cumplimiento del SOP

- Cero pasos del flujo registrados fuera de secuencia (Venta → Stock → Despacho).
- Reducción progresiva de pedidos incompletos respecto de la línea base (9/mes).
- Reducción progresiva de dobles envíos respecto de la línea base (2 de cada 10 pedidos).
- El Socio de Producción valida que el flujo no interrumpe el ritmo de producción del taller.

## 9. Aprobación

| Rol | Nombre | Firma | Fecha |
| --- | --- | --- | --- |
| Gerencia General | Nathaly Milagros Rupay Vega | _________________ | 17/10/2026 |
| Líder del Proyecto | Maria Camargo Rojas | _________________ | 17/10/2026 |

## Fuentes

- Acta de Constitución del Proyecto.
- Diagnóstico AS-IS / TO-BE del flujo venta-stock-despacho, documentado en el proceso de Gestión de la Ejecución del Proyecto.
- Primera versión del blog del proyecto: Customer Journey del flujo actual y prototipo navegable del flujo Venta–Stock–Despacho diseñado.
