# **INFORME TÉCNICO DE ENTREGABLE: EVALUACIÓN Y SELECCIÓN DE SOLUCIÓN DE RED PARA EL TALLER** 

|**DATOS GENERALES DEL PROYECTO Y**<br>**DEL ENTREGABLE**|<br>**REGISTRO OFICIAL**|
|---|---|
|**Organización / Cliente:**|ROMA BAG'S|
|**Nombre del Proyecto:**|Transformación Digital y Gobernanza de Datos ROMA<br>BAG'S|
|**Fase / Componente del Proyecto:**|Fase 3: Configuración, Parametrización y Limpieza —<br>Actividad: Evaluar y seleccionar solución de red|
|**Nombre del Entregable:**|Informe Técnico de Evaluación de Alternativas y Selección<br>de Solución de Red para el Taller|
||Guía del PMBOK 8.ª Edición (Áreas de Enfoque:|
|**Marco de Gestión Aplicado:**|Planificación y Ejecución / Dominios de Desempeño:<br>Alcance, Finanzas, Recursos y Riesgos)|
||Análisis multicriterio basado en datos empíricos de|
|**Criterio de Validación Metodológica:**|cobertura y simulación digital (Sin uso de Juicio de<br>Expertos)|
|**Herramienta de Simulación y Apoyo:**|Ubiquiti UniFi Design Center + Resultados del Diagnóstico<br>de Mapeo de Zonas Muertas|
||Exclusivamente evaluación comparativa de alternativas y|
|**Alcance del Documento:**|selección formal de la solución de red (No incluye ejecución<br>física ni implementación, las cuales corresponden al<br>siguiente entregable)|
|**Fecha de Emisión:**|9 de octubre de 2026|
|**Equipo Ejecutor:**|Equipo de Ingeniería de Sistemas (9.º Semestre)|



## **1. PROPÓSITO, ALCANCE Y CONTINUIDAD DEL ENTREGABLE** 

## **1.1. Propósito del Documento** 

Tomando como punto de partida obligatorio los resultados obtenidos en el primer entregable (Mapear zonas muertas de Wi-Fi del taller), este documento tiene como objetivo evaluar de forma objetiva las alternativas tecnológicas disponibles y seleccionar formalmente la solución de red más eficiente para eliminar la zona muerta detectada en el Almacén. 

## **1.2. Delimitación del Alcance (Separación entre Selección e Implementación)** 

En estricto cumplimiento de la estructura de desglose de actividades del proyecto y los lineamientos de la Guía del PMBOK 8.ª Edición (Dominio de Desempeño del Alcance): 

- Lo que incluye este entregable: Definición de requerimientos técnicos a partir del diagnóstico previo, análisis comparativo de alternativas tecnológicas, evaluación multicriterio (viabilidad física sobre el plano del taller, impacto constructivo, cobertura proyectada, costo y facilidad de despliegue) y selección formal del Repetidor Wi-Fi como solución definitiva. 

- Lo que NO incluye este entregable (Exclusión explícita): Este documento no contempla la instalación física, configuración de parámetros de red ni pruebas post-instalación, dado que dichas labores pertenecen exclusivamente al tercer y último entregable de la secuencia: "Implementar solución de red seleccionada". 

**2. ANTECEDENTES Y REQUERIMIENTOS TÉCNICOS DERIVADOS DEL DIAGNÓSTICO** 

## **2.1. Resumen del Problema Base Identificado en el Entregable Anterior** 

De acuerdo con el levantamiento físico de espacios, la simulación de propagación en UniFi Design Center y la comprobación empírica con dispositivos conectados a la red realizados en la etapa previa, el estado actual del taller presenta las siguientes condiciones comprobadas: 

- Cobertura Operativa en el Resto del Taller: El salón principal, la zona adyacente al Router (ubicado en el muro derecho medio-inferior), el recinto de acceso inferior izquierdo, los Servicios Higiénicos (SS.HH.), el área del Tragaluz y el Dormitorio 

