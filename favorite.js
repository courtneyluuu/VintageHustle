// Get favorites array from localStorage
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Display favorites
const favoritesContainer = document.getElementById('favorites');

favorites.forEach(function(favorite) {
  const div = document.createElement('div');
  div.innerHTML = `
    <img src="${favorite.image}" width="100">
    <p>${favorite.name}</p>
  `;

  favoritesContainer.appendChild(div);
});