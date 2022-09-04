const letters = [
    'კ - к',
    'ე - е',
];
const ownedLetters = localStorage.getItem('letters') ? localStorage.getItem('letters').split(',') : [];

const buttonTexts = [
    'Я тут',
    'Я там',
    'Стихов',
    'Вам дам',
    'Я как',
    'Стихи',
    'Вам на',
    'пишу',
    'Всех просто',
    'Очень',
    'Насме',
    'шу',
];

document.querySelector('.btn-1').addEventListener('click', () => {
    document.querySelector('.description').classList.remove('hidden');
    document.querySelector('.intro').classList.add('hidden');
});

document.querySelector('.start').addEventListener('click', () => {
    document.querySelector('.description').classList.add('hidden');
    document.querySelector('.runner-cont').classList.remove('hidden');
    jumpTimeout = setTimeout(jump, 750);
    setTimeout(() => changeTimer(9), 1000);
});

let count = 1;
let jumpTimeout;
let textIndex = 1;
const runner = document.querySelector('.runner');
const counter = document.querySelector('.counter');
const timer = document.querySelector('.timer');

runner.addEventListener('click', () => {
    count += 1;
    counter.textContent = `Очков: ${count}`;
    clearTimeout(jumpTimeout);
    jump();
});

function changeTimer(time) {
    if (time === 0) {
        clearTimeout(jumpTimeout);
        return renderResult();
    }
    timer.textContent = `Времени осталось: ${time}`;
    setTimeout(() => changeTimer(time - 1), 1000);
}

function jump() {
    const rx = Math.random();
    const ry = Math.random();

    const x = rx * document.body.offsetWidth;
    const y = ry * document.body.offsetHeight;

    runner.style = `top: ${y}px; left: ${x}px`;

    const newTextIndex = textIndex % buttonTexts.length;
    runner.textContent = buttonTexts[newTextIndex];
    textIndex += 1;

    jumpTimeout = setTimeout(jump, 750);
}

function renderResult()  {
    const resBlock = document.querySelector('.result');
    const heading = resBlock.querySelector('.heading');
    const points = resBlock.querySelector('.points');
    const lettersElement = resBlock.querySelector('.letters');
    let gotLetters = [];

    if (count < 3) {
        heading.textContent = 'Мде';
        points.textContent = `${count}, я обиделся и ничего вам не дам!`
        lettersElement.textContent = `${letters.join(', ')} (не запоминать можьно)`;
        gotLetters = letters;
    } else if (count < 10) {
        heading.textContent = 'Какие конкурсы, так и стараемся!';
        points.textContent = `За ${count}дам вам буковку.`
        lettersElement.textContent = `${letters[0]} (не запоминать можьно)`;
        gotLetters = [letters[0]];
    } else {
        heading.textContent = 'Постарались!';
        points.textContent = `За ${count} тыков дам две оставшиеся!`
        lettersElement.textContent = `${letters.join(', ')} (не запоминать можьно)`;
        gotLetters = letters;
    }

    localStorage.setItem('letters', [...new Set([...ownedLetters, ...gotLetters])]);
    resBlock.classList.remove('hidden');
    document.querySelector('.runner-cont').classList.add('hidden');
}