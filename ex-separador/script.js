function separarPalavra() {
    const word = document.getElementById('wordInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    if (word) {
        for (let i = 0; i < word.length; i++) {
            const span = document.createElement('div');
             span.textContent = word[i];
             span.classList.add('character');
              resultDiv.appendChild(span); 
}
        
} else {
    resultDiv.textContent = 'Digite uma palavra para separar.';
    }
}