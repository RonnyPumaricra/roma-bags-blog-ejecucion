# **INFORME DE DIAGNÓSTICO TÉCNICO: MAPEO Y DETERMINACIÓN DE ZONAS MUERTAS DE COBERTURA WI-FI EN TALLER** 

|**DATOS**<br>**GENERALES**|**DEL**||
|---|---|---|
|**PROYECTO**<br>**Y**|**DEL**|**REGISTRO OFICIAL**|
|**ENTREGABLE**|||
|**Organización / Cliente:**||ROMA BAG'S|
|**Nombre del Proyecto:**||Transformación Digital y Gobernanza de Datos ROMA BAG'S|
|**Fase / Componente del Proyecto:**||Fase 3: Configuración, Parametrización y Limpieza —<br>Evaluación Diagnóstica de Infraestructura Base y Red Wi-Fi|
|**Nombre del Entregable:**||Informe Técnico de Diagnóstico: Mapeo y Determinación de<br>Zonas Muertas de Cobertura Wi-Fi en el Taller|
|**Marco de Gestión Aplicado:**||Guía del PMBOK 8.ª Edición (Áreas de Enfoque: Ejecución y<br>Monitoreo y Control / Dominios de Desempeño: Alcance,<br>Recursos y Riesgos)|
|**Criterio de Validación Metodológic**|**a:**|Toma de decisiones basada en evidencia empírica y simulación<br>digital|
|**Herramienta de Simulación y Apo**|**yo:**|Ubiquiti UniFi Design Center + Comprobación empírica en<br>campo con dispositivos conectados a la red|
|||Exclusivamente<br>levantamiento<br>espacial,<br>simulación<br>de|
|**Alcance del Documento:**||propagación y determinación de zonas muertas (No incluye<br>propuestas ni medidas de solución)|
|**Fecha de Emisión:**||5 de octubre de 2026|
|**Equipo Ejecutor:**||Equipo de Ingeniería de Sistemas (9.º Semestre)|



**1. PROPÓSITO, ALCANCE Y SECUENCIA METODOLÓGICA DEL DIAGNÓSTICO** 

## **1.1. Propósito del Entregable dentro del Proyecto** 

El presente documento constituye un entregable de carácter strictly diagnóstico dentro del proyecto Transformación Digital y Gobernanza de Datos ROMA BAG'S. Su objetivo es documentar de manera objetiva y verificable el estado actual de la cobertura inalámbrica (Wi-Fi) dentro de las instalaciones físicas del taller, identificando con precisión las áreas que presentan pérdida severa o nula de conectividad (zonas muertas). 

En cumplimiento con los lineamientos de la Guía del PMBOK 8.ª Edición (Dominios de Desempeño del Alcance y Gobernanza), este informe se limita única y exclusivamente al diagnóstico y mapeo del problema actual. No incorpora propuestas de rediseño, cotizaciones de hardware ni medidas de solución, sirviendo como línea base técnica para la toma de decisiones en etapas posteriores del proyecto. 

## **1.2. Secuencia Metodológica Ejecutada** 

Para garantizar la total objetividad de los resultados presentados al cliente y prescindir de apreciaciones subjetivas o Juicio de Expertos, el diagnóstico se desarrolló siguiendo una secuencia técnica rigurosa dividida en tres etapas consecutivas: 

- Etapa 1: Medición Física de los Espacios y Levantamiento del Plano del Taller: 

   - Se realizó la medición presencial de las dimensiones físicas de cada uno de los ambientes que conforman el taller (Área principal de trabajo, Servicios Higiénicos, Tragaluz, Dormitorio, Accesos y Almacén). 

   - Se identificaron y trazaron los elementos constructivos que afectan el paso de la señal: muros estructurales sólidos (representados mediante líneas gruesas continuas), puertas o vanos de paso (representados mediante líneas punteadas) y la posición exacta del Router actual. 

