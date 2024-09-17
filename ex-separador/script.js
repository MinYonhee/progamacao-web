function separarLetras() {
    const word = document.getElementById('wordInput').value;
    const container = document.getElementById('lettersContainer');
    container.innerHTML = ''; // Limpar o container

    for (let letter of word) {
        const letterDiv = document.createElement('div');
        letterDiv.className = 'letter';
        letterDiv.textContent = letter;
        container.appendChild(letterDiv);
    }
}
