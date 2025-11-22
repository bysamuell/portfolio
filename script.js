function ativaLetra(elemento){
  if(!elemento) return;
  const arrTexto = elemento.innerHTML.split("");
  elemento.innerHTML = '';
  arrTexto.forEach((letra, i)=>{
    setTimeout(()=>{
      elemento.innerHTML += letra;
    }, i * 75)
  });
}

const titulo = document.querySelector(".digitando");
ativaLetra(titulo);

// Efeito de tilt 3D no card glass-effect (versão suavizada)
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

    // -1 topo / esquerda — 1 baixo / direita
    const px = (x / r.width) * 2 - 1;
    const py = (y / r.height) * 2 - 1;

    // Rotação vertical (cima/baixo)
    // py = 1 (mouse embaixo) → rotateX POSITIVO → topo vem pra frente, base vai pra trás (correto)
    targetX = py * maxRotate;

    // Rotação horizontal (esquerda/direita)
    targetY = -px * maxRotate;
  });

  glassCard.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
  });

  function loop() {
    const ease = 0.12;

    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;

    // *** LIMPA QUALQUER TRANSFORM RESIDUAL ***
    glassCard.style.transform = "";

    // APLICA O TILT REAL
    glassCard.style.transform =
      `rotateX(${currentX}deg) rotateY(${currentY}deg) translateZ(0)`;

    requestAnimationFrame(loop);
  }

  loop();
}