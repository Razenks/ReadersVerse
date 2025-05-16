document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('mobileSidebar');
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const overlay = document.getElementById('overlay');

    menuToggle.addEventListener('click', function () {
        sidebar.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        feather.replace();
    });

    function closeMenu() {
        sidebar.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        feather.replace();
    }

    closeSidebar.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu); // Fecha ao clicar fora
});
