import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'react-feather';
import { formatDistanceToNowStrict } from 'date-fns';

function RecentUpdates() {
    const [novels, setNovels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        axios.get(`/api/recent-updates?page=${currentPage}`)
            .then(res => {
                setNovels(res.data.data);
                setLastPage(Math.min(res.data.last_page, 10));
            })
            .catch(err => console.error('Erro ao carregar novels atualizadas', err));
    }, [currentPage]);

    const goToPage = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    return (
        <main className="p-10">
            <h2 className="text-2xl font-bold mb-4">Recently Updated Novel Chapters</h2>

            {/* Paginação */}
            <div className="flex justify-center items-center gap-2 mt-6 mb-6">
                <button onClick={() => goToPage(1)} className="px-2">«</button>
                <button onClick={() => goToPage(currentPage - 1)} className="px-2">{'<'}</button>

                {[...Array(lastPage)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToPage(i + 1)}
                        className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button onClick={() => goToPage(currentPage + 1)} className="px-2">{'>'}</button>
                <button onClick={() => goToPage(lastPage)} className="px-2">»</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {novels.map((novel) => {
                    let statusColor = 'text-gray-600';

                    if (novel.status === 'completed') statusColor = 'text-green-600';
                    else if (novel.status === 'ongoing') statusColor = 'text-blue-600';
                    else if (novel.status === 'finished') statusColor = 'text-red-600';

                    return (
                        <Link to={`/novel/${novel.id}`} key={novel.id} className="flex bg-white border shadow rounded overflow-hidden">
                            <img
                                src={`./storage/${novel.cover_path}`}
                                alt={novel.title}
                                className="w-[80px] h-[120px] object-cover flex-shrink-0"
                            />
                            <div className="p-3 flex flex-col justify-between">
                                <h3 className="font-semibold text-lg line-clamp-2">{novel.title}</h3>
                                <div className="flex text-sm text-gray-600 items-center gap-1">
                                    <User className="w-4 h-4" />
                                    <span>{novel.author}</span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm space-x-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        Updated {formatDistanceToNowStrict(new Date(novel.updated_at))} ago
                                    </span>
                                </div>
                                <span className={`text-sm font-bold ${statusColor}`}>{novel.status}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Paginação */}
            <div className="flex justify-center items-center gap-2 mt-6">
                <button onClick={() => goToPage(1)} className="px-2">«</button>
                <button onClick={() => goToPage(currentPage - 1)} className="px-2">{'<'}</button>

                {[...Array(lastPage)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToPage(i + 1)}
                        className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button onClick={() => goToPage(currentPage + 1)} className="px-2">{'>'}</button>
                <button onClick={() => goToPage(lastPage)} className="px-2">»</button>
            </div>
        </main>
    );
}

export default RecentUpdates;
