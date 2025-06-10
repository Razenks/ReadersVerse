import React, { useEffect, useState } from "react";

function Novel_page() {
  const [novel, setNovel] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const novelId = 1; // Pode vir via props, URL, etc.

  useEffect(() => {
    fetch(`http://localhost:8000/api/novel/${novelId}`)
      .then(res => res.json())
      .then(data => setNovel(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/api/novel/${novelId}/chapters?page=${currentPage}`)
      .then(res => res.json())
      .then(data => {
        setChapters(data.data); // ou `data.chapters`, conforme seu backend
        setTotalPages(data.last_page || 1);
      });
  }, [currentPage]);

  if (!novel) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src={`http://localhost:8000/storage/${novel.cover_path}`}
            alt="Novel Cover"
            className="w-48 h-72 object-cover rounded shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{novel.title}</h1>
            <p className="text-lg text-gray-600 mb-1">{novel.original_title}</p>
            <p className="text-sm text-gray-500 mb-4">Author: {novel.author || 'Desconhecido'}</p>
            <div className="flex items-center gap-6 mb-4">
              <div><span className="font-semibold">Chapters:</span> {novel.chapter_count}</div>
              <div><span className="font-semibold">Status:</span> {novel.status}</div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {novel.categories.split(',').map((cat, i) => (
                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">{cat}</span>
              ))}
            </div>
            <div className="flex gap-4">
              <a href={`/chapter/${novel.id}/1`} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">READ CHAPTER 1</a>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300">ADD TO LIBRARY</button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex gap-6 text-lg border-b border-gray-200 pb-2 mb-4">
            <span className="font-semibold text-blue-600 border-b-2 border-blue-600">Chapters</span>
            <span className="text-gray-500 hover:text-gray-800 cursor-pointer">About</span>
          </div>

          <div className="bg-gray-100 rounded p-4">
            <p className="text-sm text-gray-600 font-semibold mb-2">Latest Chapters:</p>
            <div className="flex flex-wrap gap-2 text-sm">
              {chapters.map(ch => (
                <a key={ch.id} href={`/chapter/${novel.id}/${ch.number}`} className="text-blue-600 hover:underline">
                  Chapter {ch.number}
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Novel_page;
