document.querySelector('.btn-1').addEventListener('click', () => {
    document.querySelector('.description').classList.remove('hidden');
    document.querySelector('.intro').classList.add('hidden');
});

document.querySelector('.btn-2').addEventListener('click', () => {
    document.querySelector('.quiz').classList.remove('hidden');
    document.querySelector('.description').classList.add('hidden');
});

const letters = [
    'ნ - н',
    'ჩ - ч',
    'თ - т',
];
const ownedLetters = localStorage.getItem('letters') ? localStorage.getItem('letters').split(',') : [];

const questions = [
    {
        caption: 'Начнем попроще!',
        img: './assets/cairo.jpg',
        target: { x: 0.73, y: 0.93 },
        res: {
            good: 'Слишком легко..? Даю вам два очка за такое!',
            ok: 'Зато дата на фотке прикольная, честное одно очко',
            bad: 'Нет-нет, вам надо ТЫКНУТЬ НА КАРТЕ ГДЕ ЭТО БЫЛО',
        },
    },
    {
        caption: 'Продолжим тоже попроще :)',
        img: './assets/venice.jpg',
        target: { x: 0.46, y: 0.59 },
        res: {
            good: 'Тут и я бы справился! +2',
            ok: 'Петруччо бы тыкнул лучше, получаете одно очки',
            bad: 'Кто-то сфокусировался на вине...',
        },
    },
    {
        caption: 'А вот уже повеселее!',
        img: './assets/asterics.jpg',
        target: { x: 0.33, y: 0.49 },
        res: {
            good: 'Я так же доволен вами, как и на этой фоте! Два очка Гриффиндору!',
            ok: 'Перебрали с волшебным зельем и перелетели, с кем не бывает. +1 к силе',
            bad: 'Не отошли еще от бревна?',
        },
    },
    {
        caption: 'А тут папцовее!',
        img: './assets/crimea.jpg',
        target: { x: 0.75, y: 0.58 },
        res: {
            good: 'И как вы разглядели через облака??',
            ok: 'Ну да, из-за облаков не очень видно...',
            bad: 'Если заблудились - покричите как индеец!',
        },
        accuracy: {
            good: 0.04,
            ok: 0.06,
        }
    },
    {
        caption: 'А тут страшнее!',
        img: './assets/ruan.jpg',
        target: { x: 0.31, y: 0.48 },
        res: {
            good: 'А я не знал! Даю +2',
            ok: 'Ну да, европейцы все на один шлем... Но очко все равно отбили',
            bad: 'Испугались стражника и убежали!',
        },
        accuracy: {
            good: 0.04,
            ok: 0.06,
        }
    },
    {
        caption: 'А тут внезапно похоже!',
        img: './assets/toledo.jpg',
        target: { x: 0.24, y: 0.70 },
        res: {
            good: 'Мы уже пристрелялись к лыцарям',
            ok: 'Так близко, и так далеко!',
            bad: 'Понял-понял, все еще страшно',
        },
    },
    {
        caption: 'А тут собачее!',
        img: './assets/taira.jpg',
        target: { x: 0.8, y: 0.6 },
        res: {
            good: 'Если честно, я засчитывал все Черное море :) +32 там, +2 вам!',
            ok: 'Ну тут и я не знаю... Но это +1',
            bad: 'Вы в Уну тыкнули, что ли?',
        },
        accuracy: {
            good: 0.8,
            ok: 1.2,
        }
    },
    {
        caption: 'А тут рыбнее!',
        img: './assets/norway.jpg',
        target: { x: 0.6, y: 0.02 },
        res: {
            good: 'Такое не забывается!',
            ok: 'Забыли бабушку поставить волноваться',
            bad: 'Я просто так тут с ножом стою??',
        },
        accuracy: {
            good: 0.04,
            ok: 0.06,
        }
    },
    {
        caption: 'Тут совсем страшно!',
        img: './assets/viritsa.jpg',
        target: { x: 0.67, y: 0.26 },
        res: {
            good: 'Такое не забывается! +2 фобии в копилку',
            ok: 'Согласен, я тут не очень... На 1 балл',
            bad: 'Ну конечно, вон как замаскировались!',
        },
    },
    {
        caption: 'Тут супер-ретро!',
        img: './assets/adler.jpg',
        target: { x: 0.8, y: 0.6 },
        res: {
            good: 'Пипца вы даете, заберите свои два очка и радуйтесь',
            ok: 'Одно знаю — это не Норвегия... Но очко дам!',
            bad: 'Я вас не виню',
        },
        accuracy: {
            good: 0.8,
            ok: 1.2,
        }
    },
    {
        caption: 'Тут сонно!',
        img: './assets/plane.jpg',
        target: { x: 1, y: 0.52 },
        res: {
            good: 'Вы там что, жулиничаете??? +2 чита на бумажку',
            ok: 'Снесло ветром чуток, +1',
            bad: 'Улетели в Исландию',
        },
        accuracy: {
            good: 0.2,
            ok: 0.4,
        }
    },
];

