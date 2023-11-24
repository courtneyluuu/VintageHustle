import productList from "./data.js";

window.onload = () => {
  const notification = () => {
    const x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(() => {
      x.className = x.className.replace("show", "");
    }, 5000);
  };
  const notificationForFavorite = () => {
    const y = document.getElementById("snackbar2");
    y.className = "show2";
    setTimeout(() => {
      y.className = y.className.replace("show2", "");
    }, 5000);
  };

  const cart = JSON.parse(localStorage.getItem("cart"));
  const product = JSON.parse(localStorage.getItem("order-active-item"));
  const favorite = JSON.parse(localStorage.getItem("favorites"));

  const cartQuantity = document.getElementById("cart-quantity");
  const orderProductImage = document.getElementById("order-product-image");
  const orderProductTitle = document.getElementById("order-product-title");
  const orderSize = document.getElementById("order-size");
  const description = document.getElementById("description");
  const price = document.getElementById("price");
  const addToCartButton = document.getElementById("add-to-cart-button");
  const favoriteQuantity = document.getElementById("favorite-quantity");
  const addToFavoriteButton = document.getElementById("add-to-favorite-button");

  let quantity = 0;
  cart?.forEach((product) => {
    quantity += product.quantity;
  });
  cartQuantity.innerHTML = quantity;

  let favQuantity = 0;
  favorite?.forEach((favoriteItem) => {
    favQuantity += favoriteItem.quantity;
  });
  favoriteQuantity.innerHTML = favQuantity;

  orderProductImage.src = product.image;
  orderProductTitle.innerHTML = product.name;
  orderSize.innerHTML = product.size === "M" ? "SIZE MEDIUM" : product.size === "S" ? "SIZE SMALL" : "SIZE LARGE";
  description.innerHTML = product.description;
  price.innerHTML = product.is_deal
    ? `
      <p>$${product.original_price}</p>
      <p>$${product.sale_price}</p>`
    : `<p class="original-price">$${product.original_price}</p>`;

  addToCartButton.addEventListener("click", () => {
    const currentCart = JSON.parse(localStorage.getItem("cart"));

    const isExistingInCart = currentCart?.find((item) => item.id === product.id);

    if (isExistingInCart) {
      localStorage.setItem(
        "cart",
        JSON.stringify(
          currentCart.map((item) => {
            if (item.id === product.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          })
        )
      );
    } else {
      localStorage.setItem("cart", JSON.stringify(currentCart ? [...currentCart, { ...product, quantity: 1 }] : [{ ...product, quantity: 1 }]));
    }
    
    notification();

    const newCart = JSON.parse(localStorage.getItem("cart"));
    let newQuantity = 0;
    newCart.forEach((product) => {
      newQuantity += product.quantity;
    });
    cartQuantity.innerHTML = newQuantity;
  });

  addToFavoriteButton.addEventListener("click", () => {

    const currentFav = JSON.parse(localStorage.getItem("favorites"));
    const isExistingInFavorite = currentFav?.find((item) => item.id === product.id);
    
    if (isExistingInFavorite) {
      localStorage.setItem(
        "favorites",
        JSON.stringify(
          currentFav.map((item) => {
            if (item.id === product.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          })
        )
      );
    } else {
      localStorage.setItem("favorites", JSON.stringify(currentFav ? [...currentFav, { ...product, quantity: 1 }] : [{ ...product, quantity: 1 }]));
    }

    notificationForFavorite();

    const newFav = JSON.parse(localStorage.getItem("favorites"));
    let newFavQuantity = 0;
    newFav.forEach((product) => {
      newFavQuantity += product.quantity;
    });
    favoriteQuantity.innerHTML = newFavQuantity;
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


