import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';

function NewNovels() {
    const { user } = useAuth();
    const [novels, setNovels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { novelId } = useParams();

    useEffect(() => {
        fetch('http://localhost:8000/api/novels')
            .then(res => {
                if (!res.ok) throw new Error('Erro ao carregar novels');
                return res.json();
            })
            .then(data => {
                setNovels(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <span>Loading novels...</span>;
    if (error) return <span className="text-red-600">Erro: {error}</span>;

    return (
        <section className="pt-9 px-2 sm:px-6 lg:px-16 mt-6 md:ml-[20px] lg:pt-6 w-full">
            <div className="flex justify-between items-center pr-4">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">New Novels</h1>
                <div>
                    {user?.user_type === 'admin' && (
                        <Link to="/add_novels">
                            <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                                Add Novels
                            </button>
                        </Link>
                    )}
                    <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 ml-5">
                        See More
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-4 pt-4">
                {novels.map((novel) => (
                    <Link to={`/novel/${novel.id}`} key={novel.id} className="block">
                        <div className="flex flex-col items-center lg:w-[153px] transition cursor-pointer">
                            <div className="relative w-full rounded-sm shadow-md overflow-hidden">
                                <img
                                    src={
                                        novel.cover_path
                                            ? `http://localhost:8000/storage/${novel.cover_path}`
                                            : '/default-cover.jpeg'
                                    }
                                    alt={`Capa da Novel ${novel.title}`}
                                    className="w-full h-full w-[105px] h-[140px] lg:w-[157px] lg:h-[210px] object-cover"
                                />
                                <span className="absolute top-1 left-1 bg-blue-600 text-white text-[10px] px-1 py-0.5 rounded">
                                    {novel.status.toUpperCase()}
                                </span>
                            </div>
                            <span className="mt-1 text-[13px] font-semibold text-left break-words overflow-hidden line-clamp-2 w-full">
                                {novel.title}
                            </span>
                            <span className="text-[11px] text-gray-500 text-left truncate w-full">
                                {novel.author || 'Autor desconhecido'}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default NewNovels;
