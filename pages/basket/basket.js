const letters = [
    'ი - и',
    'უ - у',
    'ს - с',
];
const ownedLetters = localStorage.getItem('letters') ? localStorage.getItem('letters').split(',') : [];

const items = document.querySelectorAll('.item');
const chosen = new Set([]);

document.querySelector('.btn-1').addEventListener('click', () => {
    document.querySelector('.description').classList.remove('hidden');
    document.querySelector('.intro').classList.add('hidden');
});

items.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (chosen.has(index)) {
            chosen.delete(index);
            item.classList.remove('chosen');
        } else {
            chosen.add(index);
            item.classList.add('chosen');
        }
    });
});

const resBtn = document.querySelector('.btn-2');

const result = (correct) => {
    const resBlock = document.querySelector('.result');
    const heading = resBlock.querySelector('.heading');
    const points = resBlock.querySelector('.points');
    const lettersElement = resBlock.querySelector('.letters');
    let gotLetters = [];

    if (correct <= 0) {
        heading.textContent = 'Вы не поняли, как играть..?';
        points.textContent = `Поздравляю, ${correct}. Берите все, вам и так тяжело`
        lettersElement.textContent = `${letters.join(', ')} (не запоминать можьно)`;
        gotLetters = letters;
    } else if (correct < 2) {
        heading.textContent = 'Можно было и постараться!';
        points.textContent = `${correct} — это одна буква.`
        lettersElement.textContent = `${letters[0]} (не запоминать можьно)`;
        gotLetters = [letters[0]];
    } else if (correct < 4) {
        heading.textContent = 'Лааадно, засчитываю.';
        points.textContent = `${correct} — это дыва букв`
        lettersElement.textContent = `${letters[0]}, ${letters[1]} (не запоминать можьно)`;
        gotLetters = [letters[0], letters[1]];
    } else {
        heading.textContent = 'Горжусь!!!';
        points.textContent = `Целых три буквы вам, это все, что у меня есть!`
        lettersElement.textContent = `${letters.join(', ')} (не запоминать можьно)`;
        gotLetters = letters;
    }

    resBlock.classList.remove('hidden');
    localStorage.setItem('letters', [...new Set([...ownedLetters, ...gotLetters])]);
}

const getResults = () => {
    let points = 0;
    chosen.forEach(index => {
        if ([0, 1, 3, 5, 6].includes(index)) {
            points += 1;
        } else if ([2, 4, 7].includes(index)) {
            points -= 1;
        }
    });
    items.forEach((item, index) => {
        if ([0, 1, 3, 5, 6].includes(index)) {
            if (chosen.has(index)) {
                return item.classList.add('correct');
            } else {
                return item.classList.add('missed');
            }
        } else {
            if (chosen.has(index)) {
                return item.classList.add('wrong');
            }
        }
    });
    resBtn.removeEventListener('click', getResults);
    result(points);
    window.scrollBy(0, document.body.offsetHeight - document.documentElement.clientHeight);
}

resBtn.addEventListener('click', getResults);