cuentan con señal Wi-Fi estable y suficiente (zonas en color verde dentro del mapa de calor). 

- Zona Muerta Crítica Exclusiva en el Almacén: El interior del Almacén (ubicado en el cuadrante superior izquierdo, en el extremo diagonalmente opuesto al Router) sufre una caída de internet sumamente drástica. 

- Condición de Frontera en el Acceso al Almacén: El mapa de calor de UniFi Design Center demostró que la señal proveniente del Router principal llega con buena potencia (color verde) hasta el pasillo central/exterior inmediato a la puerta del Almacén (línea punteada inferior derecha), pero se degrada a naranja en el vano de la puerta y cae a blanco (sin cobertura) dentro del Almacén y sus sub-divisiones internas debido al apantallamiento de los muros gruesos continuos. 

## **2.2. Requerimientos Objetivos para la Selección de la Solución** 

Sin recurrir a Juicio de Expertos, los datos físicos y la simulación establecen cuatro requerimientos técnicos y operativos que debe satisfacer la alternativa seleccionada: 

|**ID Req.**|**Requerimiento del**<br>**Proyecto**|**Justificación Basada en Evidencia del Taller**|
|---|---|---|
|REQ-01|Focalización puntual en el<br>Almacén|Dado que el Almacén es el único ambiente con caída drástica<br>de internet, la solución debe concentrarse en cubrir dicho<br>recinto sin sobredimensionar ni alterar la red que ya funciona<br>bien en el resto del taller.|
|REQ-02|Aprovechamiento de la señal<br>existente en el pasillo previo|En la zona exterior inmediata a la puerta del Almacén existe<br>señal verde/estable proveniente del Router principal, lo que<br>permite captar y regenerar dicha onda hacia el interior del<br>recinto.|
|REQ-03|Cero intervención invasiva<br>en muros gruesos|El plano del taller presenta muros gruesos continuos entre la<br>zona del Router y el Almacén. Se requiere evitar obras civiles<br>de perforación de paredes, canaletas extensas o tendido de<br>cableado estructurado a través de todo el taller.|
|REQ-04|Eficiencia<br>en<br>costos<br>y<br>tiempos<br>(Dominio<br>de<br>Finanzas y Cronograma)|La solución debe ajustarse a la línea base de costos del<br>proyecto para una PYME como ROMA BAG'S, garantizando<br>disponibilidad inmediata para el uso de los módulos de<br>inventario y stock.|



**3. IDENTIFICACIÓN Y ANÁLISIS DE ALTERNATIVAS DE SOLUCIÓN DE RED** 

Para resolver la zona muerta del Almacén se evaluaron cuatro alternativas tecnológicas estándar de conectividad en interiores, contrastándolas directamente contra la geometría del plano del taller: 

## **Alternativa 1: Instalación de un Repetidor Wi-Fi (Extensor de Rango Inalámbrico)** 

- Descripción Técnica: Dispositivo inalámbrico compacto que se conecta directamente a una toma eléctrica en la zona intermedia/próxima al acceso del Almacén (donde aún llega la señal verde del Router principal), captando la red existente y retransmitiéndola con potencia renovada a través de la puerta (línea punteada) hacia todo el interior y las divisiones del Almacén. 

- Comportamiento frente al Plano del Taller: Aprovecha que el pasillo exterior al Almacén ya posee cobertura óptima según UniFi Design Center, actuando como puente directo hacia el interior del recinto sin necesidad de tender cables desde el muro inferior derecho donde está el Router. 

- Ventajas: Costo de adquisición muy bajo, cero perforación de muros gruesos, ausencia de cableado UTP cruzando el salón principal o el Tragaluz, y cobertura inmediata para el tamaño específico del Almacén. 



<!-- Start of picture text -->
»<br><!-- End of picture text -->

- Descripción Técnica: Mover el Router actual desde su posición en el muro derecho hacia el centro del taller. 

