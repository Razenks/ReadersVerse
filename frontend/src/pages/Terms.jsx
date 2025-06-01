import Terms_service from '../components/Terms_service';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
    return (
        <>
            <Header />
            <main className="main bg-[#f7f7f7]" id="main" >
                <Terms_service />
            </main>
            <Footer />
        </>
    );
}