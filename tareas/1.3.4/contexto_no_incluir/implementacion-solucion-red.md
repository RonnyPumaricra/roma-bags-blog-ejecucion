# **INFORME TÉCNICO DE ENTREGABLE: IMPLEMENTACIÓN Y VALIDACIÓN DE LA SOLUCIÓN DE RED SELECCIONADA EN EL** 

# **TALLER** 

|**DATOS GENERALES DEL PROYECTO Y**<br>**DEL ENTREGABLE**|**REGISTRO OFICIAL**|
|---|---|
|Organización / Cliente:|ROMA BAG'S|
|Nombre del Proyecto:|Transformación Digital y Gobernanza de Datos ROMA<br>BAG'S|
|Fase / Componente del Proyecto:|Fase 3: Configuración, Parametrización y Limpieza —<br>Actividad: Implementar solución de red seleccionada|
|Nombre del Entregable:|Informe Técnico de Implementación, Pruebas y Validación<br>de la Solución de Red en el Taller|
|Marco de Gestión Aplicado:|Guía del PMBOK 8.ª Edición (Áreas de Enfoque: Ejecución<br>y Monitoreo y Control / Dominios de Desempeño: Alcance,<br>Recursos, Riesgos y Gobernanza)|
|Criterio de Validación Metodológica:|Comprobación empírica post-implementación y simulación<br>de verificación digital (Sin uso de Juicio de Expertos)|
|Herramienta de Simulación y Apoyo:|Ubiquiti UniFi Design Center + Pruebas reales en campo<br>con dispositivos conectados a la red extendida|
|Alcance del Documento:|Incorporación física del Repetidor Wi-Fi seleccionado,<br>simulación del nuevo mapa de cobertura y testeo operativo<br>de eliminación de la zona muerta en el Almacén|
|Fecha de Emisión:|17 de octubre de 2026|
|Equipo Ejecutor:|Equipo de Ingeniería de Sistemas (9.º Semestre)|



## **1. PROPÓSITO, ALCANCE Y CIERRE DE LA SECUENCIA DE INFRAESTRUCTURA WI-FI** 

## **1.1. Propósito del Entregable** 

Habiendo identificado la caída drástica de internet en el Almacén durante el primer entregable (Mapear zonas muertas de Wi-Fi del taller) y tras haber seleccionado de manera objetiva el uso de un Repetidor Wi-Fi en el segundo entregable (Evaluar y seleccionar solución de red), el propósito de este documento es dejar constancia formal de la incorporación física del equipo, la simulación de su impacto en UniFi Design Center y las pruebas reales de campo (testing) que confirman la solución definitiva del problema. 

## **1.2. Secuencia de Implementación y Verificación Ejecutada (Sin Juicio de Expertos)** 

En estricto apego a los principios de la Guía del PMBOK 8.ª Edición (Incorporar la calidad en los procesos y entregables mediante evidencia verificable y sin Juicio de Expertos), la implementación se llevó a cabo en tres pasos estructurados: 

- Paso 1: Incorporación y Posicionamiento Estratégico del Repetidor Wi-Fi: 

   - Se instaló y configuró el Repetidor Wi-Fi ubicándolo en el punto central de transición del taller (exactamente en el extremo izquierdo del muro divisorio horizontal intermedio, frente al pasillo que conduce directamente a la puerta punteada del Almacén). 

   - Esta ubicación permite recibir con máxima intensidad la señal proveniente del Router principal (AC Lite en el muro derecho) y proyectarla directamente hacia el cuadrante superior izquierdo (Almacén). 

- Paso 2: Modelado de Verificación en UniFi Design Center (Estado TO-BE): 

   - Se actualizó el plano digital en la herramienta UniFi Design Center incorporando el segundo nodo de emisión (AC Lite 2 en representación del Repetidor Wi-Fi instalado en el punto central del taller) junto al emisor original (AC Lite en la posición del Router). 

   - Se generó el nuevo mapa de calor (heatmap) comprobando visualmente que la totalidad del interior del Almacén y sus divisiones internas pasaron a estar cubiertas en color verde. 

- Paso 3: Testeo Operativo en Sitio con Dispositivos Conectados: 

   - Se realizaron pruebas reales de conectividad, velocidad y estabilidad dentro del Almacén empleando dispositivos móviles y portátiles conectados a la red, verificando la desaparición total de la zona muerta. 

