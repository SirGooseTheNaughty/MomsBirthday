localStorage.setItem('letters', '');

const gletters = 'ვი ფუფ ჩისფო კოწკრეფწო'.split('');

document.querySelector('.btn-1').addEventListener('click', () => {
    document.querySelector('.congrats').classList.add('hidden');
    document.querySelector('.stoprightthere').classList.remove('hidden');
});
document.querySelector('.btn-2').addEventListener('click', () => {
    document.querySelector('.stoprightthere').classList.add('hidden');
    document.querySelector('.password').classList.remove('hidden');
    setTimeout(() => {
        document.querySelector('.btn-3').classList.remove('hidden');
    }, 3000);
    setTimeout(() => {
        document.querySelector('.btn-3').classList.add('loh');
    }, 3500);
    setTimeout(() => {
        document.querySelector('.btn-3').classList.add('wat');
    }, 4000);
});
document.querySelector('.btn-3').addEventListener('click', () => {
    document.querySelector('.password').classList.add('hidden');
    document.querySelector('.explanation').classList.remove('hidden');
});
document.querySelector('.btn-4').addEventListener('click', () => {
    document.querySelector('.explanation').classList.add('hidden');
    document.querySelector('.quest').classList.remove('hidden');
});