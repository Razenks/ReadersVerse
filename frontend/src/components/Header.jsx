import logo from '../assets/logo2.png';
import { Search, Grid, Tag, RefreshCw, Menu, X, Moon, Sun } from 'react-feather';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <header id="header" className="flex items-center justify-between px-4 py-4 bg-white shadow-md relative w-full">
            {/* <!-- Logo à esquerda --> */}
            <Link to="/">
                <div className="flex items-center flex-shrink-0 md:ml-[60px]">
                    <img src={logo} alt="Logo" className="md:w-[95px] md:h-[80px] h-14" />
                </div>
            </Link>

            {/* <!-- Menu centralizado (oculto em telas pequenas) --> */}
            <nav id="menu" className="hidden md:flex flex-grow justify-center space-x-5 text-sm">
                <Link to="#" className="flex items-center space-x-1 hover:text-blue-600">
                    <Search className="w-4 h-4" />
                    <input type="text" placeholder="Search"
                        className="border border-gray-500 rounded-md px-2 py-1 text-sm w-40" />
                </Link>
                <Link to="/categories" className="flex items-center space-x-1 hover:text-blue-600">
                    <Grid className="w-4 h-4" /><span>Categories</span>
                </Link>
                <Link to="#" className="flex items-center space-x-1 hover:text-blue-600">
                    <Tag className="w-4 h-4" /><span>Tags</span>
                </Link>
                <Link to="#" className="flex items-center space-x-1 hover:text-blue-600">
                    <RefreshCw className="w-4 h-4" /><span>Updates</span>
                </Link>
                <button id="theme-desktop" className="toggle-theme border border-gray-500 rounded px-1 py-1 hover:bg-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg w-5 h-5 text-black" fill="currentColor"
                        viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                    <Sun className="hidden w-5 h-5" id="sun" />
                </button>
            </nav>

            {/* <!-- Botão SIGN IN à direita --> */}
            <div className="flex items-center space-x-2 md:mr-[40px]">
                {/* <!-- Menu hamburger (mobile only) --> */}
                <button className="md:hidden" id="menuToggle">
                    <Menu className="w-8 h-8 text-gray-500" />
                </button>

                {/* <!-- Sign In (desktop only) --> */}
                <Link to="/sign-in"
                    className="hidden md:flex bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 items-center space-x-1">
                    <span>SIGN IN</span>
                </Link>
            </div>

            <div id="overlay" className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 hidden"></div>



            {/* <!-- Sidebar Mobile --> */}
            <div id="mobileSidebar"
                className="fixed top-0 right-0 h-full w-60 bg-white shadow-lg z-50 p-4 transform translate-x-full transition-transform duration-300 md:hidden">
                <div className="flex justify-end mb-4">
                    <button id="closeSidebar">
                        <X className="w-6 h-6 text-gray-500 justify-end" />
                    </button>
                </div>

                <nav id="menu-mobile" className="flex flex-col space-y-4 text-sm">
                    <span className="text-sm font-semibold">Enjoy your Web-Novels here!!!</span>
                    <Link to="#" className="flex items-center space-x-2 hover:text-blue-600">
                        <Search className="w-4 h-4" /><span>Search</span>
                    </Link>
                    <Link to="#" className="flex items-center space-x-2 hover:text-blue-600">
                        <Grid className="w-4 h-4" /><span>Categories</span>
                    </Link>
                    <Link to="#" className="flex items-center space-x-2 hover:text-blue-600">
                        <Tag className="w-4 h-4" /><span>Tags</span>
                    </Link>
                    <Link to="#" className="flex items-center space-x-2 hover:text-blue-600">
                        <RefreshCw className="w-4 h-4" /><span>Updates</span>
                    </Link>
                    <button id="theme-desktop" className="toggle-theme flex items-center hover:text-blue-600">
                        <Moon className="svg w-4 h-4" />
                        <span id="span-dark" className="ml-2">Dark Mode</span>
                        <Sun className="hidden w-4 h-4 [margin-left: 0px]" id="sun" />
                        <span className="hidden ml-2" id="span-light">Light Mode</span>
                    </button>
                    <Link to="/login"
                        className="flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
                        <span>SIGN IN</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;