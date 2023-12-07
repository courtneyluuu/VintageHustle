// update favorite.css
// update other pages for the increments.

import productList from "/data.js";

window.onload = () => {

  const cart = JSON.parse(localStorage.getItem("cart"));
  const cartQuantity = document.getElementById("cart-quantity");
  let basket = JSON.parse(localStorage.getItem("favorites")) || [];

  const empty = document.getElementById("favorite-empty");
  const favoriteList = document.getElementById("favorite-list");
  const favoriteQuantity = document.getElementById("favorite-quantity");

  const notification = () => {
    const x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(() => {
      x.className = x.className.replace("show", "");
    }, 5000);
  };

  let quantity = 0;
  cart?.forEach((product) => {
    quantity += product.quantity;
  });
  cartQuantity.innerHTML = quantity;

  let calculation = () => {
    let favoriteQuantity = document.getElementById("favorite-quantity");
    favoriteQuantity.innerHTML = basket.map((x) => x.quantity).reduce((x, y) => x + y, 0);
  };
  calculation();

  let displayFavorites = () => {
    let totalPrice = 0;
    if (basket.length !== 0) {
      return (favoriteList.innerHTML = basket.map((product) => {
        console.log("Favorite: ", basket);
        let { category, description, id, image, is_deal, name, original_price, quantity, sale_price, size } = product;
        let search = productList.find((y) => y.id === id) || [];
        // Calculate total price for each item
        let totalPriceForItem = product.quantity * (search.is_deal ? search.sale_price : search.original_price);
        totalPrice += totalPriceForItem; // Accumulate total price for all items
        return `
        <div class="cart-items-container">
          <div class="cart-item-left">
            <!-- <input type="checkbox" /> -->
            <img class="cart-item-image" src=${search.image} alt="Dress" />
            <div class="cart-item-info">
              <div class="cart-item-info-top">
                <p>${search.name}</p>
                <span>${search.size === "M" ? "SIZE MEDIUM" : search.size === "S" ? "SIZE SMALL" : "SIZE LARGE"}</span>
              </div>
              <div class="cart-item-info-bottom">
                <div class="buttons">
                  <i onclick="decrement(${id})" class="decrement">-</i>
                  <div id=${id} class="quantity">${product.quantity}</div>
                  <i onclick="increment(${id})" class="increment">+</i>
                    <button class="add-to-cart" data-id=${id}>Add to Cart</button>
                </div>
              </div>
            </div>
      
          <div class="cart-item-right">
            <p>Price</p>
            <div>
              ${search.is_deal
            ? `<div class="price">
                      <p>$${search.original_price}</p>
                      <p>$${search.sale_price}</p>
                    </div>`
            : `<p>$${search.original_price}</p>`
          }
          <div class="total-price">
          <p>Total Price: ${totalPriceForItem}</p>
          </div>         
               </div>
            </div>
          </div>
            <div class="remove-favorite">
              <i onclick = "removeFromFavorite(${id})"> Remove </i>
            </div>
      </div>
      
        `;
      }).join(""));
    } else {
      favoriteList.innerHTML = "";
      empty.innerHTML = `
      <h3>Your favorite is empty</h3>
      <p>Add some items to your favorites</p>
      <a href = "shop.html">
        <button class="shopButton">Go to Shop</button>
      </a>
      `;
    }
  };
  displayFavorites();

  window.increment = (id) => {
    let selectedItem = id;
    let search = basket.find((item) => item.id === selectedItem);
    console.log("Search Result: ", search);

    if (search === undefined) {
      console.log("Item not found in basket, adding it");
      basket.push({
        id: selectedItem.id,
        quantity: 1,
      });
    } else {
      console.log("item found in basket, incrementing quantity");
      search.quantity += 1;
    }
    displayFavorites();
    update();
    let favQuantity = basket.reduce((total, product) => total + product.quantity, 0);
    favoriteQuantity.innerHTML = favQuantity;
    localStorage.setItem("favorites", JSON.stringify(basket));
  };

  window.decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);

    if (search === undefined) return;
    //else if (search.quantity === 0) return;
    else {
      search.quantity -= 1;
    }
    update();
    let favQuantity = basket.reduce((total, product) => total + product.quantity, 0);
    favoriteQuantity.innerHTML = favQuantity;
    //basket = basket.filter((x) => x.item !== 0);
    if(search.quantity === 0){
      removeFromFavorite(selectedItem);

    }
    displayFavorites();
    localStorage.setItem("favorites", JSON.stringify(basket));
  };

  let update = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search) {
      document.getElementById(id).innerHTML = search.quantity;
      // calculation();

      const favQuantity = basket.reduce((total, item) => total + item.quantity, 0);
      favoriteQuantity.innerHTML = favQuantity;
    }
  };

  window.removeFromFavorite = (id) => {
    let selectedItem = id;
    basket = basket.filter((product) => product.id !== id);
    let favQuantity = basket.reduce((total, product) => total + product.quantity, 0);
    favoriteQuantity.innerHTML = favQuantity;
    displayFavorites();
    localStorage.setItem("favorites", JSON.stringify(basket));
  }

  // Inside your window.onload block or elsewhere in your script
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-favorite")) {
      const item = event.target.dataset.id; // Assuming you store item ID in a data attribute
      removeFromFavorite(item);
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
      const id = parseInt(event.target.getAttribute("data-id")); 
      const currentCart = JSON.parse(localStorage.getItem("cart"));
      const isExistingInCart = currentCart.find((item) => item.id === id);
      
      if (isExistingInCart) {
    
        localStorage.setItem(
          "cart",
          JSON.stringify(
            currentCart.map((item) => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            })
          )
        );
      } else {
        const product = productList.find((item) => item.id === id);
        if(product){
          localStorage.setItem(
          "cart",
          JSON.stringify([...currentCart, { ...product, quantity: 1 }])
        );}
        else{
          console.log("product {$id} not found");
        }
      }

      notification();

      const newCart = JSON.parse(localStorage.getItem("cart"));
      const newQuantity = newCart.reduce((total, product) => total + product.quantity, 0);
      cartQuantity.innerHTML = newQuantity;
    }
  });

  const searchForm = document.getElementById("search-form");
  searchForm.onsubmit = (e) => {
    e.preventDefault();
    const searchKey = document.getElementById("search-key")?.value?.toLowerCase()?.trim();
    const result = productList?.filter((product) => {
      if (product?.name?.toLowerCase()?.includes(searchKey)) {
        return true;
      }
      return false;
    });
    localStorage.setItem("search-list", JSON.stringify(result));
    window.location.href = "/search.html";
  };

};