<header id="header" class="flex items-center justify-between px-4 py-4 bg-white shadow-md relative">
        <!-- Logo à esquerda -->
        <a href="/">
            <div class="flex items-center flex-shrink-0 md:ml-[60px]">
                <img src="./assets/logo2.png" alt="Logo" class="md:w-[95px] md:h-[80px] h-14">
            </div>
        </a>

        <!-- Menu centralizado (oculto em telas pequenas) -->
        <nav id="menu" class="hidden md:flex flex-grow justify-center space-x-5 text-sm">
            <a href="#" class="flex items-center space-x-1 hover:text-blue-600">
                <i data-feather="search" class="w-4 h-4"></i>
                <input type="text" placeholder="Search"
                    class="border border-gray-500 rounded-md px-2 py-1 text-sm w-40">
            </a>
            <a href="#" class="flex items-center space-x-1 hover:text-blue-600">
                <i data-feather="grid" class="w-4 h-4"></i><span>Categories</span>
            </a>
            <a href="#" class="flex items-center space-x-1 hover:text-blue-600">
                <i data-feather="tag" class="w-4 h-4"></i><span>Tags</span>
            </a>
            <a href="#" class="flex items-center space-x-1 hover:text-blue-600">
                <i data-feather="refresh-cw" class="w-4 h-4"></i><span>Updates</span>
            </a>
            <button id="theme-desktop" class="toggle-theme border border-gray-500 rounded px-1 py-1 hover:bg-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="svg w-5 h-5 text-black" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                <i data-feather="sun" class="hidden w-5 h-5" id="sun"></i>
            </button>
        </nav>

        <!-- Botão SIGN IN à direita -->
        <div class="flex items-center space-x-2 md:mr-[40px]">
            <!-- Menu hamburger (mobile only) -->
            <button class="md:hidden" id="menuToggle">
                <i data-feather="menu" class="w-8 h-8 text-gray-500"></i>
            </button>

            <!-- Sign In (desktop only) -->
            <a href="/login"
                class="hidden md:flex bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 items-center space-x-1">
                <i data-feather="log-in" class="w-4 h-4"></i>
                <span>SIGN IN</span>
            </a>
        </div>

        <div id="overlay" class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 hidden"></div>



        <!-- Sidebar Mobile -->
        <div id="mobileSidebar"
            class="fixed top-0 right-0 h-full w-60 bg-white shadow-lg z-50 p-4 transform translate-x-full transition-transform duration-300 md:hidden">
            <div class="flex justify-end mb-4">
                <button id="closeSidebar">
                    <i data-feather="x" class="w-6 h-6 text-gray-500 justify-end"></i>
                </button>
            </div>

            <nav id="menu-mobile" class="flex flex-col space-y-4 text-sm">
                <span class="text-sm font-semibold">Enjoy your Web-Novels here!!!</span>
                <a href="#" class="flex items-center space-x-2 hover:text-blue-600">
                    <i data-feather="search" class="w-4 h-4"></i><span>Search</span>
                </a>
                <a href="#" class="flex items-center space-x-2 hover:text-blue-600">
                    <i data-feather="grid" class="w-4 h-4"></i><span>Categories</span>
                </a>
                <a href="#" class="flex items-center space-x-2 hover:text-blue-600">
                    <i data-feather="tag" class="w-4 h-4"></i><span>Tags</span>
                </a>
                <a href="#" class="flex items-center space-x-2 hover:text-blue-600">
                    <i data-feather="refresh-cw" class="w-4 h-4"></i><span>Updates</span>
                </a>
                <button id="theme-desktop" class="toggle-theme flex items-center hover:text-blue-600">
                    <i data-feather="moon" class="svg w-4 h-4"></i>
                    <span id="span-dark" class="ml-2">Dark Mode</span>
                    <i data-feather="sun" class="hidden w-4 h-4 [margin-left: 0px]" id="sun"></i>
                    <span class="hidden ml-2" id="span-light">Light Mode</span>
                </button>
                <a href="/login"
                    class="flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
                    <i data-feather="log-in" class="w-4 h-4 mr-1"></i> <span>SIGN IN</span>
                </a>
            </nav>
        </div>
    </header>