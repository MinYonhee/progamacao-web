function fetchCatImage() {
    fetch('https://api.thecatapi.com/v1/images/search', {
        headers: {
            'x-api-key': 'SUA_CHAVE_API_AQUI' // Substitua pela sua chave API
        }
    })
    .then(response => response.json())
    .then(data => {
        const catImageDiv = document.getElementById('catImage');
        catImageDiv.innerHTML = `<img src="${data[0].url}" alt="Gato" style="max-width: 300px;">`;
    })
    .catch(error => console.error('Erro:', error));
}

document.getElementById('newCatImage').addEventListener('click', fetchCatImage);
fetchCatImage(); // Carregar uma imagem ao iniciar a página
