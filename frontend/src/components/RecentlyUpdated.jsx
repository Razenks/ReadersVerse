import React, { useEffect, useState } from 'react';
import { Calendar, Bookmark } from 'react-feather';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';

function RecentlyUpdated() {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/chapters/recent')
            .then(res => setChapters(res.data))
            .catch(err => console.error('Failed to Search Recently Chapters:', err));
    }, []);

    return (
        <section className="px-2 sm:px-6 lg:px-16 mt-6 md:ml-[20px] lg:pt-6">
            <div className="justify-between items-center pr-4">
                <h1 className="text-2xl font-semibold text-white mb-4">Recently Updated Chapters</h1>
            </div>

            <div className="flex flex-wrap justify-between gap-5">
                {chapters.map((chapter) => (
                    <Link
                        to={`/chapter/${chapter.id}`}
                        key={chapter.id}
                        className="flex bg-gray-800 hover:bg-gray-700 shadow-md rounded w-full sm:w-[48%] lg:w-[32%] h-[110px] transition duration-200"
                    >
                        <img
                            src={chapter.novel.cover_path || '/default.jpg'}
                            alt="Cover"
                            className="w-[80px] h-[110px] object-cover rounded-l"
                        />

                        <div className="p-3 ml-3 mt-2 flex flex-col justify-between">
                            <span className="text-[16px] text-white font-medium line-clamp-2">
                                {chapter.novel.title}
                            </span>
                            <div className="flex items-center text-gray-400 text-sm space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    Updated {formatDistanceToNowStrict(new Date(chapter.created_at))} ago
                                </span>
                            </div>
                            <div className="flex items-center text-gray-400 text-sm space-x-2">
                                <Bookmark className="w-4 h-4" />
                                <span>Chapter {chapter.number}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default RecentlyUpdated;
