const carouselContainer = document.querySelector('.carousel-container');
const items = document.querySelectorAll('.carousel-item');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

let currentIndex = 1; // Começa no primeiro item real
let isTransitioning = false; // Previne múltiplos cliques durante a transição

// Ajusta a posição do carrossel
function updateCarouselPosition(instant = false) {
    const width = items[0].clientWidth;
    carouselContainer.style.transition = instant ? 'none' : 'transform 0.5s ease-in-out';
    carouselContainer.style.transform = `translateX(-${currentIndex * width}px)`;
}

// Lida com o final da transição para reposicionar sem "piscar"
function handleTransitionEnd() {
    const totalItems = items.length;

    if (currentIndex === 0) {
        // Se está no clone do último item, redefine para o último real
        currentIndex = totalItems - 2;
        updateCarouselPosition(true); // Atualização instantânea
    } else if (currentIndex === totalItems - 1) {
        // Se está no clone do primeiro item, redefine para o primeiro real
        currentIndex = 1;
        updateCarouselPosition(true); // Atualização instantânea
    }

    isTransitioning = false; // Permite novos cliques
}

// Avança para o próximo slide
nextButton.addEventListener('click', () => {
    if (isTransitioning) return;

    currentIndex++;
    isTransitioning = true;
    updateCarouselPosition();
});

// Volta para o slide anterior
prevButton.addEventListener('click', () => {
    if (isTransitioning) return;

    currentIndex--;
    isTransitioning = true;
    updateCarouselPosition();
});

// Configura evento de transição
carouselContainer.addEventListener('transitionend', handleTransitionEnd);

// Configura o carrossel na posição inicial
window.addEventListener('load', () => {
    updateCarouselPosition();
});

// Selecionando o botão de menu e os links
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Adicionando um evento de clique no ícone do hambúrguer
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Alterna a classe "active" no menu
});


