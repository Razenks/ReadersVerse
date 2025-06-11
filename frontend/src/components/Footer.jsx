import logo2 from '../assets/Logo2.png';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer id="footer" className=" shadow-md mt-6 h-[300px] w-full ">
            <div className="flex flex-col lg:flex-row items-center justify-evenly py-4 mt-12">
                <div className="flex flex-col items-center mb-4">
                    <Link to="/">
                            <img src={logo2} alt="Logo" className="md:w-[110px] h-[100px] lg:mt-14"/>
                    </Link>
                    <span className="">@2025 Readersverse.com</span>
                </div>
                <div className="flex flex-row justify-evenly items-center w-full max-w-4xl mt-5">
                    <div className="flex flex-col items-left ">
                        <h1 className="font-bold">Novels</h1>
                        <Link to="/">
                            <span className=' max-w-[16ch] whitespace-nowrap overflow-hidden text-ellipsis'>Pirates: Building a Pirate Family.</span>
                        </Link>
                        <Link to="/">
                            <span className=' max-w-[16ch] whitespace-nowrap overflow-hidden text-ellipsis'>Pirates: Building a Pirate Family.</span>
                        </Link>
                        <Link to="/">
                            <span className=' max-w-[16ch] whitespace-nowrap overflow-hidden text-ellipsis'>Pirates: Building a Pirate Family.</span>
                        </Link>
                        <Link to="/">
                            <span className=' max-w-[16ch] whitespace-nowrap overflow-hidden text-ellipsis'>Pirates: Building a Pirate Family.</span>
                        </Link>
                    </div>
                    <div className="flex flex-col items-left">
                        <h1 className="font-bold">Genres</h1>
                        <Link to="/">
                            <span>Action</span>
                        </Link>
                        <Link to="/">
                            <span>Romance</span>
                        </Link>
                        <Link to="/">
                            <span>Fan-Fiction</span>
                        </Link>
                        <Link to="/">
                            <span>Terror</span>
                        </Link>
                    </div>
                    <div className="flex flex-col items-left">
                        <h1 className="font-bold">Terms and Policies</h1>
                        <Link to="/terms">
                            <span>Terms of Service</span>
                        </Link>
                        <Link to="/privacy-policy">
                            <span>Privacy Policy</span>
                        </Link>
                        <Link to="/dmca">
                            <span>DMCA</span>
                        </Link>
                        <Link to="/contact">
                            <span>Contact Us</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;