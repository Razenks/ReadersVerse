import logo from '../assets/logo2.png';
import { Search, Grid, Tag, RefreshCw, Menu, X, Moon, Sun } from 'react-feather';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    // Função para abrir/fechar o sidebar
    const toggleSidebar = () => {
        setMobileOpen(prev => !prev);
    };



    return (
        <header className="flex items-center justify-between px-4 py-4 light:bg-white shadow-md relative w-full" id='header'>
            {/* Logo */}
            <Link to="/">
                <div className="flex items-center flex-shrink-0 md:ml-[60px]">
                    <img src={logo} alt="Logo" className="md:w-[95px] md:h-[80px] h-14" />
                </div>
            </Link>

            {/* Menu Desktop */}
            <nav className="hidden md:flex flex-grow justify-center space-x-5 text-sm">
                <Link to="#" className="flex items-center space-x-1 hover:text-blue-600">
                    <Search className="w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-500 rounded-md px-2 py-1 text-sm w-40"
                    />
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
                <button className="border border-gray-500 rounded px-1 py-1 hover:bg-gray-200">
                    <Moon className="w-5 h-5 text-black" />
                </button>
            </nav>

            {/* Menu Right */}
            <div className="flex items-center space-x-2 md:mr-[40px]">
                {/* Menu Hamburger (mobile) */}
                <button className="md:hidden" onClick={toggleSidebar}>
                    <Menu className="w-8 h-8 text-gray-500" />
                </button>

                {user ? (
                    <>
                        <span className="hidden md:flex px-4 py-2">Hello, {user.name}!</span>
                        <button onClick={handleLogout} className="hidden md:flex bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
                    </>
                ) : (
                    <Link to="/sign-in" className="hidden md:flex bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 items-center space-x-1">
                        <span>SIGN IN</span>
                    </Link>
                )}

            </div>

            {/* Overlay (fundo escurecido e fosco) */}
            {
                mobileOpen && (
                    <div
                        className="fixed inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm z-40"
                        onClick={toggleSidebar}
                    />
                )
            }

            {/* Sidebar Mobile */}
            <div
                className={`fixed top-0 right-0 h-full w-60 bg-white shadow-lg z-50 p-4 transform transition-transform duration-300 md:hidden ${mobileOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-end mb-4">
                    <button onClick={toggleSidebar}>
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <nav className="flex flex-col space-y-4 text-sm">
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
                    <button className="flex items-center hover:text-blue-600">
                        <Moon className="w-4 h-4" /><span className="ml-2">Dark Mode</span>
                    </button>

                    <Link
                        to="/sign-in"
                        className="flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                    >
                        <span>SIGN IN</span>
                    </Link>
                </nav>
            </div>
        </header >
    );
}

export default Header;
