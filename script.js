// Efeito de digitação no título
function ativaLetra(elemento) {
  if (!elemento) return;
  const arrTexto = elemento.innerHTML.split("");
  elemento.innerHTML = '';
  arrTexto.forEach((letra, i) => {
    setTimeout(() => {
      elemento.innerHTML += letra;
    }, i * 75);
  });
}

const titulo = document.querySelector(".digitando");
ativaLetra(titulo);

// Efeito de tilt 3D no card glass-effect
const glassCard = document.querySelector(".glass-effect");

if (glassCard) {
  const maxRotate = 20;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  glassCard.addEventListener("mousemove", (e) => {
    const r = glassCard.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const px = (x / r.width) * 2 - 1;
    const py = (y / r.height) * 2 - 1;

    targetX = py * maxRotate;
    targetY = -px * maxRotate;
  });

  glassCard.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
  });

  function animateTilt() {
    const ease = 0.12;
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    glassCard.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg) translateZ(0)`;
    requestAnimationFrame(animateTilt);
  }

  animateTilt();
}

// Reveal on scroll para elementos gerais
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0 && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
  });

  revealElements.forEach((el) => observer.observe(el));
}

// Animação específica da grade de projetos
const projetosSection = document.querySelector('#lista-projetos');
const projetosGrid = document.querySelector('.projetos-grid.projetos-animar');

if (projetosSection && projetosGrid && 'IntersectionObserver' in window) {
  const projetosObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        projetosGrid.classList.add('projetos-animado');
        projetosObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
  });

  projetosObserver.observe(projetosSection);
}