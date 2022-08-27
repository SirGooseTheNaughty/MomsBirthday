const letters = [
    'в - ვ',
    'о - ო',
    'р - რ',
];
let correct = 0;

const mapBtns = [
    {
        btnSelector: '.btn-3',
        blockSelector: '.q2',
    },
    {
        btnSelector: '.btn-4',
        blockSelector: '.q3',
    },
    {
        btnSelector: '.btn-5',
        blockSelector: '.q4',
    },
    {
        btnSelector: '.btn-6',
        blockSelector: '.q5',
    },
    {
        btnSelector: '.btn-7',
        blockSelector: '.q6',
    },
    {
        btnSelector: '.btn-8',
        blockSelector: '.q7',
    },
];

document.querySelector('.btn-1').addEventListener('click', () => document.querySelector('.description').classList.remove('hidden'));
document.querySelector('.btn-2').addEventListener('click', () => document.querySelector('.q1').classList.remove('hidden'));

mapBtns.forEach(({ btnSelector, blockSelector }) => {
    document.querySelectorAll(btnSelector).forEach(btn => {
        const block = document.querySelector(blockSelector);
        btn.addEventListener('click', function () {
            if (this.classList.contains('right')) {
                block.querySelector('h2.right').classList.remove('hidden');
                block.querySelector('h2.wrong').classList.add('hidden');
                correct += 1;
            }
            block.classList.remove('hidden');
            btn.classList.add('disabled');
        });
    });
});

document.querySelector('.btn-9').addEventListener('click', () => {
    const resBlock = document.querySelector('.result');
    const heading = resBlock.querySelector('h2');
    const points = resBlock.querySelector('.points');
    const lettersElement = resBlock.querySelector('.letters');

    if (correct === 0) {
        heading.textContent = 'Шок';
        points.textContent = '0 баллов, это как вообще... Я дам вам все буквы, не мучайтесь'
        lettersElement.textContent = `${letters.join(', ')} (не запоминать можьно)`;
    } if (correct < 3) {
        heading.textContent = 'Мдааааааааааааааа';
        points.textContent = `Аж целых ${correct} балла... Я дам вам одну буковку.`
        lettersElement.textContent = `${letters[0]} (не запоминать можьно)`;
    } else if (correct < 5) {
        heading.textContent = 'Сойдет, но вы могли лучше!';
        points.textContent = `За ${correct} баллов вы получите две буковки. Это немного, но это честная работа`
        lettersElement.textContent = `${letters[0]}, ${letters[1]} (не запоминать можьно)`;
    } else {
        heading.textContent = 'ЯУШОКЕ';
        points.textContent = `За особые достижения в получении ${correct} баллов вы получите ТРИ буковки!!!`
        lettersElement.textContent = `${letters.join(', ')} (не запоминать можьно)`;
    }

    resBlock.classList.remove('hidden');
});