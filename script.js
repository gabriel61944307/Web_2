document.querySelectorAll('.linhaAvaliacao .estrelas').forEach(estrelasDiv => {
    estrelasDiv.addEventListener('click', function (event) {
        const clickedStar = event.target;
        const stars = estrelasDiv.querySelectorAll('img');
        const selectedIndex = Array.from(stars).indexOf(clickedStar);

        stars.forEach((star, index) => {
            if (index <= selectedIndex) {
                star.src = 'imagens/star-solid.svg';
                star.classList.add('amarela');
            } else {
                star.src = 'imagens/star-regular.svg';
                star.classList.remove('amarela');
            }
        });
    });
});

document.querySelectorAll('.sim-nao').forEach((img) => {
    img.addEventListener('click', () => {
        // Remove a classe "verde" de todos os botões
        document.querySelectorAll('.sim-nao').forEach((el) => {
            el.classList.remove('verde');
        });

        // Adiciona a classe "verde" ao botão clicado
        img.classList.add('verde');
    });
});