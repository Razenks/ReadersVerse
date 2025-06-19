// Updated NovelPage Component with Tabs and Paginated Chapter Navigation
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


const CHAPTERS_PER_PAGE = 100;

function NovelPage() {
  const { user } = useAuth();
  const { novelId } = useParams();
  const [novel, setNovel] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('chapters');
  const [relatedNovels, setRelatedNovels] = useState([]);

  useEffect(() => {
    axios.get(`/api/novel/${novelId}`)
      .then(res => setNovel(res.data))
      .catch(err => console.error('Fail searching for novels:', err));
  }, [novelId]);

  useEffect(() => {
    axios.get(`/api/novel/${novelId}/chapters?page=${currentPage}`)
      .then(res => {
        setChapters(res.data.data);
        setTotalPages(res.data.last_page);
      })
      .catch(err => console.error('Failed searching for chapters:', err));
  }, [novelId, currentPage]);

  useEffect(() => {
    axios.get('/api/novels')
      .then(res => {
        const filtered = res.data.filter(n => n.id !== parseInt(novelId)).slice(0, 6);
        setRelatedNovels(filtered);
      })
      .catch(err => console.error('Erro ao carregar recomendações:', err));
  }, [novelId]);

  if (!novel) return <div className="text-center text-black">Loading</div>;

  const renderPagination = () => {
    const pageButtons = [];
    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(startPage + 7, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 rounded ${currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center mt-8 flex-wrap gap-2">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-300 disabled:opacity-50"
        >
          {'<<'}
        </button>
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-300 disabled:opacity-50"
        >
          {'<'}
        </button>
        {pageButtons}
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-300 disabled:opacity-50"
        >
          {'>'}
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-300 disabled:opacity-50"
        >
          {'>>'}
        </button>
      </div>
    );
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja remover esta novel?')) {
      axios.delete(`/api/novels/${novel.id}`)
        .then(() => {
          alert('Novel removida com sucesso.');
          window.location.href = '/'; // Redireciona para a home
        })
        .catch(err => {
          console.error('Erro ao remover novel:', err);
          alert('Erro ao remover novel.');
        });
    }
  };


  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-black">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-6 border-b border-gray-300 ">
        <img
          src={`./storage/${novel.cover_path}`}
          alt={novel.title}
          className="w-40 h-60 md:w-[300px] md:h-[400px] object-cover rounded-sm shadow-md"
        />
        <div className="flex-1 text-black w-full">
          <div className='flex flex-row justify-between'>
            <h1 className="text-3xl font-bold mb-2">{novel.title}</h1>
            {user?.user_type === 'admin' && (
              <div className="flex gap-3">
                <Link to={`/edit-novel/${novel.id}`} className="block">
                  <button className='bg-green-500 w-[100px] h-[25px] font-bold rounded-sm hover:bg-green-700 hover:text-white'>
                    Edit
                  </button>
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 w-[100px] h-[25px] font-bold rounded-sm text-white hover:bg-red-800"
                >
                  Remover
                </button>
              </div>
            )}
          </div>
          <p className="mb-1"><span className="font-semibold">Author:</span> {novel.author}</p>
          <p className="mb-1"><span className="font-semibold">Status:</span> {novel.status}</p>
          <p className="mb-1"><span className="font-semibold">Categories:</span> {Array.isArray(novel.categories) ? novel.categories.join(', ') : novel.categories}</p>
          <p className="mb-1 "><span className="font-semibold">Tags:</span> {novel.tags}</p>
          <p className="mb-1"><span className="font-semibold">Chapters:</span> {novel.chapter_count}</p>
          <div className="flex flex-wrap gap-3 mt-5 md:mt-24">
            <a
              href={`/chapter/${chapters[0]?.id || '#'}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-sm shadow hover:bg-blue-700 transition"
            >
              📖 Read Chapter 1
            </a>
            <button className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white rounded shadow transition">
              🔔 Add to Library
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-4 border-b border-gray-300">
        <button onClick={() => setActiveTab('chapters')} className={`pb-2 px-4 ${activeTab === 'chapters' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>Chapters</button>
        <button onClick={() => setActiveTab('synopsis')} className={`pb-2 px-4 ${activeTab === 'synopsis' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>Synopsis</button>
      </div>

      {/* Tab Content */}
      {activeTab === 'chapters' ? (
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {chapters.map(ch => (
              <a
                key={ch.id}
                href={`/chapter/${ch.id}`}
                className="bg-white border border-gray-300 hover:bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center transition"
              >
                <span>{ch.title}</span>
                <span className="text-sm text-gray-500">{new Date(ch.created_at).toLocaleDateString()}</span>
              </a>
            ))}
          </div>
          {renderPagination()}
        </div>
      ) : (
        <div className="mt-6 text-black">
          {novel.synopsis}
        </div>
      )}

      {/* You might also like section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-black">You might also like:</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {relatedNovels.map(novel => (
            <a
              key={novel.id}
              href={`/novel/${novel.id}`}
              className="flex flex-col items-center bg-white  rounded shadow hover:shadow-md transition"
            >
              <img
                src={`./storage/${novel.cover_path}`}
                alt={novel.title}
                className="w-full h-[180px] object-cover mb-2"
              />
              <span className="text-sm font-medium text-left text-black line-clamp-2 p-1">{novel.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>

  );
}

export default NovelPage;
