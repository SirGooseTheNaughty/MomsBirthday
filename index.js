const gletters = 'ვი ფუფ ჩისფო კოწკრეფწო'.split('');

document.querySelector('.btn-1').addEventListener('click', () => document.querySelector('.stoprightthere').classList.remove('hidden'));
document.querySelector('.btn-2').addEventListener('click', () => {
    document.querySelector('.password').classList.remove('hidden');
    setTimeout(() => {
        document.querySelector('.wow .first').classList.remove('hidden');
    }, 2000);
    setTimeout(() => {
        document.querySelector('.wow .second').classList.remove('hidden');
    }, 3000);
});
document.querySelector('.btn-3').addEventListener('click', () => document.querySelector('.explanation').classList.remove('hidden'));
document.querySelector('.btn-4').addEventListener('click', () => document.querySelector('.quest').classList.remove('hidden'));