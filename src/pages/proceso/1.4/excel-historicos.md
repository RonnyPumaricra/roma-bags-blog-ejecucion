---
layout: ../../../layouts/Documento.astro
title: Excel históricos depurados · EDT 1.3.14
fecha: 2026-11-07
---

Volver a [1.4 Gestionar la Ejecución del Proyecto](/proceso/1.4).

Archivos resultantes de aplicar los [criterios de limpieza, deduplicación y estandarización](/documentos/1.4/criterios-limpieza-deduplicacion-estandarizacion-excel.pdf) al Excel histórico de despachos de Roma Bag's (enero a mayo de 2026). Los archivos de importación son los que se cargaron en Odoo. Para proteger a los clientes, sus nombres se reemplazaron por un código (CLI-0001, CLI-0002…), que es el mismo para cada cliente en todos los archivos.

## Descargas

| Archivo | Contenido | Registros |
| --- | --- | ---: |
| [Excel histórico original](/documentos/1.4/excel-historicos/cuadre-roma-bags-original.xlsx) | Hojas de despachos ENERO a MAYO tal como las llevaba la empresa, más la hoja de modelos y vendedoras. | 1.201 filas |
| [0 · Etiquetas](/documentos/1.4/excel-historicos/0-etiquetas.xlsx) | Tipos de entrega y observaciones, como etiquetas de Odoo. | 7 |
| [1 · Clientes](/documentos/1.4/excel-historicos/1-clientes.xlsx) | Padrón de clientes para importar a Odoo. | 559 |
| [2 · Productos](/documentos/1.4/excel-historicos/2-productos.xlsx) | Catálogo de 20 modelos por color, cada uno con su SKU (`default_code`) y precio de venta. | 171 |
| [3 · Pedidos](/documentos/1.4/excel-historicos/3-pedidos.xlsx) | Pedidos de venta con sus líneas de producto, en el formato de importación de Odoo. | 925 pedidos · 1.201 líneas |
| [Registro de correcciones](/documentos/1.4/excel-historicos/registro-correcciones.xlsx) | Cada corrección hecha al original, con la hoja y la fila de origen. | 159 |

Los archivos 0 a 3 se importan en ese orden: los pedidos hacen referencia a las etiquetas, los clientes y los productos.

## Criterios aplicados

| Criterio | Dónde se ve |
| --- | --- |
| Código único de producto | `2 · Productos`: cada combinación de modelo y color tiene un SKU con la forma MODELO-COLOR (p. ej. `ANA-AZULMARINO`). |
| Estandarización de columnas | `3 · Pedidos`: las cinco hojas mensuales, que no tenían todas las mismas columnas, quedan en una sola estructura (cliente, fecha, vendedora, entrega, producto, cantidad y precio). |
| Formato de fechas y cantidades | `3 · Pedidos`: fechas en un único formato y cantidades numéricas; las fechas mal escritas y las cantidades con texto quedan anotadas en el registro de correcciones. |
| Campos obligatorios vacíos | `Registro de correcciones`: cantidades faltantes, entregas, fechas, clientes o vendedoras sin dato, con la decisión tomada en cada caso. |
| Constancia de los cambios | `Registro de correcciones`: cada cambio queda trazado a su hoja y fila de origen, incluidas las observaciones del original (cambio de color, costura defectuosa…), que además existen como etiquetas en `0 · Etiquetas`. |
