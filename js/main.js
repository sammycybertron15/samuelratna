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

// === SIMPLE IMAGE LIGHTBOX ===
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

function closeLightbox() {
  if (!lightbox) return;
  lightbox.style.display = "none";
  if (lightboxImg) lightboxImg.src = "";
}

if (lightbox && lightboxImg && lightboxTriggers.length > 0) {
  lightboxTriggers.forEach(el => {
    el.addEventListener("click", () => {
      const fullSrc = el.dataset.full;
      if (!fullSrc) return;
      lightboxImg.src = fullSrc;
      lightbox.style.display = "flex";
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
      closeLightbox();
    }
  });
}

// === MINI MUSIC PLAYER (per page) ===
const miniPlayer = document.querySelector(".mini-player");
const miniAudio = document.getElementById("mini-audio");
const miniToggle = document.getElementById("mini-music-toggle");
const miniCd = document.getElementById("mini-cd");
const miniTitleSpan = document.querySelector(".mini-title");

if (miniPlayer && miniAudio && miniToggle && miniCd) {
  const trackSrc = miniPlayer.dataset.track;
  const trackTitle = miniPlayer.dataset.title || "";

  if (trackSrc) miniAudio.src = trackSrc;
  if (miniTitleSpan && trackTitle) miniTitleSpan.textContent = trackTitle;

  let isPlaying = false;
  let hasShownTitle = false;

  const updateMiniUI = () => {
    miniToggle.textContent = isPlaying ? "❚❚" : "▶";
    miniCd.classList.toggle("is-playing", isPlaying);
  };

  const showTitleOnce = () => {
    if (!miniTitleSpan || hasShownTitle || !trackTitle) return;
    hasShownTitle = true;
    // this class now triggers the max-width animation in CSS
    miniTitleSpan.classList.add("visible");
    setTimeout(() => {
      miniTitleSpan.classList.remove("visible");
    }, 3000);
  };

  window.addEventListener("load", () => {
    if (!trackSrc) return;
    miniAudio.play().then(() => {
      isPlaying = true;
      updateMiniUI();
      showTitleOnce();
    }).catch(() => {
      isPlaying = false;
      updateMiniUI();
    });
  });

  miniToggle.addEventListener("click", () => {
    if (!trackSrc) return;

    if (!isPlaying) {
      miniAudio.play().then(() => {
        isPlaying = true;
        updateMiniUI();
        showTitleOnce();
      }).catch(() => {});
    } else {
      miniAudio.pause();
      isPlaying = false;
      updateMiniUI();
    }
  });

  miniAudio.addEventListener("play", () => {
    isPlaying = true;
    updateMiniUI();
  });

  miniAudio.addEventListener("pause", () => {
    isPlaying = false;
    updateMiniUI();
  });
}
