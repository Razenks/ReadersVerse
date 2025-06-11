import logo2 from '../assets/logo2.png';
import { ArrowLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sign_up_user() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confEmail, setConfEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const HandleSubmit = async () => {
        if (email != confEmail) {
            setMessage("Emails are not the same");
            return;
        }
        if (password != confPassword) {
            setMessage("Passwords are not the same");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                setMessage(data.message || 'Failed to register.');
                return;
            } else {
                navigate('/code', { state: { email } });
            }

            setMessage(data.message);
        } catch (error) {
            console.error(error);
            setMessage('Conection Failed')
        }
    };

    return (
        <main className='flex flex-col justify-center items-center mt-[2%]'>
            <Link to="/sign-in" className="absolute left-4 top-4 md:left-[35%] md:top-[10%] top-[20%]">
                <ArrowLeft className="text-blue-700 hover:text-blue-900 cursor-pointer" />
            </Link>
            <div>
                <img src={logo2} alt="" className='w-[150px]' />
            </div>
            <h1 className='mt-2 md:mt-10 text-2xl'>SIGN UP</h1>
            <div>

                <div className='flex flex-col'>
                    <label htmlFor="Name" className='text-xl mt-3 '>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name Here' className='w-[250px] border border-[rgb(145,145,145)] rounded-lg p-1' />

                    <label htmlFor="Email" className='text-xl mt-3 '>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@example.com' className='w-[250px] border border-[rgb(145,145,145)] rounded-lg p-1' />

                    <label htmlFor="Conf-email" className='text-xl mt-3 '>Confirm Email:</label>
                    <input type="email" value={confEmail} onChange={(e) => setConfEmail(e.target.value)} placeholder='example@example.com' className='w-[250px] border border-[rgb(145,145,145)] rounded-lg p-1' />

                    <label htmlFor="Password" className='text-xl mt-3'>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='********' className='w-[250px] border border-[rgb(145,145,145)] rounded-lg p-1' />

                    <label htmlFor="Conf-password" className='text-xl mt-3'>Confirm Password:</label>
                    <input type="password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} placeholder='********' className='w-[250px] border border-[rgb(145,145,145)] rounded-lg p-1' />

                    <button onClick={HandleSubmit} className='mt-5 md:mt-10 bg-blue-600 text-white font-bold h-12 w-[250px] rounded-md hover:bg-blue-800'>SIGN UP</button>

                    {message && <p className='mt-4 text-center text-red-600'>{message}</p>}
                </div>
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