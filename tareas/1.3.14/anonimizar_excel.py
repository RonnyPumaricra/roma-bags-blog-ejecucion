"""Anonimiza a los clientes de los Excel históricos (EDT 1.3.14) antes de publicarlos en el blog.

Uso:
    python3 tareas/1.3.14/anonimizar_excel.py              # genera los .xlsx anonimizados
    python3 tareas/1.3.14/anonimizar_excel.py --verificar  # revisa que no quede ningún nombre

Lee los originales de ~/Downloads (o de --origen), escribe las copias en public/documentos/1.4/excel-historicos/ y
la tabla código → nombre en <origen>/mapa-clientes-anonimizados.csv, que nunca debe subirse al repositorio.

Solo usa la biblioteca estándar: edita el XML de cada .xlsx en el lugar, de modo que el formato del original se
conserva. El reemplazo se limita a la columna de cliente de cada archivo, porque hay nombres que también son de
vendedoras (p. ej. «Angie»).
"""

import argparse
import csv
import html
import re
import sys
import unicodedata
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

M = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'

RAIZ = Path(__file__).resolve().parents[2]
DESTINO = RAIZ / 'public/documentos/1.4/excel-historicos'

# origen → (publicado, columna de cliente, primera fila de datos, hojas sin clientes)
ARCHIVOS = {
    'CUADRE ROMA BAGS (1).xlsx': ('cuadre-roma-bags-original.xlsx', 'B', 3, {'MODELOS'}),
    '0_etiquetas.xlsx': ('0-etiquetas.xlsx', None, 0, set()),
    '1_clientes.xlsx': ('1-clientes.xlsx', 'A', 2, set()),
    '2_productos.xlsx': ('2-productos.xlsx', None, 0, set()),
    '3_pedidos.xlsx': ('3-pedidos.xlsx', 'A', 2, set()),
    'REVISAR_correcciones.xlsx': ('registro-correcciones.xlsx', 'B', 2, set()),
}

# Valores de la columna de cliente que no son personas: se dejan tal cual
NO_PERSONA = {'|'}


def normalizar(texto):
    sin_tildes = unicodedata.normalize('NFKD', texto).encode('ascii', 'ignore').decode()
    return ' '.join(sin_tildes.lower().split())


def texto_t(xml):
    """Texto de los <t> de un <si> o <is>, sin las guías fonéticas (<rPh>)"""
    xml = re.sub(r'<rPh\b.*?</rPh>', '', xml, flags=re.S)
    return ''.join(html.unescape(t) for t in re.findall(r'<t\b[^>]*>(.*?)</t>', xml, flags=re.S))


def hojas(z):
    """(nombre, ruta) de cada hoja, en el orden del libro"""
    libro = ET.fromstring(z.read('xl/workbook.xml'))
    rels = {r.get('Id'): r.get('Target') for r in ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))}
    for hoja in libro.find(M + 'sheets'):
        destino = rels[hoja.get(R + 'id')].lstrip('/')
        yield hoja.get('name'), destino if destino.startswith('xl/') else 'xl/' + destino


CELDA = re.compile(r'<c\b([^>]*?)(?:/>|>(.*?)</c>)', re.S)


def atributo(attrs, nombre):
    m = re.search(rf'\b{nombre}="([^"]*)"', attrs)
    return m and m.group(1)


def celdas(xml):
    """(match, columna, fila, tipo, contenido) de cada celda de una hoja"""
    for m in CELDA.finditer(xml):
        ref = atributo(m.group(1), 'r')
        col = re.match(r'[A-Z]+', ref).group()
        yield m, col, int(ref[len(col):]), atributo(m.group(1), 't'), m.group(2) or ''


def es_cliente(cfg, hoja, col, fila):
    _, col_cliente, desde, excluidas = cfg
    return col_cliente is not None and hoja not in excluidas and col == col_cliente and fila >= desde


