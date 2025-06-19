import logo2 from '../assets/logo2.png';
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sign_in_user() { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messageUser, setMessageUser] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;

    const HandleSubmit = async() => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email : email,
                    password : password
                })
            });
            const data = await response.json();
            console.log(data);

            if(!response.ok) {
                setMessageUser(data.message || 'Failed to Sign In')
                return;
            } else {
                navigate('/code-in', { state:  { email }});
            }

            setMessageUser(data.message);

        } catch (error) {
            console.log(error);
            setMessageUser('Connection Failed')
        }
    };
    
    return (
        <main className='flex flex-col justify-center items-center mt-[6%]'>
            <div>
                <img src={logo2} alt="" className='w-[150px]' />
            </div>
            <h1 className='mt-10 text-2xl mb-2'>SIGN IN</h1>
            {message && <p className='bg-[green] text-white font-bold text-xl mt-2 p-2 rounded-md'>{message}</p>}
            <div>
                
                <div className='flex flex-col'>
                    <label htmlFor="Email" className='text-xl mt-5 '>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@example.com' className='w-[250px] border border-black-700 rounded-md p-1'/>

                    <label htmlFor="Password" className='text-xl mt-5'>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='********' className='w-[250px] border border-black-700 rounded-md p-1'/>

                    <Link to="/sign-up" className='mt-5 items-center text-center'>
                    <p className='text-blue-700'>Don't Have an account? <br />Sign up HERE!</p>
                    </Link>

                    <button onClick={HandleSubmit} className='mt-14 bg-blue-600 text-white font-bold h-12 w-[250px] rounded-md hover:bg-blue-800'>SIGN IN</button>
                </div>
                <div className='flex flex-row justify-center text-center mt-8'>
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

export default Sign_in_user;