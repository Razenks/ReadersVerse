import Header from '../components/Header';
import Privacy_policy from '../components/Privacy_policy';
import Footer from '../components/Footer';

export default function Privacy() {
    return (
        <>
            <Header />
            <main className="main bg-[#f7f7f7]" id="main" >
                <Privacy_policy />
            </main>
            <Footer />
        </>
    );
}