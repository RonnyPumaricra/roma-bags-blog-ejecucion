# Manual de presentación · Entregables de la segunda revisión (Fase 1.3 Cimentar)

Resumen de los ocho entregables agregados al blog el 07/11/2026. Están publicados en [/proceso/1.4](/proceso/1.4), en el apartado «Documentos › Segunda revisión». Se presentan agrupados por paquete de trabajo del EDT.

| EDT | Entregable | Entrega | Responsable |
| --- | --- | --- | --- |
| 1.3.4 | Verificación de conectividad y respaldo 4G/5G | 20/10/2026 | Analista de Infraestructura |
| 1.3.10 | SOP del flujo Venta–Stock–Despacho | 19/10/2026 | Analista de Calidad |
| 1.3.11 | Acta de revisión y aprobación del SOP | 23/10/2026 | Líder del Proyecto |
| 1.3.13 | Acta de aprobación de la política de respaldo | 23/10/2026 | Líder del Proyecto |
| 1.3.14 | Criterios de limpieza de los Excel históricos | 22/10/2026 | Analista de Sistemas |
| 1.3.20 | Protocolo de coexistencia con Excel y corte a Odoo | 06/11/2026 | Líder del Proyecto |
| 1.3.8 | Modelo de datos del piloto y mapeo a Odoo | 21/10/2026 | Analista de Sistemas |
| 1.3.9 | Validación de compatibilidad del modelo con Odoo | 27/10/2026 | Analista de Sistemas |

## 1. Conectividad del taller (EDT-1.3.01)

### 1.3.4 · Verificación de conectividad y respaldo 4G/5G

[PDF](/documentos/1.4/verificacion-conectividad-respaldo-4g-5g.pdf) · Cierra la secuencia de conectividad (1.3.1 → 1.3.4).

- Las pruebas con dispositivos reales confirman que el repetidor Wi-Fi sigue operativo en todos los ambientes, incluido el Almacén, sin caídas ni degradación.
- Hay un respaldo funcional por datos móviles 4G/5G en las áreas críticas: los seis celulares de Ventas y los equipos de Gerencia operan sin Wi-Fi y sin configuración adicional.
- Si se corta la fibra, el personal puede seguir registrando ventas y consultando stock.
- **Para qué sirve:** elimina el riesgo de depender de un único punto de conexión durante el piloto.

## 2. Gobierno inicial y calidad de datos (EDT-1.3.02)

### 1.3.10 · SOP del flujo Venta–Stock–Despacho

[PDF](/documentos/1.4/sop-flujo-venta-stock-despacho.pdf)

- **Principio rector:** ningún pedido se declara despachado sin pasar, en orden, por Venta → Stock → Despacho.
- **Roles:** Ventas registra, Producción y Empaque verifican y despachan, y Gerencia supervisa y resuelve excepciones.
- **Tres estados del pedido:** *Vendido – pendiente de despacho*, *Pendiente de producción* y *Despachado*. El stock se descuenta automáticamente al confirmar la venta.
- **Excepciones definidas:** caída de conectividad (respaldo físico y transcripción el mismo día), discrepancia de stock (se detiene el flujo) y pedido incompleto.
- **Metas de cumplimiento:** cero pasos fuera de secuencia; menos pedidos incompletos (línea base: 9 al mes) y menos dobles envíos (línea base: 2 de cada 10).

### 1.3.11 · Acta de revisión y aprobación del SOP

[PDF](/documentos/1.4/acta-revision-aprobacion-sop.pdf) · Reunión presencial del 23/10/2026.

- Gerencia General aprueba el SOP sin condiciones; el Socio de Producción lo aprueba con un ajuste.
- **Observación resuelta:** quién corrige un error de captura. El error lo corrige quien lo registró, dentro del mismo turno; después del cierre de turno, la corrección la valida Gerencia.
- Cumple el requisito «SOP aprobado» del Gate 1.

### 1.3.13 · Acta de aprobación de la política de respaldo, retención y seguridad

[PDF](/documentos/1.4/acta-aprobacion-politica-respaldo-seguridad.pdf) · Reunión presencial del 23/10/2026.