- Análisis Desfavorable: Requiere modificar la acometida del proveedor de internet (fibra/coaxial), compromete la cobertura óptima actual del sector inferior/acceso principal y, debido a los muros gruesos que encierran el Almacén, seguiría existiendo atenuación severa dentro de sus divisiones internas. 

## **Alternativa 3: Punto de Acceso (Access Point) Cableado mediante UTP** 

- Descripción Técnica: Instalar un Access Point adicional dentro del Almacén conectado mediante un cable de red UTP Cat 6 tirado desde el Router principal. 

- Análisis Desfavorable: Dado que el Router y el Almacén están en extremos diagonalmente opuestos del plano, exigiría tender decenas de metros de cableado, instalar canaletas superficiales por los muros perimetrales o el área del 

**Alternativa 2: Reubicación Física del Router Principal** 

Tragaluz/Dormitorio y perforar los muros gruesos continuos del Almacén, elevando innecesariamente el costo de materiales, mano de obra y tiempo. 

## **Alternativa 4: Sistema de Red Mallada (Wi-Fi Mesh de Múltiples Nodos)** 

- Descripción Técnica: Sustituir o complementar la red con un kit de 2 o 3 nodos Mesh distribuidos en toda la planta del taller. 

- Análisis Desfavorable: Representa un sobredimensionamiento técnico y financiero. Como demostró el diagnóstico en UniFi Design Center, más del 80% del taller ya tiene cobertura verde óptima con el Router actual; adquirir múltiples nodos Mesh para cubrir únicamente el recinto del Almacén encarece el presupuesto sin justificación. 

## **4. EVALUACIÓN MULTICRITERIO BASADA EN DATOS** 

Siguiendo la metodología de toma de decisiones objetiva del PMBOK 8.ª Edición, se evalúan las cuatro alternativas mediante una matriz cuantitativa ponderada (escala de 1 a 5, donde 1 es deficiente/desfavorable y 5 es óptimo/altamente favorable) basada estrictamente en los datos físicos del taller: 

|**Criterio de Evaluación**|**Peso (%)**|**Alt. 1:**<br>**Repetidor**<br>**Wi-Fi**|**Alt. 2:**<br>**Reubicar**<br>**Router**|**Alt. 3: AP con**<br>**Cableado**<br>**UTP**|<br>**Alt. 4: Sistema**<br>**Wi-Fi Mesh**|
|---|---|---|---|---|---|
|1. Eliminación de la zona muerta en||||||
|el Almacén (Capacidad de inyectar|30%|5|2|5|5|
|señal al recinto superior izquierdo)||||||
|2. No invasividad arquitectónica||||||
|(Evitar perforación de muros gruesos|25%|5|3|1|5|
|y tendido de cables por el taller)||||||
|3.<br>Eficiencia<br>económica<br>/||||||
|Costo-Beneficio (Alineación a la|25%|5|4|2|2|
|línea base de costos del proyecto)||||||



|**Criterio de Evaluación**|**Peso (%)**|**Alt. 1:**<br>**Repetidor**<br>**Wi-Fi**|**Alt. 2:**<br>**Reubicar**<br>**Router**|**Alt. 3: AP co**<br>**Cableado**<br>**UTP**|**n**<br>**Alt. 4: Sistema**<br>**Wi-Fi Mesh**|
|---|---|---|---|---|---|
|4.<br>Simplicidad<br>y<br>rapidez<br>de||||||
|despliegue (Tiempo requerido para|20%|5|2|2|4|
|dejar operativa la red en Fase 3)||||||
|PUNTAJE TOTAL PONDERADO<br>(Máx. 5.00)|<br>100%|5.00|2.75|2.65|4.05|



## **4.1. Interpretación de Resultados de la Matriz** 

