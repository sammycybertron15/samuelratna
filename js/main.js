// === ROLE CAROUSEL IN HERO ===
const roleItems = document.querySelectorAll(".role-item");
let activeRoleIndex = 0;

function showRole(index) {
  roleItems.forEach((item, i) => {
    item.classList.toggle("active", i === index);
    item.classList.toggle("behind", i !== index);
  });
}

if (roleItems.length > 0) {
  showRole(activeRoleIndex);

  setInterval(() => {
    activeRoleIndex = (activeRoleIndex + 1) % roleItems.length;
    showRole(activeRoleIndex);
  }, 2200);
}

// === REVEAL ON SCROLL ===
const revealSections = document.querySelectorAll(".reveal");

if (revealSections.length > 0 && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealSections.forEach(sec => observer.observe(sec));
} else {
  // Fallback: if no IntersectionObserver, just show all
  revealSections.forEach(sec => sec.classList.add("reveal-visible"));
}


// === CONTACT FORM VALIDATION ===
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;

    const nameInput = form.name;
    const emailInput = form.email;
    const msgInput = form.message;

    const showError = (input, msg) => {
      const small = input.parentElement.querySelector(".error");
      if (small) small.textContent = msg;
      input.classList.add("invalid");
    };

    const clearError = input => {
      const small = input.parentElement.querySelector(".error");
      if (small) small.textContent = "";
      input.classList.remove("invalid");
    };

    // Name validation
    if (!nameInput.value.trim()) {
      valid = false;
      showError(nameInput, "Please enter your name.");
    } else {
      clearError(nameInput);
    }

    // Email validation
    const emailVal = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailVal) {
      valid = false;
      showError(emailInput, "Please enter your email.");
    } else if (!emailPattern.test(emailVal)) {
      valid = false;
      showError(emailInput, "Please enter a valid email address.");
    } else {
      clearError(emailInput);
    }

    // Message validation
    if (!msgInput.value.trim()) {
      valid = false;
      showError(msgInput, "Please enter a message.");
    } else {
      clearError(msgInput);
    }

    const status = document.getElementById("form-status");
    if (!status) return;

    if (valid) {
      status.textContent = "Thank you! This demo form passed validation.";
      status.style.color = "#22c55e";
      form.reset();
    } else {
      status.textContent = "Please fix the errors above.";
      status.style.color = "#f97316";
    }
  });
}