- Etapa 2: Modelado y Simulación de Propagación Wi-Fi en UniFi Design Center: 

   - Con las medidas reales obtenidas en el taller, se digitalizó el plano a escala dentro de la plataforma especializada UniFi Design Center. 

   - Se parametrizaron las barreras físicas (muros sobre las líneas gruesas del plano) y se posicionó el punto de emisión en la ubicación real del Router (modelado con el perfil de propagación U7 Long-Range sobre el muro lateral derecho), generando el mapa de calor (heatmap) de propagación y atenuación electromagnética. 

- Etapa 3: Comprobación Empírica con Dispositivos Conectados a la Red: 

   - Finalmente, se contrastó la simulación digital de UniFi Design Center mediante pruebas reales en sitio, desplazando dispositivos terminales conectados a la red Wi-Fi del taller por cada uno de los recintos. 

   - Esta verificación cruzada permitió confirmar en la práctica el comportamiento de la señal y validar la caída drástica de la conexión a internet al ingresar al área del Almacén. 

**2. ETAPA 1: MEDICIÓN FÍSICA DE ESPACIOS Y PLANO ESTRUCTURAL DEL TALLER** 

El primer paso del trabajo en el taller consistió en el dimensionamiento físico del inmueble y la elaboración del plano base de distribución arquitectónica. 

(Espacio reservado para insertar la Figura 1: Plano Arquitectónico de Distribución del Taller) 

## **2.1. Lectura Técnica del Plano y Simbología Constructiva** 

Para la correcta interpretación del levantamiento físico del taller, se establecieron las siguientes convenciones sobre los elementos medidos en planta: 

- Líneas Gruesas Continuas (Muros Sólidos): Representan las paredes perimetrales y divisiones internas de albañilería/concreto. Físicamente actúan como obstáculos de absorción y atenuación para las ondas de radiofrecuencia emitidas por el Router. 

- Líneas Punteadas (Puertas y Aberturas): Representan los vanos de ingreso y aberturas de iluminación/ventilación, específicamente: 

   - La puerta de acceso en el recinto inferior izquierdo (línea punteada vertical). 

   - La puerta de acceso al Almacén ubicada en el tramo derecho de su pared inferior. 

- Ubicación del Router (--> Router): Situado en el sector medio-inferior derecho del taller, adosado al muro perimetral derecho. 

## **2.2. Distribución de Ambientes Medidos en el Taller** 

|**Ambiente / Sector del Taller**|**Ubicación en el Plano**|**Características Constructivas Relevantes para la**<br>**Señal**|
|---|---|---|
|||Espacio amplio y despejado frente a la ubicación del|
|Área Principal del Taller|Sector central e inferior|Router, sin muros interiores que obstaculicen la línea<br>de vista directa.|
|||Delimitado por un muro horizontal superior y un|
|Acceso Inferior Izquierdo|Esquina inferior izquierda|muro vertical derecho con puerta (línea punteada).<br>Cercano al área principal.|
|Servicios Higiénicos (SS.HH.)|Sector medio izquierdo|Bloque cerrado adosado al muro izquierdo a media<br>altura de la planta.|
|||Compuesto por un muro grueso horizontal divisorio|
|Tragaluz y Muro Divisorio|Sector medio derecho|y un área rectangular superior delimitada por líneas<br>punteadas.|
|||Ambiente cerrado por muros gruesos continuos en el|
|Dormitorio|Cuadrante superior derecho|sector norte-derecho, colindante con el Tragaluz y el<br>Almacén.|
|||Ambiente ubicado en el extremo diagonalmente más<br>alejado del Router, completamente encerrado por|
|Almacén|Cuadrante superior izquierdo|muros gruesos continuos, con sub-divisiones internas<br>(superior e izquierda) y una única puerta de ingreso|
|||(línea punteada) en su esquina inferior derecha.|



## **3. ETAPA 2: SIMULACIÓN DE PROPAGACIÓN WI-FI MEDIANTE UNIFI DESIGN CENTER** 

Una vez levantadas las medidas físicas del taller, se cargó el plano arquitectónico en la herramienta UniFi Design Center, trazando los muros de atenuación sobre las líneas gruesas del plano y posicionando el emisor en el punto exacto del Router actual (identificado en la simulación con el perfil U7 Long-Range). 



