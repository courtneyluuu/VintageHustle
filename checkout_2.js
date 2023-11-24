window.onload = () => {
  const cartList = JSON.parse(localStorage.getItem("cart"));
  const checkoutInfo = JSON.parse(localStorage.getItem("checkout-info"));
  const checkoutMoney = JSON.parse(localStorage.getItem("checkout-money"));
  console.log(checkoutMoney);
  const fullName = document.getElementById("full-name");
  const address1 = document.getElementById("address-1");
  const address2 = document.getElementById("address-2");
  const visa = document.getElementById("visa");
  const checkoutCartContainer = document.getElementById("checkout-cart-container");
  const orderTotalBottom = document.getElementById("order-total-bottom");
  const base = document.getElementById("base");
  const tax = document.getElementById("tax");
  const shipping = document.getElementById("shipping");
  const discount = document.getElementById("discount");
  const total = document.getElementById("total");
  const placeOrder1 = document.getElementById("place-order-1");
  const placeOrder2 = document.getElementById("place-order-2");

  fullName.innerHTML = `${checkoutInfo?.firstName} ${checkoutInfo?.lastName}`;
  address1.innerHTML = checkoutInfo?.streetAddress;
  address2.innerHTML = `${checkoutInfo?.city}, ${checkoutInfo?.state} ${checkoutInfo?.zipCode}`;
  visa.innerHTML = `Visa ending in ${checkoutInfo?.cardNumber?.slice(-4)}`;
  orderTotalBottom.innerHTML = `Order Total: $${checkoutMoney.finalTotal}`;
  base.innerHTML = `$${checkoutMoney.finalBase}`;
  tax.innerHTML = `$${checkoutMoney.finalTax}`;
  shipping.innerHTML = `$${checkoutMoney.shipping}`;
  discount.innerHTML = `-$${checkoutMoney.finalDiscount}`;
  total.innerHTML = `Order Total: $${checkoutMoney.finalTotal}`;

  const currentDate = new Date();
  const date = new Date(currentDate);
  date.setDate(currentDate.getDate() + 3);
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleString("en-US", options);

  checkoutCartContainer.innerHTML = cartList
    ?.map((product) => {
      return `
    <div class="checkout-cart">
    <p>Delivery: ${formattedDate}</p>
    <div class="checkout-product">
      <img src=${product.image} alt="Dress" />
      <div class="checkout-product-info">
        <p>${product.name}</p>
        <div>
        ${
          product.is_deal
            ? `<div class="price">
                      <p>$${product.original_price}</p>
                      <p>$${product.sale_price}</p>
                    </div>`
            : `<span>$${product.original_price}</span>`
        }
        <span>${product.size === "M" ? "SIZE MEDIUM" : product.size === "S" ? "SIZE SMALL" : "SIZE LARGE"}</span>
          <span>Quantity: ${product.quantity}</span>
        </div>
      </div>
    </div>
  </div>
  `;
    })
    .join("");

  const successPayment = () => {
    alert("Order successfully, thank you for choosing us ♡");
    localStorage.clear();
    window.location.href = "/";
  };
  placeOrder1.addEventListener("click", successPayment);
  placeOrder2.addEventListener("click", successPayment);
};