- Se aprueban sus cuatro componentes: respaldo diario incremental, respaldo semanal completo, plazos de retención y acceso por roles (solo Gerencia y el responsable técnico).
- Gerencia pide que el respaldo sea visible y verificable por ella misma. Con eso se resuelve su temor a perder datos, surgido tras la pérdida del histórico de 2024.
- Gerencia y el Comité de Datos lo aprueban sin condiciones. Cumple el requisito «respaldo aprobado» del Gate 1.

### 1.3.14 · Criterios de limpieza, deduplicación y estandarización de los Excel históricos

[PDF](/documentos/1.4/criterios-limpieza-deduplicacion-estandarizacion-excel.pdf)

- **Situación base:** cinco Excel sin código único, cerca de 28 % de inconsistencia en catálogos, campos obligatorios vacíos y dos talleres sin consolidar.
- **Seis criterios:**
  - SKU único por modelo y color.
  - Deduplicación: mismo cliente, modelo, color y fecha se considera duplicado; se conserva el registro más completo.
  - Columnas homologadas.
  - Campos vacíos marcados como «dato no disponible».
  - Campo «taller de origen».
  - Fechas y cantidades normalizadas.
- **Secuencia:** estandarizar → deduplicar → asignar SKU → revisar vacíos → entregar el catálogo depurado al 1.3.15.
- **Ejecución:** los criterios ya se aplicaron y los datos están cargados en Odoo (925 pedidos y 171 productos con SKU). Los archivos, con los clientes anonimizados, se descargan en [/proceso/1.4/excel-historicos](/proceso/1.4/excel-historicos).

### 1.3.20 · Protocolo de coexistencia con Excel y corte a Odoo

[PDF](/documentos/1.4/protocolo-coexistencia-excel-corte-odoo.pdf)

- Convierte el acuerdo de Transición Segura en reglas: el piloto es la fuente oficial y el Excel queda solo como consulta.
- No hay doble digitación, Gerencia es la única que concilia diferencias y el histórico no se borra.
- **Criterios de corte a Odoo (deben cumplirse todos):**
  - Migración conciliada.
  - UAT aprobada sin defectos críticos.
  - Un responsable de la fuente oficial designado.
  - Plan de corte aprobado por Gerencia.
- **Al hacer el corte:** el piloto queda solo para consulta, el Excel se archiva y Odoo pasa a ser la única fuente oficial.
- Es requisito del Gate 1 (coexistencia documentada) y la base del plan de corte del Gate 2.

## 3. Piloto centralizado controlado (EDT-1.3.03)

### 1.3.8 · Modelo de datos del piloto y mapeo a Odoo

[PDF](/documentos/1.4/modelo-datos-piloto-mapeo-odoo.pdf)

- **Seis entidades:** Producto, Stock, Cliente, Pedido/Venta, Despacho y Taller, con sus campos y relaciones.
- **Reglas:**
  - SKU obligatorio.
  - El estado del pedido solo avanza en el orden Venta → Stock → Despacho.
  - El stock se descuenta solo desde la venta.
  - «Taller de origen» es obligatorio.
- **Mapeo a Odoo Community:** Producto y Stock → Inventario, Cliente → Contactos, Pedido → Ventas, Despacho → Entrega/Albarán, Taller → Almacén.
- Ninguna entidad queda sin un equivalente en Odoo, así que la migración no exige rediseñar el modelo.

### 1.3.9 · Validación de compatibilidad del modelo con Odoo

[PDF](/documentos/1.4/validacion-compatibilidad-modelo-odoo.pdf)

- Las seis entidades y las cinco reglas del modelo son compatibles con Odoo Community estándar, sin módulos de pago ni desarrollo a medida.
- Odoo ya impone de forma nativa la secuencia Venta → Stock → Despacho: no permite validar una entrega sin una orden de venta confirmada.
- **Único ajuste (de configuración):** activar el stock por ubicación y crear el taller alterno como un segundo almacén.
- El modelo queda confirmado como base para desplegar el piloto (1.3.16) y para configurar Odoo en la Fase Integrar.

## Aporte al Gate 1 (17/11/2026)

| Requisito de gobernanza | Cubierto por |
| --- | --- |
| SOP aprobado | 1.3.10 + 1.3.11 |
| Respaldo aprobado | 1.3.13 |
| Coexistencia documentada | 1.3.20 |

Además, el 1.3.4 deja el taller apto en conectividad y el 1.3.8 + 1.3.9 dejan el modelo de datos validado para el despliegue del piloto (1.3.16).