## **2. DETALLE DE LA IMPLEMENTACIÓN FÍSICA EN EL TALLER** 

## **2.1. Ubicación Exacta de los Equipos en el Plano del Taller** 

La disposición final implementada en el taller consta de dos puntos de radiación sincronizados que cubren el 100% de la superficie operativa sin haber requerido perforación de muros gruesos ni obras civiles invasivas: 

|**Identi**|**ficador**|**Rol del Equipo en el**|**Ubicación**<br>**Física**|**Función Operativa**|
|---|---|---|---|---|
|**en Sim**|**ulación**|**Taller**|**en el Plano**||
|Nodo|1 (AC|Router Principal (Fuente|Muro<br>lateral|Provee el acceso principal a internet|
|Lite —|Router)|Base)|derecho,<br>sector<br>medio-inferior del<br>taller.|y cubre con señal verde directa todo<br>el salón principal, el acceso inferior<br>izquierdo y el sector sureste.|
|Nodo|2 (AC|Repetidor<br>Wi-Fi|Zona<br>central del|Capta la señal óptima del Router|
|Lite|2<br>—|Incorporado<br>(Solución|taller,<br>junto<br>al|principal y la regenera con alta|
|Repeti|dor|Implementada)|extremo izquierdo|potencia<br>hacia<br>el<br>Almacén, el|
|Wi-Fi)|||del muro divisorio<br>horizontal<br>intermedio (debajo<br>del Tragaluz y en<br>línea<br>diagonal|Dormitorio, el Tragaluz y los SS.HH.|
||||directa<br>hacia<br>la||



|**Identificador**|**Rol**|**del Equipo**|**en el**<br>**Ubicación**|**Física**|**Función Operativa**|
|---|---|---|---|---|---|
|**en Simulación**|**Talle**|**r**|**en el Plano**|||
||||puerta<br>Almacén).|del||



## **2.2. Ventajas Físicas del Punto de Instalación Elegido** 

Al situar el Repetidor Wi-Fi (AC Lite 2) en el vértice central del taller: 

- Línea de Vista Limpia hacia el Router: No existe ningún muro grueso interpuesto entre el Router principal (AC Lite) y el Repetidor (AC Lite 2), garantizando que el enlace inalámbrico entre ambos equipos opere al máximo rendimiento. 

- Ángulo Directo hacia la Puerta del Almacén: El Repetidor queda posicionado frente al corredor superior izquierdo, inyectando la señal directamente a través de la puerta del Almacén (línea punteada) y superando la atenuación de los muros gruesos de las sub-divisiones internas. 

**3. SIMULACIÓN DE COBERTURA POST-IMPLEMENTACIÓN EN UNIFI DESIGN CENTER** 

A continuación, se presenta el mapa de calor actualizado en UniFi Design Center tras incorporar el Repetidor Wi-Fi (AC Lite 2) en conjunto con el Router principal (AC Lite) 



## **3.1. Análisis del Nuevo Mapa de Calor (Heatmap Post-Implementación)** 

La simulación digital en UniFi Design Center demuestra el cambio radical en la propagación electromagnética dentro del taller: 

- Eliminación Total de la Zona en Blanco dentro del Almacén: 

   - Mientras que en el diagnóstico inicial el interior del Almacén y sus divisiones (superior e izquierda) aparecían en color naranja/blanco (sin cobertura), en el nuevo mapa de calor todo el cuadrante del Almacén se muestra completamente cubierto en color VERDE. 

   - La radiación emitida por el Repetidor (AC Lite 2) penetra con holgura todo el recinto del Almacén, incluyendo la franja divisoria izquierda y la franja superior, manteniendo niveles óptimos hasta los muros perimetrales exteriores. 

- Refuerzo Integral en el Sector Superior del Taller: 

   - Además de solucionar el problema crítico del Almacén, la presencia del segundo punto de emisión (AC Lite 2) consolida una cobertura verde uniforme 

sobre la totalidad del Dormitorio, el Tragaluz y los Servicios Higiénicos (SS.HH.). 

## **4. PRUEBAS DE CAMPO (TESTING) Y COMPARATIVA ANTES VS. DESPUÉS** 

Concluida la instalación y el modelado en UniFi Design Center, se procedió al testeo empírico recorriendo nuevamente todos los sectores del taller con dispositivos conectados a la red. 

## **4.1. Matriz Comparativa de Resultados (Diagnóstico Inicial vs. Solución** 

