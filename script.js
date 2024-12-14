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

const filtros = [document.getElementById('filtro-todas'),
    document.getElementById('filtro-positivas'),
    document.getElementById('filtro-negativas')
];
const avaliacoes = document.querySelectorAll('.avaliacao-individual');

// Adicionar event listeners aos filtros
filtros.forEach(filtro => {
    filtro.addEventListener('click', () => {
        // Remover a classe "selected" de todos os filtros
        filtros.forEach(f => f.classList.remove('selected'));
        
        // Adicionar a classe "selected" ao filtro clicado
        filtro.classList.add('selected');
        
        // Filtrar avaliações com base no filtro clicado
        const tipo = filtro.id.split('-')[1]; // Obtem 'todas', 'positivas' ou 'negativas'
        console.log(tipo);
        filtrarAvaliacoes(tipo);
    });
});

function filtrarAvaliacoes(tipo) {
    avaliacoes.forEach(avaliacao => {
        const barras = avaliacao.querySelectorAll('.barra-verde, .barra-vermelha');
        let somaNotas = 0;
        let totalNotas = 0;

        barras.forEach(barra => {
            const nota = parseFloat(barra.textContent.trim());
            if (!isNaN(nota)) {
                somaNotas += nota;
                totalNotas++;
            }
        });
        
        const media = somaNotas / totalNotas;

        // Mostrar/ocultar com base no tipo selecionado
        if (
            tipo === 'todas' || 
            (tipo === 'positivas' && media >= 3) ||
            (tipo === 'negativas' && media < 3)
        ) {
            avaliacao.style.display = 'flex';
        } else {
            avaliacao.style.display = 'none';
        }
    });
}
