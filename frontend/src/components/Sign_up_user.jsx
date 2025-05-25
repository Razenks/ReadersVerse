import logo2 from '../assets/logo2.png';
import { ArrowLeft } from 'react-feather';
import { Link } from 'react-router-dom';

function Sign_up_user() {
    return (
        <main className='flex flex-col justify-center items-center mt-[2%]'>
            <Link to="/sign-in" className="absolute left-4 top-4 md:left-[35%] md:top-[10%]">
                <ArrowLeft className="text-blue-700 hover:text-blue-900 cursor-pointer" />
            </Link>
            <div>
                <img src={logo2} alt="" className='w-[150px]' />
            </div>
            <h1 className='mt-5 md:mt-10 text-2xl'>SIGN UP</h1>
            <div>

                <form action="" className='flex flex-col'>
                    <label htmlFor="Email" className='text-xl mt-5 '>Email:</label>
                    <input type="email" placeholder='example@example.com' className='w-[250px] border border-black-700 rounded-md p-1' />

                    <label htmlFor="Conf-email" className='text-xl mt-5 '>Confirm Email:</label>
                    <input type="email" placeholder='example@example.com' className='w-[250px] border border-black-700 rounded-md p-1' />

                    <label htmlFor="Password" className='text-xl mt-5'>Password:</label>
                    <input type="password" placeholder='********' className='w-[250px] border border-black-700 rounded-md p-1' />

                    <label htmlFor="Conf-password" className='text-xl mt-5'>Confirm Password:</label>
                    <input type="password" placeholder='********' className='w-[250px] border border-black-700 rounded-md p-1' />

                    <button type='' className='mt-5 md:mt-10 bg-blue-600 text-white font-bold h-12 w-[250px] rounded-md hover:bg-blue-800'><Link to="/code">SIGN UP</Link></button>
                </form>
                <div className='flex flex-row justify-center text-center mt-4 md:mt-8'>
                    <Link to="/terms">
                        <p className='text-blue-700 mr-2'>Terms Service</p>
                    </Link>
                    <p>|</p>
                    <Link to="/privacy-policy">
                        <p className='ml-2 text-blue-700'>Privacy Policy</p>
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default Sign_up_user;