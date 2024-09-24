const publicKey = '5cf5d8450a1ba9d7a053ef65a7375143'; // Sua chave pública
const privateKey = '62a524fe3cc0a06f28dbf4d5b3cb2c3fafd5c98e'; // Sua chave privada
const ts = new Date().getTime(); // Timestamp para autenticação
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(); // Gera o hash MD5

function fetchCharacters() {
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const charactersDiv = document.getElementById('characters');
            charactersDiv.innerHTML = ''; // Limpa o conteúdo anterior
            data.data.results.forEach(character => {
                charactersDiv.innerHTML += `
                    <div>
                        <h3>${character.name}</h3>
                        <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}" />
                        <p>${character.description || 'Descrição não disponível.'}</p>
                    </div>`;
            });
        })
        .catch(error => console.error('Erro:', error));
}

document.getElementById('loadCharacters').addEventListener('click', fetchCharacters);
