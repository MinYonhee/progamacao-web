document.getElementById('searchButton').addEventListener('click', function() {
    const pokemonName = document.getElementById('pokemonInput').value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            return response.json();
        })
        .then(data => {
            const pokemonDiv = document.getElementById('pokemon');
            pokemonDiv.innerHTML = `
                <h2>${data.name}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Altura: ${data.height}</p>
                <p>Peso: ${data.weight}</p>
            `;
        })
        .catch(error => {
            const pokemonDiv = document.getElementById('pokemon');
            pokemonDiv.innerHTML = `<p>${error.message}</p>`;
            console.error('Erro:', error);
        });
});
