document.addEventListener('DOMContentLoaded', function () {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const memoryGame = document.getElementById('memoryGame');
    let flippedCards = [];

    // Shuffle the card values
    const shuffledCards = shuffleArray(cardValues.concat(cardValues));

    // Create cards dynamically
    shuffledCards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');

        const inner = document.createElement('div');
        inner.classList.add('inner');

        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = '?';

        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = value;

        inner.appendChild(front);
        inner.appendChild(back);

        card.appendChild(inner);

        card.addEventListener('click', flipCard);
        memoryGame.appendChild(card);
    });

    function flipCard() {
        const card = this;

        if (!card.classList.contains('flipped') && flippedCards.length < 2) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.textContent === card2.textContent) {
            card1.classList.add('matched');
            card2.classList.add('matched');
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards = [];

        if (document.querySelectorAll('.matched').length === shuffledCards.length) {
            alert('Congratulations! You won!');
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
