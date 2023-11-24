window.onload = () => {
  const empty = document.getElementById("favorite-empty");
  const favoriteList = document.getElementById("favorite-list");

  let basket = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log('Basket:', basket);

    
  let calculation = () => {
  let favoriteQuantity = document.getElementById("favorite-quantity");
  favoriteQuantity.innerHTML = basket.map((product) => product.item).reduce((a, b) => a + b, 0);
  };
  calculation();

  let displayFavorites = () => {
    console.log(displayFavorites);
    if (basket.length !== 0 ) {
      return (favoriteList.innerHTML = basket.map((product) => {
        let {id, name} = product;
        let search = shopItemsData.find((item) => item.id === id) || [];
        return `
        <div class="favorite-item">
          <img src="${search.image}" alt="${search.name}" />
          <div class="favorite-item-info">
            <h3>${search.name}</h3>
            <p>${search.description}</p>
            <div class="favorite-item-price">
              <span>$${search.price}</span>
              <onclick = "removeFromFavorite(${id})" class="remove-favorite">
              <i class="fa-solid fa-trash"></i>
              </onclick>
            </div>
          </div>
        </div>
        `;
      }).join(""));
  } else {
      favoriteList.innerHTML = "";
      empty.innerHTML = `
      <h3>Your favorites is empty</h3>
      <p>Add some items to your favorites</p>
      <a href = "shop.html">
        <button class="shopButton"> Go to Shop</button>
      </a>
      `;
  }
  };
    displayFavorites();

    let removeFromFavorite = (id) => {
      let selectedItem = id;

      basket = basket.filter((item) => item.id !== selectedItem.id);
      displayFavorites();
      localStorage.setItem("favorites", JSON.stringify(basket));
      
    }

  // Inside your window.onload block or elsewhere in your script
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-favorite")) {
      const itemId = event.target.dataset.itemId; // Assuming you store item ID in a data attribute
      removeFromFavorite(itemId);
    }
  });
};