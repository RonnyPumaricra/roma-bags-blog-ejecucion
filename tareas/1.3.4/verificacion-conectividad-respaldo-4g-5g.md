# INFORME TÉCNICO DE ENTREGABLE: VERIFICACIÓN DE CONECTIVIDAD Y RESPALDO 4G/5G EN EL TALLER

| DATOS GENERALES DEL PROYECTO Y DEL ENTREGABLE | REGISTRO OFICIAL |
| --- | --- |
| **Código EDT:** | 1.3.4 |
| **Organización / Cliente:** | ROMA BAG'S |
| **Nombre del Proyecto:** | Transformación Digital y Gobernanza de Datos ROMA BAG'S |
| **Fase / Componente del Proyecto:** | Fase 3: Configuración, Parametrización y Limpieza — Actividad: Verificar conectividad y respaldo 4G/5G |
| **Nombre del Entregable:** | Informe Técnico de Verificación de Conectividad Wi-Fi y de Respaldo Móvil 4G/5G en el Taller |
| **Marco de Gestión Aplicado:** | Guía del PMBOK 8.ª Edición (Áreas de Enfoque: Ejecución y Monitoreo y Control / Dominios de Desempeño: Alcance, Recursos y Riesgos) |
| **Criterio de Validación Metodológica:** | Comprobación empírica en campo con dispositivos conectados (Sin uso de Juicio de Expertos) |
| **Herramienta de Apoyo:** | Pruebas de velocidad (speedtest) y conexión real con dispositivos móviles del personal |
| **Alcance del Documento:** | Verificación del estado operativo de la solución de red ya implementada y verificación de la disponibilidad de datos móviles (4G/5G) como respaldo de contingencia. No incluye nueva instalación de equipos. |
| **Fecha de Emisión:** | 20 de octubre de 2026 |
| **Equipo Ejecutor:** | Analista de Infraestructura |

## 1. Propósito y continuidad del entregable

Este entregable cierra la secuencia de actividades de conectividad del taller. Los tres entregables anteriores documentaron, en orden, el diagnóstico de la zona muerta de Wi-Fi en el Almacén, la selección de un Repetidor Wi-Fi como solución y su implementación física con cobertura verde total confirmada. El propósito de este documento es verificar que esa solución se mantiene operativa en el tiempo y, de forma complementaria, confirmar que existe un respaldo de conectividad por datos móviles (4G/5G) para los casos en que la red fija del taller falle o no esté disponible.

## 2. Verificación del estado de la solución de red implementada

Se repitieron las pruebas de conexión con dispositivos reales en los mismos ambientes evaluados en los entregables anteriores, confirmando que la cobertura se mantiene estable tras la puesta en marcha del Repetidor Wi-Fi.

| Ambiente | Estado verificado | Resultado |
| --- | --- | --- |
| Área principal del taller | Cobertura estable frente al Router principal | Operativo |
| Acceso inferior izquierdo y SS.HH. | Cobertura estable | Operativo |
| Tragaluz y Dormitorio | Cobertura reforzada por el Repetidor Wi-Fi | Operativo |
| Almacén (recinto principal y sub-divisiones) | Cobertura sostenida sin caídas, confirmando la solución del entregable anterior | Operativo |

**Conclusión de esta sección:** la zona muerta del Almacén se mantiene resuelta; no se detectaron nuevas caídas de señal ni degradación de la solución instalada.

## 3. Verificación del respaldo de conectividad por datos móviles (4G/5G)

Dado que el taller depende de una única conexión de fibra óptica y que el personal de Ventas y Gerencia opera principalmente desde el celular, se verificó la disponibilidad de una vía de conexión alterna mediante datos móviles, para los casos en que la red fija falle.

| Punto verificado | Resultado |
| --- | --- |
| Cobertura de datos móviles en el área principal del taller | Señal 4G/5G disponible y estable en los celulares del personal. |
| Cobertura de datos móviles en el Almacén | Señal 4G/5G disponible, suficiente para consulta de stock y registro de ventas en caso de corte de la red fija. |
| Capacidad de los celulares del personal para operar sin Wi-Fi | Los seis celulares de Ventas y los equipos de Gerencia pueden conectarse por datos móviles sin configuración adicional. |
| Continuidad del registro ante corte de la red fija | El personal puede seguir registrando ventas y consultando stock usando datos móviles mientras se restablece la red del taller. |

**Conclusión de esta sección:** el taller cuenta con una vía de respaldo funcional por datos móviles, independiente de la red fija y del Repetidor Wi-Fi, lo que reduce el riesgo de interrupción total de los procesos digitales del piloto.

## 4. Relevancia para el proyecto

La verificación conjunta de la red fija y del respaldo móvil cierra el riesgo de depender de un único punto de conexión para operar los módulos de inventario, ventas y despacho durante el piloto. Con este entregable, el taller queda confirmado como apto en conectividad —tanto en su red principal como en su respaldo— para sostener la operación digital planificada en la Fase Cimentar.

## 5. Conclusiones

- La solución de red implementada en el entregable anterior (Repetidor Wi-Fi) se mantiene operativa sin degradación, incluyendo el Almacén.
- Se confirma la existencia de un respaldo de conectividad por datos móviles (4G/5G), disponible en todas las áreas críticas del taller, incluido el Almacén.
- Queda cerrada la secuencia de actividades de conectividad del taller: diagnóstico de zona muerta, selección de solución, implementación y verificación con respaldo móvil.

## Fuentes

- Informe de diagnóstico de zonas muertas de Wi-Fi del taller.
- Informe de evaluación y selección de la solución de red.
- Informe de implementación y validación de la solución de red.
- Auditoría de infraestructura, conectividad y dispositivos del taller.
