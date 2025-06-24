// ========== THEME TOGGLE ==========

const toggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

function applyTheme(isDark) {
  body.classList.toggle('dark-mode', isDark);
  themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  localStorage.setItem('isDarkMode', isDark);
}

function toggleTheme() {
  const isDark = !body.classList.contains('dark-mode');
  applyTheme(isDark);
}


// ========== CART FUNCTIONALITY ==========

let cart = JSON.parse(localStorage.getItem("cart")) || {};

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (!cartCount) return;
  const total = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  cartCount.textContent = total;
}

function updateCartModal() {
  const cartItemsContainer = document.getElementById("cartItems");
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  if (Object.keys(cart).length === 0) {
    cartItemsContainer.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
    return;
  }

  const list = document.createElement("ul");
  list.className = "list-group";

  Object.entries(cart).forEach(([name, qty]) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = name;

    const badge = document.createElement("span");
    badge.className = "badge bg-secondary rounded-pill";
    badge.textContent = `Qty: ${qty}`;

    li.appendChild(badge);
    list.appendChild(li);
  });

  cartItemsContainer.appendChild(list);
}


// ========== FORM VALIDATION & TOASTS ==========

function triggerInvalid(inputElement) {
  inputElement.classList.remove("is-invalid");
  inputElement.offsetHeight; // force reflow
  setTimeout(() => inputElement.classList.add("is-invalid"), 1);
}


// ========== INITIALIZE APP ON PAGE LOAD ==========

document.addEventListener("DOMContentLoaded", () => {
  // Apply theme
  applyTheme(localStorage.getItem('isDarkMode') === 'true');

  // Set current year in footer
  const yearSpan = document.getElementById("copyrightYear");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Theme toggle button click
  toggleBtn?.addEventListener('click', toggleTheme);

  // Init cart
  const cartBtn = document.getElementById("cartBtn");
  const cartCount = document.getElementById("cartCount");
  const toastEl = document.getElementById("cartToast");
  const toastBody = toastEl.querySelector(".toast-body");
  const cartToast = new bootstrap.Toast(toastEl, { autohide: true, delay: 3000 });

  updateCartCount();

  document.querySelectorAll(".caption").forEach((caption, index) => {
    caption.addEventListener("click", () => {
      const itemName = caption.closest(".col-md-4")?.querySelector("h5")?.textContent.trim() || `Item ${index + 1}`;
      cart[itemName] = (cart[itemName] || 0) + 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      updateCartModal();

      toastBody.textContent = `Added "${itemName}" (Qty: ${cart[itemName]}) to cart.`;
      cartToast.show();
    });
  });

  cartBtn?.addEventListener("click", updateCartModal);

  const clearBtn = document.getElementById("clearCartBtn");
  clearBtn?.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the cart?")) {
      cart = {};
      localStorage.removeItem("cart");
      updateCartCount();
      updateCartModal();
    }
  });

  // Contact form
  const contactForm = document.getElementById("contactForm");
  const successToast = new bootstrap.Toast(document.getElementById("contactToastSuccess"), { autohide: true, delay: 3000 });
  const errorToast = new bootstrap.Toast(document.getElementById("contactToastError"), { autohide: true, delay: 4000 });
  const errorToastMsg = document.getElementById("errorToastMsg");

  contactForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const messageInput = document.getElementById("contactMessage");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Reset validation styles
    [nameInput, emailInput, messageInput].forEach(input => input.classList.remove("is-invalid"));

    let hasError = false;
    if (!name) { triggerInvalid(nameInput); hasError = true; }
    if (!email || !emailValid) { triggerInvalid(emailInput); hasError = true; }
    if (!message) { triggerInvalid(messageInput); hasError = true; }

    if (hasError) {
      errorToastMsg.textContent = "Please fill in all fields correctly.";
      errorToast.show();
      return;
    }
    // Show success toast immediately
    successToast.show(); 

    fetch("https://formsubmit.co/ajax/maureenpsah@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to send");
      successToast.show();
      contactForm.reset();

      // ✅ Clear previous validation state
      [nameInput, emailInput, messageInput].forEach(input => {
        input.classList.remove("is-invalid");
        input.setCustomValidity && input.setCustomValidity("");
      });
    })
    .catch(() => {
      errorToastMsg.textContent = "Unable to send. Please try again.";
      errorToast.show();
    });
  });
});
