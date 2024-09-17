const palavras = [
    "abacaxi", "anel", "amigo", "ave", "abacate",
    "bola", "bala", "banho", "bau", "banco",
    "casa", "cachorro", "carro", "cafe", "cama",
    "dado", "dedo", "doce", "dia", "dente",
    "elefante", "estrela", "escola", "elo", "escada",
    "faca", "festa", "fogo", "foca", "fada",
    "gato", "galo", "gelo", "goma", "ganso",
    "helicoptero", "hipopotamo", "hotel", "harpa", "horta",
    "ilha", "iglu", "iris", "indio", "ima",
    "janela", "jarra", "jogo", "jumento", "joaninha",
    "ketchup", "kiwi", "karate", "koala", "kamikaze",
    "leao", "lago", "lua", "lima", "livro",
    "maca", "mala", "muro", "mapa", "mesa",
    "neve", "ninho", "navio", "nuvem", "nota",
    "olho", "ovo", "onda", "ouro", "orelha",
    "pato", "peixe", "pipoca", "pato", "perna",
    "quilo", "quadro", "queijo", "quina", "queda",
    "raio", "rosa", "rede", "rato", "roupa",
    "sol", "sapo", "seda", "sabao", "sapato",
    "tigre", "touro", "teto", "tela", "tesoura",
    "uva", "urso", "urna", "uniao", "umidade",
    "vaca", "verao", "vento", "vela", "vidro",
    "webcam", "whisky", "waffle", "walker", "wifi",
    "xale", "xadrez", "xerox", "xarope", "xampu",
    "yoga", "yakisoba", "yogurte", "yeti", "yuppie",
    "zebra", "zoologico", "zumbi", "zero", "zagueiro"
];

let palavra;
let letrasErradas = 0;
const MAX_ERROS = 6;

function iniciarJogo() {
    const palavraIndex = Math.floor(Math.random() * palavras.length);
    palavra = palavras[palavraIndex];
    letrasErradas = 0;

    atualizarPalavra();
    criarBotõesAlfabeto();
    atualizarForca();
}

function atualizarPalavra() {
    const wordContainer = document.getElementById('wordContainer');
    wordContainer.innerHTML = '';
    for (let letter of palavra) {
        const span = document.createElement('span');
        span.textContent = '_';
        span.className = 'letter';
        span.dataset.letter = letter;
        wordContainer.appendChild(span);
    }
}

function criarBotõesAlfabeto() {
    const alphabetButtons = document.getElementById('alphabetButtons');
    alphabetButtons.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const button = document.createElement('button');
        button.textContent = String.fromCharCode(i);
        button.onclick = () => verificarLetra(button.textContent.toLowerCase());
        alphabetButtons.appendChild(button);
    }
}

function verificarLetra(letra) {
    let acertou = false;
    document.querySelectorAll('#wordContainer .letter').forEach(span => {
        if (span.dataset.letter === letra) {
            span.textContent = letra;
            acertou = true;
        }
    });

    if (!acertou) {
        letrasErradas++;
        atualizarForca();
    }

    if (letrasErradas >= MAX_ERROS) {
        alert('Você perdeu! A palavra era: ' + palavra);
        iniciarJogo();
    } else if (document.querySelectorAll('#wordContainer .letter').length === document.querySelectorAll('#wordContainer .letter:not([data-letter])').length) {
        alert('Você ganhou!');
        iniciarJogo();
    }
}

function atualizarForca() {
    const hangmanContainer = document.getElementById('hangmanContainer');
    hangmanContainer.innerHTML = '';
    for (let i = 1; i <= MAX_ERROS; i++) {
        const div = document.createElement('div');
        div.className = 'hangmanPart';
        if (i <= letrasErradas) {
            div.classList.add('active');
        }
        hangmanContainer.appendChild(div);
    }
}

// Iniciar o jogo ao carregar a página
window.onload = iniciarJogo;