def leer(ruta, cfg):
    """Valores de texto de un .xlsx: [(hoja, col, fila, texto, es_cliente)]"""
    z = zipfile.ZipFile(ruta)
    compartidas = []
    if 'xl/sharedStrings.xml' in z.namelist():
        compartidas = [texto_t(si) for si in re.findall(r'<si>(.*?)</si>', z.read('xl/sharedStrings.xml').decode(), re.S)]
    valores = []
    for hoja, parte in hojas(z):
        for _, col, fila, tipo, contenido in celdas(z.read(parte).decode()):
            if tipo == 's':
                texto = compartidas[int(re.search(r'<v>(\d+)</v>', contenido).group(1))]
            elif tipo == 'inlineStr':
                texto = texto_t(contenido)
            else:
                continue
            valores.append((hoja, col, fila, texto, es_cliente(cfg, hoja, col, fila)))
    return valores


def construir_mapa(origen):
    """Código CLI-0001… por cliente, en orden alfabético del padrón depurado (1_clientes)"""
    padron = sorted(
        {texto.strip() for *_, texto, cli in leer(origen / '1_clientes.xlsx', ARCHIVOS['1_clientes.xlsx']) if cli},
        key=normalizar,
    )
    mapa, nombres = {}, {}
    for nombre in padron:
        clave = normalizar(nombre)
        if clave and nombre not in NO_PERSONA and clave not in mapa:
            mapa[clave] = f'CLI-{len(mapa) + 1:04d}'
            nombres[mapa[clave]] = nombre
    # Clientes que solo aparecen en los demás archivos con otra escritura
    for archivo, cfg in ARCHIVOS.items():
        for *_, texto, cli in leer(origen / archivo, cfg):
            clave = normalizar(texto)
            if cli and clave and texto.strip() not in NO_PERSONA and clave not in mapa:
                mapa[clave] = f'CLI-{len(mapa) + 1:04d}'
                nombres[mapa[clave]] = texto.strip()
    return mapa, nombres


def codigo_para(mapa, texto):
    clave = normalizar(texto)
    return mapa.get(clave) if clave and texto.strip() not in NO_PERSONA else None


def anonimizar(origen_xlsx, destino_xlsx, cfg, mapa):
    z = zipfile.ZipFile(origen_xlsx)
    partes = {info.filename: z.read(info.filename) for info in z.infolist()}
    reemplazos = 0

    # Cadenas compartidas: se decide por índice, después de ver qué celdas usan cada una
    compartidas = []
    if 'xl/sharedStrings.xml' in partes:
        compartidas = re.findall(r'<si>.*?</si>', partes['xl/sharedStrings.xml'].decode(), re.S)
    uso = {}  # índice → {True: usada por celda de cliente, False: por otra celda}

    for hoja, parte in hojas(z):
        xml = partes[parte].decode()
        nuevo, ultimo = [], 0
        for m, col, fila, tipo, contenido in celdas(xml):
            cliente = es_cliente(cfg, hoja, col, fila)
            if tipo == 's':
                uso.setdefault(int(re.search(r'<v>(\d+)</v>', contenido).group(1)), set()).add(cliente)
            elif tipo == 'inlineStr' and cliente and (codigo := codigo_para(mapa, texto_t(contenido))):
                nuevo += [xml[ultimo:m.start(2)], f'<is><t>{codigo}</t></is>']
                ultimo = m.end(2)
                reemplazos += 1
        partes[parte] = (''.join(nuevo) + xml[ultimo:]).encode()

    if compartidas:
        for i, si in enumerate(compartidas):
            codigo = codigo_para(mapa, texto_t(si))
            if not codigo or True not in uso.get(i, ()):
                continue
            if False in uso[i]:
                sys.exit(f'{origen_xlsx.name}: la cadena «{texto_t(si)}» la usan celdas de cliente y de otras columnas')
            compartidas[i] = f'<si><t>{codigo}</t></si>'
            reemplazos += 1
        sst = partes['xl/sharedStrings.xml'].decode()
        inicio, fin = sst.index('<si>'), sst.rindex('</si>') + len('</si>')
        partes['xl/sharedStrings.xml'] = (sst[:inicio] + ''.join(compartidas) + sst[fin:]).encode()

    if 'docProps/core.xml' in partes:
        core = partes['docProps/core.xml'].decode()
        core = re.sub(r'<dc:creator>.*?</dc:creator>', '<dc:creator></dc:creator>', core, flags=re.S)
        core = re.sub(r'<cp:lastModifiedBy>.*?</cp:lastModifiedBy>', '<cp:lastModifiedBy></cp:lastModifiedBy>', core, flags=re.S)
        partes['docProps/core.xml'] = core.encode()

    with zipfile.ZipFile(destino_xlsx, 'w', zipfile.ZIP_DEFLATED) as salida:
        for info in z.infolist():
            salida.writestr(info.filename, partes[info.filename])
    return reemplazos


