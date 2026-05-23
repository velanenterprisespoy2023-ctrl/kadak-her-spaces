const cart = [];
const cartCount = document.querySelector("#cartCount");
const cartDrawer = document.querySelector("#cartDrawer");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const openCart = document.querySelector("#openCart");
const closeCart = document.querySelector("#closeCart");
const newsletterForm = document.querySelector("#newsletterForm");

function formatPrice(value) {
  return `Rs.${value.toLocaleString("en-IN")}`;
}

function renderCart() {
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItems.textContent = "Cart is empty.";
    cartTotal.textContent = "Rs.0";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <span>
            <strong>${item.name}</strong>
            <small>Qty: ${item.qty}</small>
          </span>
          <strong>${formatPrice(item.price * item.qty)}</strong>
        </div>
      `
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.textContent = formatPrice(total);
}

document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    const existing = cart.find((item) => item.name === name);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    button.textContent = "Added";
    setTimeout(() => {
      button.textContent = "Add to Cart";
    }, 900);

    renderCart();
  });
});

openCart.addEventListener("click", () => {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
});

closeCart.addEventListener("click", () => {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
});

cartDrawer.addEventListener("click", (event) => {
  if (event.target === cartDrawer) {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
  }
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = newsletterForm.querySelector("button");
  button.textContent = "Subscribed";
  newsletterForm.reset();
  setTimeout(() => {
    button.textContent = "Subscribe";
  }, 1300);
});

renderCart();
