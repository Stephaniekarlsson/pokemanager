const errorMessage = document.querySelector('#error-message');

async function getPokemons(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        errorMessage.textContent = 'Det gick inte att hämta datan. Försök igen om en stund!';
    }
}


export { getPokemons}