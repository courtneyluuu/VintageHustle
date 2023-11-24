import productList from "./data.js";

window.onload = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const favorite = JSON.parse(localStorage.getItem("favorites"));

  const saProductList = document.getElementById("s-a-product-list");
  const cartQuantity = document.getElementById("cart-quantity");
  const favoriteQuantity = document.getElementById("favorite-quantity");

  let quantity = 0;
  cart?.forEach((product) => {
    quantity += product.quantity;
  });
  cartQuantity.innerHTML = quantity;

  let favQuantity = 0;
  favorite?.forEach((product) => {
    favQuantity += product.quantity;
  });
  favoriteQuantity.innerHTML = favQuantity;

  const productListHTML = productList
    .filter((item) => item.category.includes("s-a"))
    .map(
      (product) => `
      <a href="/order.html">
        <!-- Add a data attribute to store product ID -->
        <div class="order-box" data-product-id="${product.id}">
          <img src="${product.image}" />
          <h4>${product.name}</h4>
          ${product.is_deal
          ? `<p><span class="price">$${product.original_price}</span> <span class="discount-price">$${product.sale_price}</span></p>`
          : `<p><span class="original-price">$${product.original_price}</span></p>`
        }
          <p>Size: ${product.size}</p>
          <div class="cart-button-fav">
            <div id="add-to-cart-button" class="add-cart">
            <div id="add-to-favorite-button" class="add-favorite">
              <p>View Product</p>
            </div>
            </div>
          </div>
        </div>
      </a>`
    )
    .join("");

  saProductList.innerHTML = productListHTML;

  // Add click event listeners to the product elements
  const productElements = document.querySelectorAll(".order-box");
  productElements.forEach((productElement) => {
    productElement.addEventListener("click", () => {
      const productId = productElement.getAttribute("data-product-id"); // Get the product ID from the data attribute
      const product = productList.find((item) => item.id === +productId);
      localStorage.setItem("order-active-item", JSON.stringify(product));
    });
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
