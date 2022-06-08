export function showMenu() {
    const hamburgerEl = document.querySelector('.hamburger');
    const navMenuEl = document.querySelector('.navMenu');
    const closeNavEl = document.querySelector('.close');
    const logoEl = document.querySelector('.logo');
    const fakeEl = document.querySelector('.fake');

    //legger inn block og hiddenLogo for att fjerne de på baksidan av menyen
    hamburgerEl.addEventListener('click', () => {
        navMenuEl.classList.toggle('hiddenMenu');
        logoEl.classList.toggle('hiddenLogo');
        fakeEl.classList.toggle('block');
    });
    closeNavEl.addEventListener('click', () => {
        navMenuEl.classList.toggle('hiddenMenu');
        logoEl.classList.toggle('hiddenLogo');
        fakeEl.classList.toggle('block');
    });
        
};