<!-- Start of picture text -->
*<br><!-- End of picture text -->

El motor de simulación de UniFi Design Center calcula la pérdida de potencia de la señal inalámbrica a medida que se aleja del emisor y atraviesa los muros del plano, representándola mediante la siguiente escala de colores: 

|**Color en Simulación (UniFi Design**<br>**Center)**|**Nivel de Propagación Estimado**|**Condición Operativa de Red**|
|---|---|---|
|Verde Intenso / Verde Claro|Señal Fuerte a Buena (Alta cobertura)|Conectividad óptima, estable y continua<br>para cualquier dispositivo.|
|Amarillo / Naranja|Señal Moderada a Débil (Atenuación<br>severa)|Degradación progresiva por distancia y<br>cruce de muros; caída de velocidad.|
|Rojo / Rosado Pálido|Señal Crítica / Límite de desconexión|Borde extremo de radiación; alta pérdida<br>de paquetes e inestabilidad.|
|Blanco / Gris (Sin color de cobertura)|Ausencia de Señal Útil (Zona Muerta)|Bloqueo<br>por<br>múltiples<br>muros<br>y<br>distancia; pérdida total o caída drástica<br>de conexión.|



**3.1. Interpretación de la Escala Cromática del Mapa de Calor (Heatmap)** 

## **3.2. Análisis del Comportamiento Simulado en UniFi Design Center** 

Al analizar el mapa de calor generado por la herramienta sobre el plano del taller, se evidencia de forma gráfica el comportamiento físico de la señal: 

- 1. Concentración Óptima en el Salón Principal y Accesos (Zona Verde): El área central del taller, el pasillo hacia el acceso inferior izquierdo, el entorno de los SS.HH. y la franja del Tragaluz reciben radiación directa o con mínima obstrucción desde el Router, manteniéndose íntegramente en tonalidades verdes. 

- 2. Atenuación por Muros en el Sector Superior: A medida que las ondas se dirigen hacia la parte superior del plano, los muros gruesos horizontales amortiguan y frenan la propagación de la señal. 

- 3. Sombra de Cobertura y Degradación Crítica en el Almacén: Hacia el cuadrante superior izquierdo (Almacén), la señal sólo logra filtrarse débilmente en diagonal a través del vano de la puerta inferior (degradándose rápidamente de verde claro a amarillo/naranja en la entrada), mientras que los sectores internos, el fondo superior y la división izquierda del Almacén quedan completamente en blanco (sin mancha de cobertura) debido al bloqueo ejercido por los muros gruesos perimetrales e internos. 

## **4. ETAPA 3: COMPROBACIÓN CON DISPOSITIVOS CONECTADOS Y DETERMINACIÓN DE LA ZONA MUERTA** 

Para validar en el entorno real lo proyectado por la simulación de UniFi Design Center, se procedió a realizar el recorrido de comprobación física por todas las áreas del taller utilizando dispositivos reales conectados a la red Wi-Fi. 

## **4.1. Resultados de la Comprobación Empírica por Ambiente** 

|**Ambiente Evaluado en el**<br>**Taller**|**Resultado**<br>**en**<br>**Simulación**<br>**(UniFi Design Center)**|<br>**Comproba**<br>**Dispositivo**<br>**Red**|**ción**<br>**s Co**|**Real**<br>**con**<br>**nectados a la**|**Dictamen**<br>**Diagnóstico**|**Final**<br>**de**|
|---|---|---|---|---|---|---|
|Área Principal (Frente al<br>Router)|Cobertura Verde Intenso|Conexión<br>velocidad<br>navegación|estab<br>de<br>fluida|le,<br>máxima<br>respuesta<br>y<br>.|Sin Problema|(Operativo)|
|Acceso Inferior Izquierdo|Cobertura Verde|Dispositivo<br>conexión e|s<br>stable|mantienen<br>sin cortes.|Sin Problema|(Operativo)|