const map = document.querySelector('.map');
const captionElement = document.querySelector('.caption');
const promptElement = document.querySelector('.prompt');
const forward = document.querySelector('.forward');
const conclusion = forward.querySelector('.conclusion');
const nextBtn = forward.querySelector('.next');
map.addEventListener('click', handleClick);
nextBtn.addEventListener('click', handleNext);

let qn = 0;
let correct = 0;

function getError(resX, resY) {
    const { x, y } = questions[qn].target;
    const error = Math.sqrt((resX - x)**2 + (resY - y)**2);
    return error;
}

function handleResult(result) {
    const accuracy = questions[qn].accuracy || {
        good: 0.03,
        ok: 0.05,
    };
    if (result <= accuracy.good) {
        correct += 2;
        conclusion.classList.add('good');
        conclusion.textContent = questions[qn].res.good;
    } else if (result <= accuracy.ok) {
        correct += 1;
        conclusion.classList.add('ok');
        conclusion.textContent = questions[qn].res.ok;
    } else {
        conclusion.classList.add('bad');
        conclusion.textContent = questions[qn].res.bad;
    }

    forward.classList.remove('hidden');
}

function drawTarget(width, height) {
    const { x, y } = questions[qn].target;
    const posX = x * width;
    const posY = y * height;

    map.style = `--x: ${posX}px; --y: ${posY}px`;
}

function removeTarget() {
    map.style = `--x: -10000px; --y: 0px`;
}

function handleClick(e) {
    const { layerX, layerY } = e;
    const { width, height } = map.getBoundingClientRect();

    const resX = layerX / width;
    const resY = layerY / height;

    drawTarget(width, height);
    const error = getError(resX, resY);
    handleResult(error);
}

function handleNext() {
    qn += 1;
    if (qn >= questions.length) {
        return renderResult();
    }
    const { caption, img } = questions[qn];
    captionElement.textContent = caption;
    promptElement.setAttribute('src', img);
    forward.classList.add('hidden');
    removeTarget();
    conclusion.classList.remove('good', 'ok', 'bad');
}

function renderResult() {
    const resBlock = document.querySelector('.result');
    const heading = resBlock.querySelector('.heading');
    const points = resBlock.querySelector('.points');
    const lettersElement = resBlock.querySelector('.letters');
    let gotLetters = [];

    if (correct < 6) {
        heading.textContent = 'Географ глобус пропил :)';
        points.textContent = `Ето ${correct}. Берите все, не плачьте`
        lettersElement.textContent = `${letters.join(', ')} (не запоминать можьно)`;
        gotLetters = letters;
    } else if (correct < 10) {
        heading.textContent = 'Для таких в аэропорте Вены есть надписаь "Это Австрия, а не Австралия"';
        points.textContent = `${correct} — получаете букву`
        lettersElement.textContent = `${letters[0]} (не запоминать можьно)`;
        gotLetters = [letters[0]];
    } else if (correct < 14) {
        heading.textContent = 'Вы как папец без карты!';
        points.textContent = `${correct} — даю две буквы`
        lettersElement.textContent = `${letters[0]}, ${letters[1]} (не запоминать можьно)`;
        gotLetters = [letters[0], letters[1]];
    } else {
        heading.textContent = 'Вы — папец с картой, поздравляю!';
        points.textContent = `Получаете все буквы!`
        lettersElement.textContent = `${letters.join(', ')} (не запоминать можьно)`;
        gotLetters = letters;
    }

    document.querySelector('.quiz').classList.add('hidden');
    resBlock.classList.remove('hidden');
    localStorage.setItem('letters', [...new Set([...ownedLetters, ...gotLetters])]);
}