- Superioridad Objetiva de la Alternativa 1 (Repetidor Wi-Fi — 5.00 pts): Obtiene la calificación máxima en todos los criterios al resolver el problema específico del Almacén sin obras físicas sobre los muros gruesos del taller y con la menor inversión económica. 

- Descarte de Alternativas Invasivas o Sobredimensionadas: La Alternativa 3 (AP Cableado, 2.65 pts) queda descartada por la complejidad física de atravesar el taller de extremo a extremo y perforar los muros gruesos del Almacén. La Alternativa 2 (Reubicar Router, 2.75 pts) no garantiza superar el bloqueo de los muros del Almacén y arriesga crear nuevas sombras de señal. La Alternativa 4 (Mesh, 4.05 pts) queda en segundo lugar por su alto costo frente a un problema localizado en un solo ambiente. 

**5. SELECCIÓN FORMAL DE LA SOLUCIÓN DE RED Y ALINEACIÓN A LOS DOMINIOS DEL PMBOK 8** 

## **5.1. Dictamen de Selección** 

Con base en la evidencia diagnóstica de UniFi Design Center, la geometría del plano del taller y la matriz de evaluación multicriterio, se selecciona formalmente la incorporación de un REPETIDOR WI-FI (Extensor de Rango Inalámbrico) como la solución técnica definitiva para subsanar la caída drástica de internet en el Almacén de ROMA BAG'S. 

- **5.2. Criterio Espacial de Ubicación Teórica (Puente hacia el Almacén)** 

De acuerdo con el mapa de calor obtenido en el diagnóstico previo, la selección del Repetidor Wi-Fi se fundamenta en el principio de regeneración en zona de frontera: 

- El dispositivo se proyecta para operar en el sector de transición cercano al ingreso del Almacén (puerta en línea punteada del borde inferior derecho del Almacén), donde el mapa de UniFi Design Center confirma la presencia de señal verde/amarilla estable procedente del Router principal. 

- Desde ese punto estratégico, el Repetidor Wi-Fi amplificará la cobertura directamente hacia el interior del Almacén y sus divisiones internas (superior e izquierda), eliminando la zona en blanco sin requerir cableado estructurado. 

## **5.3. Impacto en los Dominios de Desempeño del Proyecto (PMBOK 8)** 

- Dominio del Alcance (Scope): Se cumple el objetivo del segundo hito del paquete de red (Evaluar y seleccionar solución de red), cerrando la etapa de diseño y selección con una alternativa validada empíricamente. 

- Dominio de Finanzas (Finance): La elección del Repetidor Wi-Fi minimiza el impacto presupuestal dentro de la línea base de costos del proyecto, evitando gastos en bobinas de cable UTP, tuberías/canaletas, mano de obra de albañilería o sistemas multimodo costosos. 

- Dominio de Riesgos (Risk): Se mitiga de raíz el riesgo operativo de desconexión durante el registro de entradas, salidas y control de inventario en el Almacén, además de eliminar el riesgo de daños a la infraestructura del local al no perforar muros. 

## **6. CONCLUSIONES Y PASO AL SIGUIENTE ENTREGABLE** 

- Solución Seleccionada: La alternativa óptima para eliminar la zona muerta del Almacén en el taller de ROMA BAG'S es el uso de un Repetidor Wi-Fi, alcanzando un puntaje ponderado de 5.00 / 5.00 frente a otras opciones de red. 

- Justificación Técnica Comprobada: Dado que el único problema de conectividad del taller se concentra dentro del Almacén y que el pasillo exterior inmediato a su puerta ya cuenta con buena señal del Router principal (según UniFi Design Center), el 

Repetidor Wi-Fi resuelve la atenuación de los muros gruesos de forma directa, económica y sin cableado invasivo. 

- Habilitación del Siguiente Entregable: Con la aprobación de este informe de selección, queda formalmente habilitada la tercera y última actividad de la secuencia del proyecto: "Implementar solución de red seleccionada", la cual será documentada en su respectivo entregable de ejecución y pruebas finales. 

