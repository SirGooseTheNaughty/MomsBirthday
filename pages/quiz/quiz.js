const letters = [
    'ვ - в',
    'ო - о',
    'რ - р',
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
const questions = document.querySelectorAll('.question');
let qn = 0;

questions.forEach(qb => {
    const res = {
        right: qb.querySelector('.res.right'),
        wrong: qb.querySelector('.res.wrong'),
    };
    const btns = qb.querySelectorAll('button.answer');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('right')) {
                res.right.classList.remove('hidden');
                btn.classList.add('colored-right');
                correct += 1;
            } else {
                res.wrong.classList.remove('hidden');
                btn.classList.add('colored-wrong');
                qb.querySelector('button.answer.right').classList.add('colored-right');
            }
            btns.forEach(btn => btn.classList.add('blocked'));
        });
    })
});

document.querySelectorAll('button.next').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        qn += 1;
        questions[qn].classList.remove('hidden');
    });
});

document.querySelector('.btn-1').addEventListener('click', () => document.querySelector('.description').classList.remove('hidden'));
document.querySelector('.btn-2').addEventListener('click', () => document.querySelector('.q1').classList.remove('hidden'));

// mapBtns.forEach(({ btnSelector, blockSelector }) => {
//     document.querySelectorAll(btnSelector).forEach(btn => {
//         const block = document.querySelector(blockSelector);
//         btn.addEventListener('click', function () {
//             if (this.classList.contains('right')) {
//                 block.querySelector('h2.right').classList.remove('hidden');
//                 block.querySelector('h2.wrong').classList.add('hidden');
//                 correct += 1;
//             }
//             block.classList.remove('hidden');
//             btn.classList.add('disabled');
//         });
//     });
// });

const handleRes = () => {
    const resBlock = document.querySelector('.result');
    const heading = resBlock.querySelector('.heading');
    const points = resBlock.querySelector('.points');
    const lettersElement = resBlock.querySelector('.letters');

    if (correct === 0) {
        heading.textContent = 'Шок';
        points.textContent = '0 баллов, это как вообще... Я дам вам все буквы, не мучайтесь'
        lettersElement.textContent = `${letters.join(', ')} (не запоминать можьно)`;
        localStorage.setItem('letters', letters);
    } else if (correct < 3) {
        heading.textContent = 'Мдааааааааааааааа';
        points.textContent = `Аж целых ${correct}... Я дам вам одну буковку.`
        lettersElement.textContent = `${letters[0]} (не запоминать можьно)`;
        localStorage.setItem('letters', [letters[0]]);
    } else if (correct < 5) {
        heading.textContent = 'Сойдет, но вы могли лучше!';
        points.textContent = `За ${correct} вы получите две буковки. Это немного, но это честная работа`
        lettersElement.textContent = `${letters[0]}, ${letters[1]} (не запоминать можьно)`;
        localStorage.setItem('letters', [letters[0], letters[1]]);
    } else {
        heading.textContent = 'ЯУШОКЕ';
        points.textContent = `За особые достижения в получении ${correct} баллов вы получите ТРИ буковки!!!`
        lettersElement.textContent = `${letters.join(', ')} (не запоминать можьно)`;
        localStorage.setItem('letters', letters);
    }

    resBlock.classList.remove('hidden');
}

[...document.querySelectorAll('.btn-9')].forEach(btn => btn.addEventListener('click', handleRes));