def conteos(ruta, cfg):
    """Registros por hoja: filas con algún dato a partir de la primera fila de datos"""
    filas = {}
    z = zipfile.ZipFile(ruta)
    desde = cfg[2] or 2
    for hoja, parte in hojas(z):
        if hoja in cfg[3]:
            continue
        con_datos = {fila for _, _, fila, _, contenido in celdas(z.read(parte).decode()) if fila >= desde and re.search(r'<[vt]\b[^>]*>[^<]', contenido)}
        filas[hoja] = len(con_datos)
    return filas


def verificar(origen, mapa, nombres):
    errores = 0
    for archivo, cfg in ARCHIVOS.items():
        publicado = DESTINO / cfg[0]
        xml_crudo = ''.join(html.unescape(zipfile.ZipFile(publicado).read(n).decode(errors='ignore')) for n in zipfile.ZipFile(publicado).namelist())
        crudo_norm = normalizar(xml_crudo)
        # 1) Ninguna celda de cliente conserva un nombre
        for hoja, col, fila, texto, cli in leer(publicado, cfg):
            if cli and codigo_para(mapa, texto):
                print(f'  ✗ {cfg[0]} {hoja}!{col}{fila}: «{texto}»')
                errores += 1
        # 2) Ningún nombre de dos o más palabras aparece en ninguna parte del archivo
        for nombre in nombres.values():
            if len(normalizar(nombre).split()) > 1 and re.search(rf'\b{re.escape(normalizar(nombre))}\b', crudo_norm):
                print(f'  ✗ {cfg[0]}: aparece «{nombre}»')
                errores += 1
        # 3) Mismo número de registros que el original
        antes, despues = conteos(origen / archivo, cfg), conteos(publicado, cfg)
        estado = '✓' if antes == despues else '✗'
        errores += antes != despues
        print(f'{estado} {cfg[0]}: {despues}')
    print('Sin nombres de clientes en los archivos publicados.' if not errores else f'{errores} problema(s).')
    return errores


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--origen', type=Path, default=Path.home() / 'Downloads')
    parser.add_argument('--verificar', action='store_true')
    args = parser.parse_args()

    mapa, nombres = construir_mapa(args.origen)
    if args.verificar:
        sys.exit(1 if verificar(args.origen, mapa, nombres) else 0)

    DESTINO.mkdir(parents=True, exist_ok=True)
    for archivo, cfg in ARCHIVOS.items():
        n = anonimizar(args.origen / archivo, DESTINO / cfg[0], cfg, mapa)
        print(f'{cfg[0]}: {n} reemplazo(s)')

    tabla = args.origen / 'mapa-clientes-anonimizados.csv'
    with tabla.open('w', newline='', encoding='utf-8') as f:
        escritor = csv.writer(f)
        escritor.writerow(['codigo', 'cliente'])
        escritor.writerows(sorted(nombres.items()))
    print(f'{len(nombres)} clientes; correspondencia en {tabla} (no subir al repositorio)')


if __name__ == '__main__':
    main()
