# INFORME TÉCNICO DE ENTREGABLE: CRITERIOS DE LIMPIEZA, DEDUPLICACIÓN Y ESTANDARIZACIÓN DE EXCEL HISTÓRICOS

| DATOS GENERALES DEL PROYECTO Y DEL ENTREGABLE | REGISTRO OFICIAL |
| --- | --- |
| **Código EDT:** | 1.3.14 |
| **Organización / Cliente:** | ROMA BAG'S |
| **Nombre del Proyecto:** | Transformación Digital y Gobernanza de Datos ROMA BAG'S |
| **Fase / Componente del Proyecto:** | Fase 3: Configuración, Parametrización y Limpieza — Actividad: Limpiar, deduplicar y estandarizar Excel históricos |
| **Nombre del Entregable:** | Criterios de Limpieza, Deduplicación y Estandarización de los Excel Históricos |
| **Responsable:** | Analista de Sistemas |
| **Alcance del Documento:** | Define los criterios y reglas de limpieza, deduplicación y estandarización que rigen el tratamiento de los archivos Excel históricos del taller. |

## 1. Propósito

Establecer los criterios de limpieza, deduplicación y estandarización que rigen el tratamiento de los Excel históricos de Roma Bag's, de modo que la información de las distintas fuentes se trate bajo un único estándar consistente en todo el proyecto.

## 2. Situación base diagnosticada

El diagnóstico de fuentes Excel ya identificó las siguientes condiciones en los registros actuales de la empresa:

- Cinco archivos Excel independientes, sin código único de producto entre ellos.
- Aproximadamente 28 % de inconsistencia en catálogos y nombres de modelos.
- Campos obligatorios vacíos en varios registros (especialmente datos de cobro y cliente).
- Dos fuentes de producción distintas (taller principal y taller alterno) con registros separados y sin consolidar.

Estos hallazgos son la base objetiva sobre la que se definen los criterios de limpieza de este documento.

## 3. Criterios de limpieza

| Criterio | Regla a aplicar |
| --- | --- |
| Código único de producto | Todo registro debe quedar asociado a un SKU único, siguiendo la nomenclatura definida en el diccionario de datos. Los registros sin código se completan por coincidencia de modelo y color; si no es posible, se marcan para revisión manual con la Gerencia. |
| Deduplicación de registros | Se consideran duplicados los registros con mismo cliente, modelo, color y fecha. Ante un duplicado, se conserva el registro con mayor cantidad de campos completos y se descarta el otro, dejando constancia de la eliminación. |
| Estandarización de columnas | Las columnas de los cinco archivos se homologan a una sola estructura (modelo, color, cantidad, cliente, canal, fecha, cobro), según los nombres de campo ya definidos en el diccionario de datos. |
| Campos obligatorios vacíos | Los campos marcados como obligatorios (ej. cobro, cliente) no pueden quedar vacíos. Si el dato no puede recuperarse de otro registro relacionado, se marca explícitamente como "dato no disponible" en lugar de dejarse en blanco, para no confundir ausencia de dato con error de captura. |
| Consolidación de talleres | Los registros del taller principal y del taller alterno se integran bajo el mismo formato estandarizado, conservando el campo "taller de origen" para no perder la trazabilidad de cuál taller produjo cada unidad. |
| Formato de fechas y cantidades | Fechas en formato día/mes/año y cantidades como valores numéricos enteros, eliminando textos libres o celdas combinadas detectadas en el diagnóstico (ej. varios productos anotados en una sola celda). |

## 4. Secuencia de aplicación

1. Estandarización de columnas sobre cada archivo, de forma independiente.
2. Deduplicación dentro de cada archivo y luego entre los cinco archivos consolidados.
3. Asignación de código único (SKU) a los registros que no lo tengan.
4. Revisión de campos obligatorios vacíos y marcado de los casos no recuperables.
5. Entrega del catálogo depurado resultante al siguiente entregable de la secuencia.

## 5. Resultado y siguiente paso

Con estos criterios definidos, el catálogo depurado resultante de aplicarlos pasa al siguiente entregable de la secuencia: **Validar catálogo depurado con Data Owners**.

## Fuentes

- Diagnóstico de fuentes Excel, catálogos y calidad de datos.
- Diccionario de datos y reglas de calidad por campo.
- Modelo de datos del piloto y mapeo a Odoo.
