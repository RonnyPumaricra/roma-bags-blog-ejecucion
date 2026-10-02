// Las fechas del frontmatter (2026-09-14) se leen como medianoche UTC; se formatean en UTC para no correr el día
const formato = new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export const formatearFecha = (fecha: Date | string) => formato.format(new Date(fecha));
