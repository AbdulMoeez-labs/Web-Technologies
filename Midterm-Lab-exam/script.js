const cart = [];
const limit = 4;

const cartBadge = document.getElementById("cart-badge");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartToggle = document.getElementById("cart-toggle");
const miniCart = document.getElementById("mini-cart");

const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");

    const name = card.querySelector(".name").textContent.trim();

    const priceText = card.querySelector(".price .now").textContent;
    const price = Number(priceText.replace(/[^0-9.]/g, ""));

    const count = cart.filter(item => item.name === name).length;

    if (count >= limit) return;

    cart.push({ name, price });

    updateCart();
  });
});

function updateCart() {
  cartBadge.textContent = cart.length;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");

    const itemText = document.createElement("span");
    itemText.textContent = `${item.name} - Rs. ${item.price.toLocaleString()}`;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", () => {
      cart.splice(index, 1);
      updateCart();
    });

    li.append(itemText, removeButton);
    cartItems.appendChild(li);
  });

  const total = cart.reduce((sum, item) => {
    return sum + item.price;
  }, 0);

  cartTotal.textContent = total.toLocaleString();

  buttons.forEach(button => {
    const card = button.closest(".product-card");
    const name = card.querySelector(".name").textContent.trim();

    const count = cart.filter(item => item.name === name).length;

    if (count >= limit) {
      button.disabled = true;
      button.textContent = "Limit reached";
    } else {
      button.disabled = false;
      button.textContent = "Add to Cart";
    }
  });
}

cartToggle.addEventListener("click", () => {
  miniCart.hidden = !miniCart.hidden;
  cartToggle.setAttribute("aria-expanded", String(!miniCart.hidden));
});