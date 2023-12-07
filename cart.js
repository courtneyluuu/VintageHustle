import productList from './data.js';

window.onload = () => {
  let cartList = JSON.parse(localStorage.getItem("cart"));
  const cartDiscount = localStorage.getItem("discount");
  const cartLocalStorage = JSON.parse(localStorage.getItem("cart"));
  const favorite = JSON.parse(localStorage.getItem("favorites"));

  const cartQuantity = document.getElementById("cart-quantity");
  const cart = document.getElementById("cart-list");
  const inputCode = document.getElementById("input-code");
  const applyCode = document.getElementById("apply-code");
  const base = document.getElementById("base");
  const tax = document.getElementById("tax");
  const discount = document.getElementById("discount");
  const total = document.getElementById("total");
  const checkoutContainer = document.getElementById("checkout-container");
  const shippingCost = document.getElementById("shipping-cost");
  const favoriteQuantity = document.getElementById("favorite-quantity");


  const notificationForFavorite = () => {
    const y = document.getElementById("snackbar2");
    y.className = "show2";
    setTimeout(() => {
      y.className = y.className.replace("show2", "");
    }, 5000);
  };

  let shipping = 5;

  if (!cartList?.length) {
    checkoutContainer.innerHTML =
      `<p style="font-size: 20px">Your cart is empty.</p>
      <a href = "shop.html">
        <button class="shopButton">Go to Shop</button>
      </a>`;

    shippingCost.innerHTML = `$0.00`;
    shipping = 0;
  }

  let quantity = 0;
  cartLocalStorage?.forEach((product) => {
    quantity += product.quantity;
  });
  cartQuantity.innerHTML = quantity;

  let favQuantity = 0;
  favorite?.forEach((product) => {
    favQuantity += product.quantity;
  });
  favoriteQuantity.innerHTML = favQuantity;

  let baseTotal = 0;
  cartList?.forEach((product) => {
    if (product.is_deal) {
      baseTotal += product.quantity * product.sale_price;
    } else {
      baseTotal += product.quantity * product.original_price;
    }
  });

  const finalBase = ((baseTotal * 100) / 100).toFixed(2);
  base.innerHTML = `$${finalBase}`;

  const finalTax = ((+finalBase * 0.09 * 100) / 100).toFixed(2);
  tax.innerHTML = `$${finalTax}`;

  let finalTotal = 0;
  let finalDiscount = 0;
  if (cartDiscount) {
    inputCode.value = cartDiscount; // bind sale10 to input

    finalDiscount = ((+finalBase * 0.1 * 100) / 100).toFixed(2);
    discount.innerHTML = `-$${finalDiscount}`;

    finalTotal = (((+finalBase + +finalTax + shipping - +finalDiscount) * 100) / 100).toFixed(2);
    total.innerHTML = `$${finalTotal}`;
  } else {
    finalTotal = (((+finalBase + +finalTax + shipping) * 100) / 100).toFixed(2);
    total.innerHTML = `$${finalTotal}`;
  }

  applyCode.addEventListener("click", () => {
    if (inputCode.value.toLowerCase() === "sale10") {
      localStorage.setItem("discount", "sale10");

      const finalDiscount = ((+finalBase * 0.1 * 100) / 100).toFixed(2);
      discount.innerHTML = `-$${finalDiscount}`;

      const finalTotalAfterDiscount = (((+finalTotal - +finalDiscount) * 100) / 100).toFixed(2);
      total.innerHTML = `$${finalTotalAfterDiscount}`;
    }
  });

  let displayCart = () => {
    if (cart.length !== 0) {
      return (cart.innerHTML = cartList.map((product) => {
        return `
        <div class="cart-items-container">
          <div class="cart-item-left">
            <!-- <input type="checkbox" /> -->
            <img class="cart-item-image" src=${product.image} alt="Dress" />
            <div class="cart-item-info">
              <div class="cart-item-info-top">
                <p>${product.name}</p>
                <span>${product.size === "M" ? "SIZE MEDIUM" : product.size === "S" ? "SIZE SMALL" : "SIZE LARGE"}</span>
              </div>
              <div class="cart-item-info-bottom">
                <!-- <p>Quantity: ${product.quantity}</p> -->
                <i onclick="decrement(${product.id})" class="decrement">-</i>
                <div id=${product.id} class="quantity">${product.quantity}</div>
                <i onclick="increment(${product.id})" class="increment">+</i><br>
                <button class="add-to-favorite" data-id=${product.id}>Save for later</button>
              </div>
            </div>
          </div>
          <div class="cart-item-right">
            <p>Total</p>
            <div>
              ${product.is_deal
            ? `<div class="price">
                      <p>$${product.original_price}</p>
                      <p>$${product.sale_price}</p>
                    </div>`
            : `<p>$${product.original_price}</p>`
          }
            </div>
          </div>
          <div class="cart-item-close-button" data-product-id="${product.id}">
            <g>
              <g direction="ltr" style="opacity: 1">
                <g transform="matrix(381,0,0,381,227458,93363)">
                  <g pointer-events="none">
                    <g id="editor-g2810f4cd338_0_15-paragraph-0">
                      <g>
                        <g class="sketchy-text-background" visibility="visible"></g>
                        <g>
                          <g></g>
                        </g>
                        <g class="sketchy-text-content" visibility="visible">
                          <g class="sketchy-text-content-text" transform="translate(0 17.919999999999998)"
                            ><text
                              style="font-family: docs-Avenir; font-size: 18.666666666666664px; fill: #666666; white-space: pre"
                              text-rendering="geometricPrecision"
                              x="7.788324311023622"
                              >✕</text
                            ></g
                          >
                        </g>
                      </g>
                    </g>
                  </g>
                  <rect
                    style="opacity: 0"
                    x="7.70493595575897"
                    y="-0.08290743257657596"
                    width="1.5406562054208275"
                    height="22.399999999999995"
                    fill="#666666"
                    transform=""
                    shape-rendering="crispEdges"
                    class=""
                  ></rect>
                  <rect style="opacity: 0"></rect>
                </g>
                <g>
                  <path
                    d="M 230425.3515625 93363 L 235848.6484375 93363 235848.6484375 101897.4 230425.3515625 101897.4 Z"
                    pointer-events="visiblePainted"
                    fill="#000000"
                    stroke="#000000"
                    opacity="0"
                  ></path>
                </g>
                <g transform="matrix(381,0,0,381,227458,93363)"></g>
              </g>
            </g>
          </div>
        </div>
      `;
      }).join(""));
    }
  };

  displayCart();
  window.increment = (id) => {
    let selectedItem = id;
    let search = cartList.find((item) => item.id === selectedItem);
    console.log("Search Result: ", search);

    if (search === undefined) {
      console.log("Item not found in basket, adding it");
      cartList.push({
        id: selectedItem.id,
        quantity: 1,
      });
    } else {
      console.log("item found in basket, incrementing quantity");
      search.quantity += 1;
    }
    displayCart();
    update();
    let quantity = cartList.reduce((total, product) => total + product.quantity, 0);
    cartQuantity.innerHTML = quantity;
    localStorage.setItem("cart", JSON.stringify(cartList));
  };

  window.decrement = (id) => {
    let selectedItem = id;
    let search = cartList.find((x) => x.id === selectedItem);

    if (search === undefined) return;
    else if (search.quantity === 0) return;
    else {
      search.quantity -= 1;
    }
    update();
    let quantity = cartList.reduce((total, product) => total + product.quantity, 0);
    cartQuantity.innerHTML = quantity;
    cartList = cartList.filter((x) => x.item !== 0);
    displayCart();
    localStorage.setItem("cart", JSON.stringify(cartList));
  };

  let update = (id) => {
    let search = cartList.find((x) => x.id === id);
    if (search) {
      document.getElementById(id).innerHTML = search.quantity;
      // calculation();

      const quantity = basket.reduce((total, item) => total + item.quantity, 0);
      cartQuantity.innerHTML = quantity;
    }
  };

  // Save for later button
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-favorite")) {
      const id = parseInt(event.target.getAttribute("data-id"));
      const currentFavorite = JSON.parse(localStorage.getItem("favorites"));
      const isExistingInFavorite = currentFavorite.find((item) => item.id === id);

      if (isExistingInFavorite) {

        localStorage.setItem(
          "favorites",
          JSON.stringify(
            currentFavorite.map((item) => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            })
          )
        );
      } else {
        const product = productList.find((item) => item.id === id);
        if (product) {
          localStorage.setItem(
            "favorites",
            JSON.stringify([...currentFavorite, { ...product, quantity: 1 }])
          );
        }
        else {
          console.log("product {$id} not found");
        }
      }

      notificationForFavorite();
      localStorage.setItem("cart", JSON.stringify(cartList.filter((item) => item.id !== +id)));

      window.location.reload();
      const newFavorite = JSON.parse(localStorage.getItem("favorites"));
      const newFavQuantity = newFavorite.reduce((total, product) => total + product.quantity, 0);
      favoriteQuantity.innerHTML = newFavQuantity;
    }
  });
  // cart proceed button
  const cartProceedButton = document.getElementById("cart-proceed-button");
  cartProceedButton.addEventListener("click", () => {
    localStorage.setItem(
      "checkout-money",
      JSON.stringify({
        finalBase,
        finalTax,
        finalTotal,
        finalDiscount,
        shipping,
      })
    );
  });

  // Add click event listeners to the close button of each product
  const closeButtons = document.querySelectorAll(".cart-item-close-button");
  closeButtons?.forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
      const productId = closeButton.getAttribute("data-product-id"); // Get the product ID from the data attribute

      localStorage.setItem("cart", JSON.stringify(cartList.filter((item) => item.id !== +productId)));

      window.location.reload();
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
