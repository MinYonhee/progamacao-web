const palavras = [
    "abacaxi", "anel", "amigo", "bola", "carro", "dado", "elefante",
    "fogo", "gato", "hotel", "ilha", "janela", "kiwi", "lua", "mala",
    "neve", "olho", "pato", "quadro", "raio", "sol", "tigre", "uva",
    "vaca", "webcam", "xale", "yogurte", "zebra", "verão", "tigre", "vela",  
    "sol", "sapo", "seda", "sabao", "sapato", "raio", "rosa", "rede", "rato", "roupa",
    "pato", "peixe", "pipoca", "pato", "perna",  "pato", "peixe", "pipoca", "pato", "perna",
    "leao", "lago", "lua", "lima", "livro",  "gato", "galo", "gelo", "goma", "ganso",
];

let palavraSecreta = '';
let letrasAdivinhadas = [];
let tentativas = 0;
const maxTentativas = 6;

function iniciarJogo() {
    palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
    letrasAdivinhadas = Array(palavraSecreta.length).fill('_');
    tentativas = 0;

    exibirPalavra();
    criarBotoesLetras();
    limparCanvas();
}

function exibirPalavra() {
    const palavraDiv = document.getElementById('palavra');
    palavraDiv.textContent = letrasAdivinhadas.join(' ');
}

function criarBotoesLetras() {
    const letrasDiv = document.getElementById('letras');
    letrasDiv.innerHTML = ''; 

    const alfabeto = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alfabeto.forEach(letra => {
        const botao = document.createElement('button');
        botao.textContent = letra;
        botao.onclick = () => verificarLetra(letra, botao);
        letrasDiv.appendChild(botao);
    });
}

function verificarLetra(letra, botao) {
    botao.disabled = true; 

    if (palavraSecreta.includes(letra)) {
        for (let i = 0; i < palavraSecreta.length; i++) {
            if (palavraSecreta[i] === letra) {
                letrasAdivinhadas[i] = letra;
            }
        }
        exibirPalavra();

        if (!letrasAdivinhadas.includes('_')) {
            alert('Parabéns, você venceu!');
            iniciarJogo();
        }
    } else {
        tentativas++;
        desenharBoneco(tentativas);

        if (tentativas === maxTentativas) {
            alert('Você perdeu! A palavra era: ' + palavraSecreta);
            iniciarJogo();
        }
    }
}

function desenharBoneco(tentativa) {
    const canvas = document.getElementById('forcaCanvas');
    const ctx = canvas.getContext('2d');

    switch (tentativa) {
        case 1: 
            ctx.beginPath();
            ctx.moveTo(10, 180);
            ctx.lineTo(100, 180);
            ctx.moveTo(50, 180);
            ctx.lineTo(50, 30);
            ctx.lineTo(150, 30);
            ctx.lineTo(150, 50);
            ctx.stroke();
            break;
        case 2: 
            ctx.beginPath();
            ctx.arc(150, 70, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 3: 
            ctx.beginPath();
            ctx.moveTo(150, 90);
            ctx.lineTo(150, 140);
            ctx.stroke();
            break;
        case 4: 
            ctx.beginPath();
            ctx.moveTo(150, 100);
            ctx.lineTo(130, 120);
            ctx.stroke();
            break;
        case 5: 
            ctx.beginPath();
            ctx.moveTo(150, 100);
            ctx.lineTo(170, 120);
            ctx.stroke();
            break;
        case 6: 
            ctx.beginPath();
            ctx.moveTo(150, 140);
            ctx.lineTo(130, 170);
            ctx.moveTo(150, 140);
            ctx.lineTo(170, 170);
            ctx.stroke();
            break;
    }
}

function limparCanvas() {
    const canvas = document.getElementById('forcaCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
}


window.onload = iniciarJogo;