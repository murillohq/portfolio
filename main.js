const text = "Welcome, User!";
const typedEl = document.getElementById("typed");

let i = 0;
function digitar() {
  if (i < text.length) {
    typedEl.innerHTML += text.charAt(i);
    i++;
    setTimeout(digitar, 120);
  }
}

window.addEventListener("DOMContentLoaded", digitar);

// Navbar hide/show on scroll
let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scrolling down - hide navbar
    header.classList.add("nav-hidden");
  } else {
    // Scrolling up - show navbar
    header.classList.remove("nav-hidden");
  }

  lastScroll = currentScroll;
});

// Lightbox de certificados
function abrirLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = src;
  lightbox.classList.add("active");
}

function fecharLightbox() {
  document.getElementById("lightbox").classList.remove("active");
}
