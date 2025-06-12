import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { categories } from '../constants/categories';
import { Calendar, Bookmark } from 'react-feather';
import { Link } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';

function Categories_user() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedSort, setSelectedSort] = useState('updated');
    const [novels, setNovels] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/filterNovels', {
            params: {
                categories: selectedCategories,
                status: selectedStatus,
                sort_by: selectedSort
            }
        })
            .then(res => setNovels(res.data.data || []))
            .catch(error => console.error('Erro ao buscar novels:', error));
    }, [selectedCategories, selectedStatus, selectedSort]);

    const toggleCategory = (category) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(cat => cat !== category);
            } else if (prev.length < 4) {
                return [...prev, category];
            } else {
                return prev;
            }
        });
    };

    return (
        <main className="px-4 sm:px-6 lg:px-16 py-6">
            {/* Filtros */}
            <div className="bg-gray-100 border rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-3">Genre / Category</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                    <button
                        onClick={() => {
                            setSelectedCategories([]);
                            setSelectedStatus('');
                            setSelectedSort('updated');
                        }}
                        className={`px-3 py-1 text-sm rounded-full border font-medium transition ${selectedCategories.length === 0 && selectedStatus === ''
                                ? 'bg-blue-800 text-white'
                                : 'bg-white text-gray-700 hover:bg-blue-100'
                            }`}
                    >
                        All
                    </button>
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => toggleCategory(cat)}
                            className={`px-3 py-1 text-sm rounded-full border font-medium transition ${selectedCategories.includes(cat)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-blue-100'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Status */}
                <div className="mb-4">
                    <h3 className="font-medium mb-1">Status</h3>
                    <div className="flex gap-2">
                        {['paused', 'completed', 'ongoing'].map((status, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedStatus(status)}
                                className={`px-3 py-1 text-sm rounded-full border font-medium transition ${selectedStatus === status
                                        ? 'bg-green-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-green-100'
                                    }`}
                            >
                                {status === '' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sort */}
                <div>
                    <h3 className="font-medium mb-1">Sort By</h3>
                    <div className="flex gap-2">
                        {[
                            { value: 'updated', label: 'Updated' },
                            { value: 'new', label: 'New' },
                            { value: 'popular', label: 'Popular' }
                        ].map(({ value, label }) => (
                            <button
                                key={value}
                                onClick={() => setSelectedSort(value)}
                                className={`px-3 py-1 text-sm rounded-full border font-medium transition ${selectedSort === value
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-purple-100'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Título */}
            <h2 className="text-2xl font-semibold mb-4">
                {selectedCategories.length > 0
                    ? `Novels in: ${selectedCategories.join(', ')}`
                    : "Select up to 4 categories"}
            </h2>

            {/* Lista de novels */}
            <div className="flex flex-wrap gap-6">
                {novels.map((novel) => (
                    <Link
                        to={`/novel/${novel.id}`}
                        key={novel.id}
                        className="flex bg-white border rounded-lg shadow-md hover:shadow-lg w-full sm:w-[48%] lg:w-[32%] h-[130px] transition"
                    >
                        <img
                            src={`http://localhost:8000/storage/${novel.cover_path}`}
                            alt={novel.title}
                            className="w-[90px] h-full object-cover rounded-l-lg"
                        />
                        <div className="flex flex-col justify-between p-3">
                            <h3 className="text-lg font-semibold line-clamp-2">{novel.title}</h3>
                            <div className="text-sm text-gray-600 flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{novel.author}</span>
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-1">
                                <Bookmark className="w-4 h-4" />
                                <span>{novel.status}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}

export default Categories_user;
