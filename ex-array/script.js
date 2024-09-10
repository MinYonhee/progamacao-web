let vetor = [];

function adicionarValor() {
    let valor = parseFloat(document.getElementById('num').value);

    if (!isNaN(valor)) {
        vetor.push(valor);

        document.getElementById('valor').textContent = "Valores: " + vetor.join(', ');

        let soma = vetor.reduce((acc, val) => acc + val, 0);
        let media = soma / vetor.length;

        document.getElementById('media').textContent = "Média: " + media.toFixed(2);
    } else {
        alert('Por favor, insira um número válido.');
    }

    document.getElementById('num').value = '';
}

document.getElementById('btnAdd').addEventListener('click', adicionarValor);
