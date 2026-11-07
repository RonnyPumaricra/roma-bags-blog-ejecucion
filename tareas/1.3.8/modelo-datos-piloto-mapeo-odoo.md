# INFORME TÉCNICO DE ENTREGABLE: DISEÑO DEL MODELO DE DATOS DEL PILOTO Y MAPEO A ODOO

| DATOS GENERALES DEL PROYECTO Y DEL ENTREGABLE | REGISTRO OFICIAL |
| --- | --- |
| **Código EDT:** | 1.3.8 |
| **Organización / Cliente:** | ROMA BAG'S |
| **Nombre del Proyecto:** | Transformación Digital y Gobernanza de Datos ROMA BAG'S |
| **Fase / Componente del Proyecto:** | Fase 3: Configuración, Parametrización y Limpieza — Actividad: Diseñar modelo de datos del piloto y mapeo a Odoo |
| **Nombre del Entregable:** | Modelo de Datos de la Base Centralizada del Piloto y su Mapeo a Odoo Community |
| **Responsable:** | Analista de Sistemas |
| **Alcance del Documento:** | Definición de las entidades de la base ligera del piloto y su correspondencia con los módulos de Odoo Community. No incluye la validación técnica de compatibilidad, la cual corresponde al siguiente entregable. |
| **Fecha de Emisión:** | 21 de octubre de 2026 |

## 1. Propósito

Diseñar el modelo de datos de la base centralizada ligera que operará durante el piloto (Fase Cimentar), y establecer desde ahora su correspondencia con los módulos de Odoo Community que la reemplazarán en la Fase Integrar. El objetivo es que el registro que hoy se hace en el piloto se traslade después a Odoo sin rediseñar la información desde cero.

## 2. Insumos considerados

- El flujo Venta–Stock–Despacho definido en el SOP del proceso, con sus tres estados de pedido (*Vendido –
  pendiente de despacho*, *Pendiente de producción*, *Despachado*).
- El diccionario de datos y las reglas de calidad por campo ya definidos para los dominios de información del
  proyecto.
- El diagnóstico de las fuentes Excel actuales, que identificó registros sin código único y campos obligatorios
  vacíos como principal fuente de inconsistencia.
- La existencia de dos fuentes de producción (taller principal y taller alterno) que deben consolidarse en un
  mismo modelo.

## 3. Entidades del modelo de datos del piloto

| Entidad | Descripción | Campos principales |
| --- | --- | --- |
| **Producto** | Representa cada modelo de cartera o producto terminado del catálogo. | Código (SKU), nombre del modelo, color, taller de origen. |
| **Stock** | Cantidad disponible de cada producto, por taller. | Producto, taller, cantidad disponible, fecha de última actualización. |
| **Cliente** | Persona o negocio que realiza el pedido. | Nombre, tipo (mayorista / minorista), canal de contacto habitual. |
| **Pedido / Venta** | Registro de la venta realizada. | Cliente, producto, cantidad, canal de origen, fecha, estado del pedido. |
| **Despacho** | Confirmación de salida del pedido hacia el cliente. | Pedido asociado, responsable de despacho, fecha, medio de envío (directo / motorizado). |
| **Taller** | Unidad de producción. | Nombre (principal / alterno), responsable. |

## 4. Reglas aplicadas al modelo

- Todo producto debe tener un código único (SKU), siguiendo la nomenclatura ya definida como regla de
  gobernanza para evitar la duplicidad detectada en las fuentes Excel actuales.
- El campo "estado del pedido" solo puede avanzar en el orden Venta → Stock → Despacho, replicando el principio
  rector del SOP del flujo; no se permite registrar un despacho sin una venta asociada.
- Todo descuento de stock se origina automáticamente desde el registro de la venta, nunca como un ajuste manual
  independiente.
- El campo "taller de origen" es obligatorio en Producto y en Stock, para poder consolidar la información del
  taller principal y del taller alterno sin perder su trazabilidad.
- Los campos marcados como obligatorios en el diccionario de datos no pueden quedar vacíos al registrar un
  pedido, a diferencia de lo observado en los registros Excel actuales.

## 5. Relaciones entre entidades

- Un **Taller** produce uno o varios **Productos**.
- Un **Producto** tiene un registro de **Stock** por cada **Taller** donde se fabrica o almacena.
- Un **Cliente** genera uno o varios **Pedidos**.
- Un **Pedido** está compuesto por uno o varios **Productos**, y descuenta su **Stock** correspondiente al
  confirmarse.
- Un **Pedido** se cierra con un **Despacho**, que no puede existir sin su Pedido asociado.

## 6. Mapeo del modelo del piloto a Odoo Community

| Entidad del piloto | Módulo de Odoo Community | Modelo equivalente |
| --- | --- | --- |
| Producto | Inventario | Producto |
| Stock | Inventario | Existencias por ubicación |
| Cliente | Contactos | Contacto |
| Pedido / Venta | Ventas | Orden de venta |
| Despacho | Inventario | Entrega / Albarán |
| Taller | Inventario | Almacén / Ubicación |

Este mapeo confirma que ninguna entidad del piloto queda sin un módulo equivalente en Odoo Community, lo cual habilita que la migración posterior (Fase Integrar) se apoye en datos ya organizados bajo esta misma lógica, en lugar de tener que rediseñar la estructura de información desde cero.

## 7. Resultado y siguiente paso

Este documento entrega el modelo de datos y su mapeo conceptual a Odoo. La verificación técnica de que estos campos y relaciones son efectivamente compatibles con la configuración real de Odoo Community corresponde al siguiente entregable de la secuencia: **Validar compatibilidad del modelo con Odoo**.

## Fuentes

- SOP del flujo Venta–Stock–Despacho del proyecto.
- Diccionario de datos y reglas de calidad por campo.
- Diagnóstico de fuentes Excel, catálogos y calidad de datos.
- Diagnóstico AS-IS / TO-BE del flujo operativo del taller.
