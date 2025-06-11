import Dmca_terms from '../components/Dmca_terms';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Dmca() {
    return (
        <>
            <Header />
            <main className="main bg-[#f7f7f7]" id="main" >
                <Dmca_terms />
            </main>
            <Footer />
        </>
    )
}