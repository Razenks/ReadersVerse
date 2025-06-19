import logo from '../assets/logo2.png';
import { Search, Grid, Tag, RefreshCw, Menu, X, Moon, Sun, Bookmark, Book, Archive, Plus } from 'react-feather';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../index.css';

function Header() {
    const { user, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const toggleSidebar = () => setMobileOpen(prev => !prev);
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    }

    return (
        <header className="flex items-center bg-white justify-between px-4 py-4 shadow-md w-full text-gray-800 ">
            <Link to="/">
                <div className="flex items-center flex-shrink-0 md:ml-[60px]">
                    <img src={logo} alt="Logo" className="md:w-[95px] md:h-[80px] h-14" />
                </div>
            </Link>

            <nav className="hidden md:flex flex-grow justify-center space-x-5 text-sm">
                <form onSubmit={handleSearch} className="flex items-center space-x-1">
                    <Search className="w-4 h-4" onClick={handleSearch} />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-500 rounded-md px-2 py-1 text-sm w-40"
                    />
                </form>
                <Link to="/categories" className="flex items-center space-x-1">
                    <Grid className="w-4 h-4" /><span>Categories</span>
                </Link>
                <Link to="/tags" className="flex items-center space-x-1">
                    <Tag className="w-4 h-4" /><span>Tags</span>
                </Link>
                <Link to="/NovelsUpdated" className="flex items-center space-x-1">
                    <RefreshCw className="w-4 h-4" /><span>Updates</span>
                </Link>
                <button  className="border border-gray-500 rounded px-1 py-1">
                    <Sun className="w-5 h-5 text-yellow-500 hidden" /> <Moon className="w-5 h-5 text-black" />
                </button>
            </nav>

            <div className="flex items-center space-x-2 md:mr-[40px]">
                <button onClick={toggleSidebar}>
                    <Menu className="w-8 h-8" />
                </button>
            </div>

            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm z-40"
                    onClick={toggleSidebar}
                />
            )}

            <div className={`fixed top-0 right-0 h-full w-60 md:w-[30%] bg-white text-gray-800 font-bold shadow-lg z-50 p-4 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-end mb-4">
                    <button onClick={toggleSidebar}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex flex-col space-y-4 text-sm">
                    <span className="text-sm font-semibold">Enjoy your Web-Novels here!!!</span>
                    {user && <span className="font-bold">Hello, {user.name}</span>}
                    <form onSubmit={handleSearch} className="flex items-center space-x-2 md:hidden">
                        <Search className="w-4 h-4" /><span>Search</span>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-500 rounded-md px-2 py-1 text-sm w-[95px]"
                        />
                    </form>
                    <Link to="#" className="flex items-center space-x-2">
                        <Book className="w-4 h-4" /><span>Library</span>
                    </Link>
                    <Link to="/categories" className="flex items-center space-x-2 md:hidden">
                        <Grid className="w-4 h-4" /><span>Categories</span>
                    </Link>
                    <Link to="#" className="flex items-center space-x-2">
                        <Bookmark className="w-4 h-4" /><span>Favorites</span>
                    </Link>
                    <Link to="/tags" className="flex items-center space-x-2  ">
                        <Tag className="w-4 h-4" /><span>Tags</span>
                    </Link>
                    <Link to="/NovelsUpdated" className="flex items-center space-x-2 md:hidden">
                        <RefreshCw className="w-4 h-4" /><span>Updates</span>
                    </Link>
                    <Link to="#" className="flex items-center space-x-2">
                        <Archive className="w-4 h-4" /><span>History</span>
                    </Link>
                    <div>
                        {user?.user_type === 'admin' && (
                            <Link to="/add_novels" className='flex items-center space-x-2'>
                                <Plus className="w-4 h-4" /><span>Add novels</span>
                            </Link>
                        )}
                    </div>
                    <button  className="flex items-center md:hidden">
                        <Sun className="w-4 h-4 hidden" />  <Moon className="w-4 h-4" />
                        <span className="ml-2">Dark Mode</span>
                    </button>

                    {user ? (
                        <button
                            className="flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 w-full"
                            onClick={handleLogout}
                        >
                            <span className="font-bold">LOGOUT</span>
                        </button>
                    ) : (
                        <Link
                            to="/sign-in"
                            className="flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                        >
                            <span>SIGN IN</span>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
