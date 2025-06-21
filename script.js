// ===== Theme Toggle Logic =====
const toggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

function applyTheme(isDark) {
  body.classList.toggle('dark-mode', isDark);
  themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  localStorage.setItem('isDarkMode', isDark); // Persist preference
}

function toggleTheme() {
  const isDark = !body.classList.contains('dark-mode');
  applyTheme(isDark);
}

// ===== Cart + Toast Logic & DOMContentLoaded =====
document.addEventListener("DOMContentLoaded", () => {
  // 1. Load saved theme
  const isDarkStored = localStorage.getItem('isDarkMode') === 'true';
  applyTheme(isDarkStored);

  // 2. Year auto-update
  const yearSpan = document.getElementById("copyrightYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 3. Cart & Toast setup
  const cartBtn = document.getElementById("cartBtn");
  const cartCount = document.getElementById("cartCount");
  const toastEl = document.getElementById("cartToast");
  const toast = new bootstrap.Toast(toastEl);
  let count = 0;

  const captions = document.querySelectorAll(".caption");
  captions.forEach(caption => {
    caption.addEventListener("click", () => {
      count++;
      cartCount.textContent = count;
      toast.show();
    });
  });

  // 4. Toggle theme on button click
  toggleBtn.addEventListener('click', toggleTheme);
});
