# Cómo agregar un entregable al proyecto

Guía de trabajo para redactar y publicar los entregables del EDT (actividades de `src/data/edt.ts`) en este
repositorio. Resume las convenciones usadas hasta ahora para que cualquier entregable nuevo sea consistente con
los anteriores.

## 1. Dónde vive cada entregable

- El borrador de trabajo de cada actividad va en `tareas/<código EDT>/<nombre-slug>.md` (ej. `tareas/1.3.10/sop-flujo-venta-stock-despacho.md`).
- `tareas/` **no se incorpora a la página del blog** salvo que se indique explícitamente lo contrario. Es el
  espacio de borrador, separado de lo publicado en `src/pages` y `public/documentos`.
- Si el entregable depende de un insumo que aún no existe (por ejemplo, un Excel real que debe entregar la
  Gerencia), se documenta igual el protocolo o los criterios aplicables, pero **sin fabricar resultados o cifras
  que no estén evidenciadas**. El documento se redacta como si fuera completo en sí mismo (ver sección 4).

## 2. Formato del documento

- Encabezado como tabla `DATOS GENERALES DEL PROYECTO Y DEL ENTREGABLE | REGISTRO OFICIAL`, con una fila
  **`Código EDT:`** cuando la actividad tiene un código EDT. No agregar esa fila si no corresponde (por ejemplo,
  en documentos que no mapean a una sola actividad).
- Párrafos en una sola línea de texto (sin saltos de línea manuales a mitad de oración). Los saltos de línea
  sueltos dentro de un párrafo se renderizan mal y cortan el texto.
- Tablas para roles, pasos, criterios y fuentes; listas solo cuando el contenido es realmente una lista.
- Sección final **`## Fuentes`** (no "Fuentes de contexto"): cita los documentos del proyecto por su nombre
  (Acta de Constitución, SOP del flujo…, Diccionario de datos…), nunca por su ruta de archivo o carpeta — el
  público objetivo no conoce la estructura del repositorio.
- Nombres de personas: usar el nombre real cuando esté documentado en el proyecto (Gerencia General = Nathaly
  Milagros Rupay Vega; Líder del Proyecto = Maria Camargo Rojas, según `src/pages/acta-constitucion.md`). Si el
  rol no tiene nombre propio documentado (por ejemplo, el Socio de Producción), se deja solo el rol — no se
  inventa un nombre.
- Fechas: usar la fecha de entrega real de la actividad según `tareas/Act.md` o el cronograma, no la fecha en
  que se redacta la conversación.

## 3. Equipo actual

El equipo del proyecto en curso es: Pumaricra, Molina, Portalanza, Perez, Camargo. Otros nombres que aparezcan en
documentación histórica (anexos, actas previas) pueden corresponder a integrantes que ya no están en el curso;
no asumir que siguen activos salvo que el contexto lo confirme.

## 4. Si el entregable aún no tiene todos los insumos

Cuando una actividad depende de algo que no se puede ejecutar todavía (el ejemplo real: 1.3.14 necesita el
Excel histórico real de la empresa, que la Gerencia no ha entregado), el documento:

- Se redacta igual, completo, como el protocolo o los criterios que se van a aplicar.
- **No incluye frases que lo presenten como incompleto** ("este documento adelanta...", "pendiente de que se
  reciban los archivos...", "la ejecución real queda pendiente"). El documento en sí es el entregable completo;
  lo que está pendiente es la ejecución futura sobre datos reales, y eso se refleja en `Act.md`, no en el texto
  del documento.
- En `Act.md`, ese tipo de actividad se marca **"Pendiente"** (no "Sí" ni "No") en la columna `Listo`.

## 5. Después de redactar: marcar el estado

Actualizar la fila correspondiente en `tareas/Act.md`, columna `Listo`:

- **Sí**: el entregable está redactado y no depende de ningún insumo externo faltante.
- **Pendiente**: el entregable (protocolo/criterios) está redactado, pero su ejecución real depende de un
  insumo externo que todavía no llega.
- **No**: todavía no se ha trabajado.

## 6. Si el entregable debe incorporarse al blog (`/proceso/1.4`)

Esto solo se hace cuando el usuario lo pide explícitamente (por defecto, los documentos quedan solo en `tareas/`).

1. El usuario exporta el `.md` a PDF y lo coloca en `tareas/<código EDT>/`.
2. Copiar ese PDF a `public/documentos/1.4/<nombre-slug>.pdf` (kebab-case, sin tildes ni espacios).
3. En `src/pages/proceso/1.4.md`:
   - Agregar una fila a la tabla de resultados que corresponda **según el paquete EDT** de `src/data/edt.ts`
     (Conectividad del taller = EDT-1.3.01, Gobierno de datos = EDT-1.3.02, Piloto centralizado controlado =
     EDT-1.3.03), no por orden de llegada.
   - Agregar el enlace en la sección `## Documentos`, bajo el grupo que corresponda: **"Primer entregable"**
     (los documentos originales) o **"Segunda revisión"** (los agregados después), con el formato
     `EDT X.X.X · Nombre.pdf`.
4. Correr `pnpm build` para confirmar que el sitio compila sin errores antes de dar por cerrado el cambio.

## 7. Fuente de verdad para código, fechas y responsables

- Código y nombre de cada actividad: `src/data/edt.ts`.
- Fechas de entrega y estado de avance ya trabajado en esta conversación: `tareas/Act.md`.
- Responsable y costo estimado de cada actividad: `public/documentos/lineas-base/matriz-costos.csv`.
- Paquetes de trabajo (para decidir en qué sección de `/proceso/1.4` va cada actividad): `FASES_BASE` en
  `src/data/edt.ts`.
