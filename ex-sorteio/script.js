function sortearNumero() {

    const minimo = parseInt(document.getElementById('minimo').value);
    const maximo = parseInt(document.getElementById('maximo').value);
    
    if (isNaN(minimo) || isNaN(maximo)) {
        alert('Por favor, insira números válidos!');
        return;
    }

    if (minimo >= maximo) {
        alert('O número mínimo deve ser menor que o número máximo!');
        return;
    }

    const numeroSorteado = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;

    document.getElementById('resultado').textContent = `Número sorteado: ${numeroSorteado}`;
}  