// ===== Theme Toggle Logic =====
const toggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Applies the theme based on boolean isDark, sets icon accordingly, and saves preference in localStorage
function applyTheme(isDark) {
  body.classList.toggle('dark-mode', isDark);
  themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  localStorage.setItem('isDarkMode', isDark);
}

// Toggles between dark and light mode when user clicks toggle button
function toggleTheme() {
  const isDark = !body.classList.contains('dark-mode');
  applyTheme(isDark);
}

// ===== Global Cart Data =====
// Retrieves existing cart from localStorage or initializes as empty object if not found
let cart = JSON.parse(localStorage.getItem("cart")) || {};

// ===== DOMContentLoaded =====
document.addEventListener("DOMContentLoaded", () => {
  // 1. On page load, apply previously saved theme from localStorage
  const isDarkStored = localStorage.getItem('isDarkMode') === 'true';
  applyTheme(isDarkStored);

  // 2. Auto insert current year into the footer copyright span
  const yearSpan = document.getElementById("copyrightYear");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // 3. Store key UI elements for cart and toasts
  const cartBtn = document.getElementById("cartBtn");
  const cartCount = document.getElementById("cartCount");
  const toastEl = document.getElementById("cartToast");
  const toastBody = toastEl.querySelector(".toast-body");
  const toast = new bootstrap.Toast(toastEl, { autohide: true, delay: 3000 });

  // 4. Update cart icon with total number of items on page load
  updateCartCount();

  // 5. When user clicks a product caption, add item to cart
  const captions = document.querySelectorAll(".caption");
  captions.forEach((caption, index) => {
    caption.addEventListener("click", () => {
      // Get the item name from sibling h5 tag, fallback to default name
      const itemName = caption.closest(".col-md-4").querySelector("h5")?.textContent.trim() || `Item ${index + 1}`;

      // Add item to cart or increase quantity if already exists
      cart[itemName] = (cart[itemName] || 0) + 1;

      // Save updated cart, refresh cart count and modal
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      updateCartModal();

      // Show toast with item name and updated quantity
      toastBody.textContent = `Added \"${itemName}\" (Qty: ${cart[itemName]}) to cart.`;
      toast.show();
    });
  });

  // 6. When cart icon is clicked, show current cart items in modal
  cartBtn.addEventListener("click", updateCartModal);

  // 7. Clear cart completely when 'Clear Cart' is clicked and confirmed
  const clearBtn = document.getElementById("clearCartBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear the cart?")) {
        cart = {};
        localStorage.removeItem("cart");
        updateCartCount();
        updateCartModal();
      }
    });
  }

  // 8. Set up theme toggle button click event
  toggleBtn.addEventListener('click', toggleTheme);

  // ===== Contact Form Submit with Validation & Toasts =====
  const contactForm = document.getElementById("contactForm");
  const contactToastSuccessEl = document.getElementById("contactToastSuccess");
  const contactToastErrorEl = document.getElementById("contactToastError");
  const errorToastMsg = document.getElementById("errorToastMsg");

  const successToast = new bootstrap.Toast(contactToastSuccessEl, { autohide: true, delay: 3000 });
  const errorToast = new bootstrap.Toast(contactToastErrorEl, { autohide: true, delay: 4000 });

  // Form submit handler with validation for name, email, and message
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Grab form field values
      const nameInput = document.getElementById("contactName");
      const emailInput = document.getElementById("contactEmail");
      const messageInput = document.getElementById("contactMessage");

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      // Basic regex check for valid email
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      // Clear previous validation indicators
      nameInput.classList.remove("is-invalid");
      emailInput.classList.remove("is-invalid");
      messageInput.classList.remove("is-invalid");

      let hasError = false;

      // Validate each input field and mark if invalid
function triggerInvalid(inputElement) {
  inputElement.classList.remove("is-invalid");

  // Force reflow (reset animation)
  inputElement.offsetHeight;

  // Re-add class with short delay
  setTimeout(() => {
    inputElement.classList.add("is-invalid");
  }, 1);
}
        if (!name) {
          triggerInvalid(nameInput);
          hasError = true;
        }

        if (!email || !emailValid) {
          triggerInvalid(emailInput);
          hasError = true;
        }

        if (!message) {
          triggerInvalid(messageInput);
          hasError = true;
        }


      // Show error toast if any fields are invalid
      if (hasError) {
        errorToastMsg.textContent = "Please fill in all fields correctly.";
        errorToast.show();
        return;
      }

      // Send the validated form data to a backend (mock endpoint used here)
        fetch("https://formsubmit.co/ajax/maureenpsah@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
        })
        .then(response => {
        if (!response.ok) throw new Error("Failed to send");
        successToast.show();
        contactForm.reset();
        })
        .catch(err => {
        errorToastMsg.textContent = "Unable to send. Please try again.";
        errorToast.show();
        });
    });
    }
});

// ===== Utility Functions =====
// Calculates and displays total number of items in cart icon badge
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (!cartCount) return;
  const total = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  cartCount.textContent = total;
}

// Renders cart items and their quantities inside the cart modal
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

  Object.keys(cart).forEach(name => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = name;

    const badge = document.createElement("span");
    badge.className = "badge bg-secondary rounded-pill";
    badge.textContent = `Qty: ${cart[name]}`;

    li.appendChild(badge);
    list.appendChild(li);
  });

  cartItemsContainer.appendChild(list);
}