|**Ambiente Evaluado en el**<br>**Taller**|**Resultado**<br>**en**<br>**(UniFi Design C**|<br>**Simulación**<br>**enter)**|**Comprobaci**<br>**Dispositivos**<br>**Red**|**ón**<br>**Real**<br>**Conectados**|**con**<br>**a la**|**Dictamen**<br>**Diagnóstico**|**Final**|**de**|
|---|---|---|---|---|---|---|---|---|
|Servicios<br>Higiénicos<br>(SS.HH.) y Pasillo|Cobertura Verde||Conectividad<br>sostenida en<br>prueba.|<br>normal<br>los equipo|y<br>s de|Sin Problema|(Operativo|)|
|Zona de Tragaluz|Cobertura Verde|Claro|Tráfico de<br>continuo.|red establ|e y|Sin Problema|(Operativo|)|
|Dormitorio|Atenuación<br>superiores|en<br>bordes|En<br>la<br>com<br>dentro<br>del<br>dispositivos<br>interrupción o<br>actividades de|probación<br> <br>taller,<br>no present<br>perativa par<br>l proyecto.|real<br>los<br>aron<br>a las|<br>Sin Problema|Reportado||
|ALMACÉN<br>(Interior<br>y<br>Sub-divisiones)|Degradación<br>acceso y Zona<br>cobertura) en<br>divisiones|Naranja<br>en<br>Blanca (Sin<br>el interior y|Al ingresar<br>los dispositiv<br>comprueba u<br>INTERNET<br>DRÁSTICA,<br>capacidad de<br>datos dentro d|al Almacén<br>os conectado<br>na CAÍDA<br>M<br>perdiendo<br>transmisió<br>el recinto.|con<br>s, se<br>DE<br>UY<br> <br>la<br>n de|<br>ZONA<br>M<br>WI-FI<br>C<br>(CRÍTICA)|UERTA<br> <br>ONFIRMA|DE<br>DA|



## **4.2. Diagnóstico Técnico de la Caída Drástica en el Almacén** 

La convergencia entre la simulación de UniFi Design Center y las pruebas con dispositivos conectados demuestra que el único problema de conectividad de todo el taller radica exclusivamente dentro del Almacén, originado por tres causas físicas comprobadas: 

- Ubicación en el Extremo Diagonal Opuesto: El Almacén se encuentra en el punto más distante respecto a la posición actual del Router. 

- Apantallamiento por Muros Gruesos Continuos: La trayectoria entre el Router y el interior del Almacén exige atravesar múltiples muros gruesos sucesivos (el muro divisorio medio, el muro inferior del Almacén y las paredes de las divisiones internas del propio Almacén), los cuales absorben la potencia de la señal antes de que llegue al fondo del recinto. 

- Efecto de Filtración Parcial por la Puerta de Acceso: Como muestra el mapa de calor de UniFi Design Center, una fracción debilitada de señal (color amarillo/naranja) apenas logra ingresar de forma oblicua por la puerta (línea punteada) del Almacén, pero cae drásticamente apenas el usuario se desplaza hacia el centro, el fondo superior o los compartimentos internos del Almacén. 

**5. CONCLUSIONES DEL DIAGNÓSTICO E IMPACTO EN EL PROYECTO (PMBOK 8)** 

- Determinación Exacta de la Zona Muerta: Se concluye, mediante la secuencia de medición física de espacios, modelado de propagación en UniFi Design Center y comprobación en sitio con dispositivos conectados a la red, que el interior del ALMACÉN constituye la única zona muerta crítica de Wi-Fi del taller, registrando una caída drástica del servicio de internet. 

- Operatividad del Resto del Taller: Se descartan problemas de cobertura en el salón principal, zona del Router, acceso inferior, pasillo de SS.HH., Tragaluz y Dormitorio, donde la red opera de forma continua y estable. 

- Relevancia para el Proyecto ROMA BAG'S (Dominio de Riesgos y Alcance - PMBOK 8): Dado que el Almacén es el recinto físico donde se ejecutan las operaciones de control de stock y movimientos de inventario, la caída drástica de internet identificada representa una restricción física crítica que queda formalmente documentada y mapeada en este entregable como línea base diagnóstica para las siguientes actividades del proyecto. 

