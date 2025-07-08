document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const restartButton = document.getElementById('restart-button'); 

    const images = [
        '1.png', '2.png', '3.png', '4.png',
        '5.png', '6.png', '7.png', '8.png'
    ];

    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let score = 0;
    const totalPairs = images.length;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function initializeGame() {
        const gameImages = [...images, ...images];
        shuffle(gameImages); 

        gameBoard.innerHTML = '';
        score = 0;
        scoreDisplay.textContent = score;
        matchedPairs = 0;
        flippedCards = [];
        cards = [];

        gameImages.forEach((imageSrc, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.index = index;
            card.dataset.image = imageSrc;

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-face', 'card-back');
            cardBack.innerHTML = '?';

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-face', 'card-front');
            const imgElement = document.createElement('img');
            imgElement.src = `images/${imageSrc}`;
            cardFront.appendChild(imgElement);

            cardInner.appendChild(cardBack);
            cardInner.appendChild(cardFront);
            card.appendChild(cardInner);

            card.addEventListener('click', () => flipCard(card));
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }

    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains('revealed') && !card.classList.contains('matched')) {
            card.classList.add('revealed');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 1000); 
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const image1 = card1.dataset.image;
        const image2 = card2.dataset.image;

        if (image1 === image2) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            score += 10;
            scoreDisplay.textContent = score;

            if (matchedPairs === totalPairs) {
                setTimeout(() => alert(`Parabéns! Você completou o jogo com ${score} pontos!`), 500);
            }
        } else {
            card1.classList.remove('revealed');
            card2.classList.remove('revealed');
        }

        flippedCards = []; 
    }

    restartButton.addEventListener('click', initializeGame);

    initializeGame();
});