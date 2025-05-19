document.addEventListener('DOMContentLoaded', function () {
    const body = document.getElementById('body');
    const header = document.getElementById('header');
    const main = document.getElementById('main');
    const menu_mobile = document.getElementById('mobileSidebar');
    const footer = document.getElementById('footer');
    const color_text = document.querySelector('.color-text');

    const themeButtons = document.querySelectorAll('.toggle-theme');
    const moons = document.querySelectorAll('.svg'); // ícones de lua
    const suns = document.querySelectorAll('#sun'); // ícones de sol
    const text_dark = document.querySelectorAll('#span-dark');
    const text_light = document.querySelectorAll('#span-light');

    function enableDarkMode() {
        body.classList.remove('bg-[#f7f7f7]');
        body.classList.add('bg-[#1a1a1a]', 'text-white');

        header.classList.remove('bg-white');
        header.classList.add('bg-[#1f1f1f]', 'text-white');

        main.classList.remove('bg-[#f7f7f7]');
        main.classList.add('bg-[#1a1a1a]', 'text-white');

        menu_mobile.classList.remove('bg-[#f7f7f7]');
        menu_mobile.classList.add('bg-[#1a1a1a]', 'text-white');

        footer.classList.remove('bg-white');
        footer.classList.add('bg-[#1f1f1f]', 'text-white');

        moons.forEach(icon => icon.classList.add('hidden'));
        suns.forEach(icon => icon.classList.remove('hidden'));
        text_dark.forEach(span => span.classList.add('hidden'));
        text_light.forEach(span => span.classList.remove('hidden'));
        body.style.overflowX = 'hidden';


        feather.replace();
        localStorage.setItem('theme', 'dark');
    }

    function enableLightMode() {
        body.classList.remove('bg-[#1a1a1a]', 'text-white');
        body.classList.add('bg-[#f7f7f7]');

        header.classList.remove('bg-[#1f1f1f]', 'text-white');
        header.classList.add('bg-white', 'text-gray-700');

        main.classList.remove('bg-[#1a1a1a]', 'text-white');
        main.classList.add('bg-[#f7f7f7]');

        menu_mobile.classList.remove('bg-[#1a1a1a]', 'text-white');
        menu_mobile.classList.add('bg-[#f7f7f7]', 'text-gray-700');

        footer.classList.add('bg-white');
        footer.classList.remove('bg-[#1f1f1f]', 'text-white');


        moons.forEach(icon => icon.classList.remove('hidden'));
        suns.forEach(icon => icon.classList.add('hidden'));
        text_dark.forEach(span => span.classList.remove('hidden'));
        text_light.forEach(span => span.classList.add('hidden'));
        body.style.overflowX = 'hidden';

        feather.replace();
        localStorage.setItem('theme', 'light');
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        enableLightMode();
    }

    themeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const isDark = body.classList.contains('bg-[#1a1a1a]');
            if (isDark) {
                enableLightMode();
            } else {
                enableDarkMode();
            }
        });
    });
});