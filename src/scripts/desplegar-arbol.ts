// Abre o cierra todos los nodos desplegables de un árbol (EDT, RBS) a la vez
for (const boton of document.querySelectorAll<HTMLButtonElement>('[data-desplegar]')) {
  const nodos = boton.closest('.arbol')!.querySelectorAll('details');
  const actualizar = () => {
    boton.textContent = [...nodos].every((d) => d.open) ? 'Contraer todo' : 'Desplegar todo';
  };
  boton.addEventListener('click', () => {
    const abrir = ![...nodos].every((d) => d.open);
    nodos.forEach((d) => (d.open = abrir));
    actualizar();
  });
  nodos.forEach((d) => d.addEventListener('toggle', actualizar));
}
