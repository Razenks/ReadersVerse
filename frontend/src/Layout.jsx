import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <Outlet /> 
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
