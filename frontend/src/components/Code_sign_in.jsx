import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Code_sign_in() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth();

    const handleVerifyLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/verifyCodeLogin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || 'Failed to Verify');
                return;
            }

            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
                login(data.user);
                console.log('✅ sucessful login', data);
                navigate('/');
            } else {
                setMessage('User not found');
            }
        } catch (error) {
            console.error(error);
            setMessage('Connection Failed')
        }
    };

    if (!email) {
        return <p className='text-red-600 text-center mt-10'>Email not found. Sign up Again</p>;
    }

    return (
        <main className="flex justify-center items-center">
            <div className="md:w-[500px] md:h-auto bg-[Silver] rounded-md justify-center items-center mt-10 p-10">
                <h1 className="text-white text-center text-3xl font-bold">ENTER CODE</h1>
                <p className='mb-3 text-center '>Enter the code that was sent to <strong>{email}</strong></p>
                <div className="text-center items-center">
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="text-center justify-center text-xl mt-10 rounded-md w-[250px] h-[30px]" />
                </div>
                <div className="items-center justify-center text-center mt-7">
                    <button onClick={handleVerifyLogin} className="bg-blue-600 text-white font-bold w-[150px] h-[45px] rounded-md">SEND</button>
                </div>

                {message && <p className='mt-4 text-red-600 text-center mt-5 font-bold'>{message}</p>}
            </div>
        </main>
    );
}

export default Code_sign_in;