import logo2 from '../assets/Logo2.png';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer id="footer" className="bg-white shadow-md mt-6 h-[300px] w-full ">
            <div className="flex flex-col lg:flex-row items-center justify-evenly py-4 mt-12">
                <div className="flex flex-col items-center mb-4">
                    <Link to="/">
                            <img src={logo2} alt="Logo" className="md:w-[110px] h-[100px] lg:mt-14"/>
                    </Link>
                    <p className="">@2025 Readersverse.com</p>
                </div>
                <div className="flex flex-row justify-evenly items-center w-full max-w-4xl mt-5">
                    <div className="flex flex-col items-left ">
                        <h1 className="font-bold">Novels</h1>
                        <Link to="/terms">
                            <p className=' max-w-[16ch] whitespace-nowrap overflow-hidden text-ellipsis'>Pirates: Building a Pirate Family.</p>
                        </Link>
                        <Link to="/terms">
                            <p className=' max-w-[16ch] whitespace-nowrap overflow-hidden text-ellipsis'>Pirates: Building a Pirate Family.</p>
                        </Link>
                        <Link to="/terms">
                            <p className=' max-w-[16ch] whitespace-nowrap overflow-hidden text-ellipsis'>Pirates: Building a Pirate Family.</p>
                        </Link>
                        <Link to="/terms">
                            <p className=' max-w-[16ch] whitespace-nowrap overflow-hidden text-ellipsis'>Pirates: Building a Pirate Family.</p>
                        </Link>
                    </div>
                    <div className="flex flex-col items-left">
                        <h1 className="font-bold">Genres</h1>
                        <Link to="/terms">
                            <p>Action</p>
                        </Link>
                        <Link to="/terms">
                            <p>Romance</p>
                        </Link>
                        <Link to="/terms">
                            <p>Fan-Fiction</p>
                        </Link>
                        <Link to="/terms">
                            <p>Terror</p>
                        </Link>
                    </div>
                    <div className="flex flex-col items-left">
                        <h1 className="font-bold">Terms and Policies</h1>
                        <Link to="/terms">
                            <p>Terms of Service</p>
                        </Link>
                        <Link to="/privacy-policy">
                            <p>Privacy Policy</p>
                        </Link>
                        <Link to="/dmca">
                            <p>DMCA</p>
                        </Link>
                        <Link to="/contact">
                            <p>Contact Us</p>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;