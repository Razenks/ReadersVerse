import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PopularNovels() {
    const [novels, setNovels] = useState([]);

    useEffect(() => {
        axios.get('/api/popular-novels')
            .then(res => setNovels(res.data))
            .catch(err => console.error('Erro ao buscar novels populares:', err));
    }, []);

    return (
        <section className="pt-9 px-2 sm:px-6 lg:px-16 mt-6 md:ml-[20px] w-full">
            <div className="flex justify-between items-center pr-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Popular Novels</h2>
                <Link to="/popular" className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">See More</Link>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-4 pt-4">
                {novels.map(novel => (
                    <Link to={`/novel/${novel.slug}`} key={novel.id} className="flex flex-col items-center lg:w-[153px]">
                        <div className="relative w-full rounded-sm shadow-md overflow-hidden">
                            <img
                                src={
                                    novel.cover_path
                                        ? `./storage/${novel.cover_path}`
                                        : '/default-cover.jpeg'
                                }w
                                alt={`Capa da ${novel.title}`}
                                className="w-full h-full lg:w-[190px] lg:h-[240px] object-cover"
                            />
                            <span className="absolute top-1 left-1 bg-blue-600 text-white text-[10px] px-1 py-0.5 rounded">
                                {novel.status.toUpperCase()}
                            </span>
                        </div>
                        <span className="mt-1 text-[13px] font-semibold text-left break-words line-clamp-2 w-full">{novel.title}</span>
                        <span className="text-[11px] text-gray-500 text-left truncate w-full">{novel.author}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default PopularNovels;
