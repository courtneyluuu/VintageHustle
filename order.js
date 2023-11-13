//CART
window.onload = () => {
  const notification = () => {
    const x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(() => {
      x.className = x.className.replace("show", "");
    }, 5000);
  };

  const cart = JSON.parse(localStorage.getItem("cart"));
  const product = JSON.parse(localStorage.getItem("order-active-item"));

  const cartQuantity = document.getElementById("cart-quantity");
  const orderProductImage = document.getElementById("order-product-image");
  const orderProductTitle = document.getElementById("order-product-title");
  const orderSize = document.getElementById("order-size");
  const description = document.getElementById("description");
  const price = document.getElementById("price");
  const addToCartButton = document.getElementById("add-to-cart-button");

  let quantity = 0;
  cart?.forEach((product) => {
    quantity += product.quantity;
  });
  cartQuantity.innerHTML = quantity;

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
};

//FAVORITE

