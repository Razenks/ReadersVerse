import Header from '../components/Header';
import Footer from '../components/Footer'
import Categories_user from '../components/Categories_user';

export default function Categories() {
    return (
        <>
            <Header />
            <main className="main bg-[#f7f7f7]" id="main" >
                <Categories_user />
            </main>
            <Footer />
        </>
    );
}