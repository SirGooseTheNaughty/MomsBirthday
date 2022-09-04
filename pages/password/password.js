const ownedLetters = new Set(localStorage.getItem('letters') ? localStorage.getItem('letters').split(',') : []);
const correct = 'витутчистоконкретно';

document.querySelector('.amount').textContent = ownedLetters.size;

const getGift = document.querySelector('.get-gift');

const lettersElem = document.querySelector('.letters');
ownedLetters.forEach(letter => {
    const el = document.createElement('span');
    el.classList.add('owned-letter');
    el.textContent = letter;
    lettersElem.appendChild(el);
});

document.querySelector('.btn-1').addEventListener('click', () => {
    document.querySelector('.intro').classList.add('hidden');
    document.querySelector('.description').classList.remove('hidden');
});

const inputs = document.querySelectorAll('input');
inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => handleInput(e, input, index));
});
getGift.addEventListener('click', showResult);

let shakeTimeout;

function showResult() {
    shakeBody();
    document.querySelector('.description').style.transform = 'translateY(-100%)';
    document.querySelector('.result').classList.add('appear');
    setTimeout(() => {
        clearTimeout(shakeTimeout);
    }, 2000);
}

function handleInput(e, input, index) {
    input.value = e.data;
    if (index < inputs.length - 1) {
        inputs[index + 1].focus();
    } else {
        input.blur();
    }

    checkValue();
};

function checkValue() {
    let gotError = false;
    inputs.forEach((elem, index) => {
        if (!elem.value) {
            gotError = true;
            return;
        }
        if (elem.value === correct[index] || (correct[index] === 'и' && elem.value === 'ы')) {
            elem.classList.remove('incorrect');
            elem.classList.add('correct');
        } else {
            gotError = true;
            elem.classList.remove('correct');
            elem.classList.add('incorrect');
        }
    });
    if (!gotError) {
        getGift.classList.add('gotit');
    }
}

function shakeBody() {
    const x = Math.random() - 0.5;
    const y = Math.random() - 0.5;

    document.body.style.transform = `translate(${x * 10}px, ${y * 10}px)`;

    shakeTimeout = setTimeout(shakeBody, 20);
}