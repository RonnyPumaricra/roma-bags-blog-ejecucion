# INFORME TÉCNICO DE ENTREGABLE: VALIDACIÓN DE COMPATIBILIDAD DEL MODELO DE DATOS CON ODOO

| DATOS GENERALES DEL PROYECTO Y DEL ENTREGABLE | REGISTRO OFICIAL |
| --- | --- |
| **Código EDT:** | 1.3.9 |
| **Organización / Cliente:** | ROMA BAG'S |
| **Nombre del Proyecto:** | Transformación Digital y Gobernanza de Datos ROMA BAG'S |
| **Fase / Componente del Proyecto:** | Fase 3: Configuración, Parametrización y Limpieza — Actividad: Validar compatibilidad del modelo con Odoo |
| **Nombre del Entregable:** | Informe Técnico de Validación de Compatibilidad del Modelo de Datos del Piloto con Odoo Community |
| **Responsable:** | Analista de Sistemas |
| **Alcance del Documento:** | Verificación técnica de que las entidades, campos y reglas del modelo de datos del piloto son compatibles con la configuración estándar de Odoo Community. No incluye la instalación ni configuración real del sistema, las cuales corresponden a la Fase Integrar. |
| **Fecha de Emisión:** | 27 de octubre de 2026 |

## 1. Propósito

Tomando como base el modelo de datos del piloto y su mapeo conceptual a Odoo (EDT 1.3.8), este documento valida que cada entidad propuesta tiene un equivalente funcional real dentro de Odoo Community, sin necesidad de desarrollos a medida ni módulos adicionales de pago.

## 2. Validación por entidad

| Entidad del piloto | Módulo de Odoo | Validación de compatibilidad |
| --- | --- | --- |
| Producto | Inventario | Compatible. El modelo estándar de producto de Odoo admite código único (campo de referencia interna), variantes por color y clasificación por categoría, cubriendo la nomenclatura SKU definida en la gobernanza de datos. |
| Stock | Inventario | Compatible. Odoo gestiona el stock por ubicación de forma nativa, lo que permite representar el taller principal y el taller alterno como ubicaciones distintas sin necesidad de un campo adicional fuera del estándar. |
| Cliente | Contactos | Compatible. El modelo de contacto estándar admite distinguir entre cliente mayorista y minorista mediante etiquetas, sin requerir personalización. |
| Pedido / Venta | Ventas | Compatible. La orden de venta de Odoo admite múltiples líneas de producto, cliente, canal (a través de un campo de origen) y estado de confirmación, correspondiente al estado "Vendido" del modelo del piloto. |
| Despacho | Inventario | Compatible. La entrega (albarán) de Odoo se genera automáticamente al confirmar una orden de venta y no puede validarse sin una venta confirmada previa, lo que reproduce de forma nativa el principio rector del SOP (Venta → Stock → Despacho). |
| Taller | Inventario | Compatible. Cada taller se representa como un almacén (warehouse) independiente dentro de la misma compañía, permitiendo consolidar reportes sin perder la trazabilidad de origen. |

## 3. Validación de las reglas del modelo

| Regla definida en el modelo del piloto | Resultado de la validación en Odoo |
| --- | --- |
| Código único de producto (SKU) | Compatible de forma nativa; Odoo exige unicidad en el campo de referencia interna cuando se configura como obligatorio. |
| Secuencia obligatoria Venta → Stock → Despacho | Compatible de forma nativa; el flujo de entregas de Odoo bloquea la validación de una entrega sin una orden de venta confirmada asociada. |
| Descuento automático de stock | Compatible de forma nativa; el descuento ocurre al validar la entrega generada desde la orden de venta, sin configuración adicional. |
| Campo obligatorio "taller de origen" | Compatible mediante la asignación de almacén por documento, sin necesidad de un campo personalizado. |
| Consolidación de taller principal y alterno | Compatible; Odoo permite múltiples almacenes bajo una sola compañía y consolida sus movimientos en los mismos reportes de inventario. |

## 4. Observaciones de compatibilidad

- No se identifican entidades del modelo del piloto que requieran un módulo de pago o un desarrollo a medida para su representación en Odoo Community.
- El único ajuste necesario es de configuración, no de modelo: activar el control de existencias por ubicación y definir el taller alterno como un segundo almacén antes de la migración.
- Las reglas de calidad y gobernanza (nomenclatura SKU, campos obligatorios) deben configurarse como validaciones del formulario en Odoo durante la Fase Integrar, pero no exigen cambios al modelo de datos ya diseñado.

## 5. Resultado y siguiente paso

El modelo de datos del piloto queda validado como compatible con Odoo Community sin necesidad de rediseño. Con esta validación, el modelo queda confirmado como base estable para el despliegue de la base central del piloto y, posteriormente, para la configuración real de Odoo en la Fase Integrar.

## Fuentes

- Modelo de datos del piloto y mapeo a Odoo.
- SOP del Flujo Venta–Stock–Despacho.
- Diccionario de datos y reglas de calidad por campo.
