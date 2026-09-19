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

// Soft Skills - baralho de cards empilhados
const softSkillsStack = document.getElementById("softSkillsStack");
if (softSkillsStack) {
  const cards = Array.from(
    softSkillsStack.querySelectorAll(".soft-skill-card"),
  );
  const total = cards.length;
  const offsetStep = 1.8; // rem, distância entre camadas
  const scaleStep = 0.05;
  const opacityStep = 0.15;
  const maxTiers = 3; // depois disso, fica igual ao 3º plano
  const intervaloAuto = 2500; // ms entre trocas automáticas
  const tempoRetomada = 5000; // ms parado até o automático voltar

  function atualizarStack(ordem) {
    ordem.forEach((card, distancia) => {
      const tier = Math.min(distancia, maxTiers);
      card.style.setProperty("--_order", total - distancia);
      card.style.setProperty("--_offset", `${-tier * offsetStep}rem`);
      card.style.setProperty("--_scale", `${1 - tier * scaleStep}`);
      card.style.setProperty("--_opacity", `${1 - tier * opacityStep}`);
    });
  }

  let ordem = [...cards];
  atualizarStack(ordem);

  function trazerParaFrente(card) {
    ordem = ordem.filter((c) => c !== card);
    ordem.unshift(card);
    atualizarStack(ordem);
  }

  let autoPlay = null;
  let timeoutRetomada = null;

  function iniciarAutoPlay() {
    if (autoPlay) return;
    autoPlay = setInterval(() => {
      const ultimoCard = ordem[ordem.length - 1];
      trazerParaFrente(ultimoCard);
    }, intervaloAuto);
  }

  function pararAutoPlay() {
    if (autoPlay) {
      clearInterval(autoPlay);
      autoPlay = null;
    }
  }

  iniciarAutoPlay();

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      pararAutoPlay();
      trazerParaFrente(card);

      // reinicia a contagem: se ficar 5s sem novo clique, o automático volta
      clearTimeout(timeoutRetomada);
      timeoutRetomada = setTimeout(iniciarAutoPlay, tempoRetomada);
    });
  });
}
