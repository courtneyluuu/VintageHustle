window.onload = () => {
  const firstName = document.getElementById("first-name");
  const streetAddress = document.getElementById("street-address");
  const lastName = document.getElementById("last-name");
  const city = document.getElementById("city");
  const state = document.getElementById("state");
  const zipCode = document.getElementById("zip-code");
  const cardNumber = document.getElementById("card-number");
  const reviewOrder = document.getElementById("review-order");

  reviewOrder.addEventListener("click", () => {
    const checkoutInfo = {
      firstName: firstName?.value,
      streetAddress: streetAddress?.value,
      lastName: lastName?.value,
      city: city?.value,
      state: state?.value,
      zipCode: zipCode?.value,
      cardNumber: cardNumber?.value,
    };
    localStorage.setItem("checkout-info", JSON.stringify(checkoutInfo));
  });
};