## **Implementada)** 

|**Ambiente / Sector del**|**Estado Inicial**|**Estado**|**Resultado del Testeo**|**Estado Final del**|
|---|---|---|---|---|
|**Taller**|**(Entregable 1 -**<br>**Diagnóstico)**|**Post-Implementación**<br>**en UniFi Design**<br>**Center**|**Real con Dispositivos**<br>**Conectados**|**Problema**|
|Área Principal (Frente<br>al Router)|Verde (Operativo)|Verde Intenso (AC<br>Lite)|Conectividad óptima y<br>continua.|Operativo|
|Acceso Inferior<br>Izquierdo|Verde (Operativo)|Verde (AC Lite)|Navegación y<br>transferencia sin<br>cortes.|Operativo|
|Servicios Higiénicos<br>(SS.HH.)|Verde (Operativo)|Verde Intenso<br>(Reforzado por AC<br>Lite 2)|Señal al 100% de<br>intensidad.|Operativo|
|Tragaluz y Pasillo<br>Central|Verde Claro<br>(Operativo)|Verde Intenso<br>(Adyacente a AC Lite<br>2)|Máxima velocidad y<br>estabilidad de enlace.|Operativo|
|Dormitorio|Atenuación en bordes<br>superiores|Verde Completo en<br>todo el recinto|Cobertura total en<br>todas las esquinas del<br>ambiente.|Operativo Mejorado|



|**Ambiente / Sector del**<br>**Taller**|**Estado Inicial**<br>**(Entregable 1 -**<br>**Diagnóstico)**|**Estado**<br>**Post-Implementación**<br>**en UniFi Design**<br>**Center**|**Resultado del Testeo**<br>**Real con Dispositivos**<br>**Conectados**|**Estado Final del**<br>**Problema**|
|---|---|---|---|---|
|ALMACÉN (Recinto|ZONA MUERTA|COBERTURA|Conexión estable,|PROBLEMA|
|Principal y|CRÍTICA (Caída|VERDE TOTAL EN|rápida y sin caídas en|SOLUCIONADO AL|
|Sub-divisiones|drástica de internet /|TODO EL INTERIOR|todo el interior del|100%|
|Internas)|Zonas en blanco)|Y DIVISIONES|Almacén. Transmisión<br>de datos continua<br>validada.||



## **4.2. Protocolo de Pruebas Ejecutado en el Almacén** 

Durante la sesión de testeo dentro del Almacén se comprobaron tres criterios operativos clave con dispositivos conectados a la red: 

- Prueba de Continuidad al Cruzar la Puerta y Muros Internos: El desplazamiento desde el salón principal hacia el fondo y las divisiones internas del Almacén mantuvo la sesión activa sin microcortes ni desconexiones. 

- Prueba de Estabilidad de Tráfico de Datos: Se verificó la carga fluida de interfaces web y sincronización de datos en tiempo real desde los puntos más alejados del Almacén (esquina superior izquierda), confirmando que la caída drástica de internet quedó completamente erradicada. 

- Prueba de Concurrencia: Varios dispositivos conectados de forma simultánea dentro del Almacén operaron con respuesta inmediata a través del Repetidor Wi-Fi. 

## **5. CONCLUSIONES Y CIERRE DEL PAQUETE DE TRABAJO (PMBOK 8)** 

- Solución Implementada y Validada: Se incorporó satisfactoriamente el Repetidor Wi-Fi (representado como AC Lite 2 en la posición central del plano), cumpliendo con la selección técnica aprobada en el segundo entregable sin realizar perforaciones de muros ni cableado invasivo. 

- Erradicación Comprobada de la Zona Muerta en el Almacén: Tanto la simulación post-implementación en UniFi Design Center (cobertura verde total en el cuadrante superior izquierdo) como el testeo en sitio con dispositivos conectados confirman que la caída drástica de internet en el Almacén ha sido solucionada en su totalidad. 

- Cierre del Hito de Infraestructura (Dominios de Alcance y Gobernanza - PMBOK 8): Con la validación empírica de este tercer entregable se da por completada con éxito la secuencia de tres actividades del proyecto (1. Mapear zonas muertas de Wi-Fi del taller, 2. Evaluar y seleccionar solución de red y 3. Implementar solución de red seleccionada), dejando las instalaciones de ROMA BAG'S 100% habilitadas en conectividad para la operación de sus procesos digitales de inventario y despacho. 

