import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

function NovelTextPage() {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`http://localhost:8000/api/chapter/${chapterId}`)
      .then(res => setChapter(res.data))
      .catch(err => console.error('Failed to fetch chapter:', err));
  }, [chapterId]);

  const increaseFont = () => setFontSize(f => Math.min(f + 2, 32));
  const decreaseFont = () => setFontSize(f => Math.max(f - 2, 12));


  if (!chapter) return <div className="text-center text-white py-10">Loading...</div>;

  return (
    <div>
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">{chapter.novel.title}</h1>
            <p className="text-sm text-gray-400">{chapter.title}</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button onClick={increaseFont} className="px-3 py-1 border">A+</button>
            <button onClick={decreaseFont} className="px-3 py-1 border">A-</button>
          </div>
        </div>

        {/* Anúncio (placeholder) */}
        <div className="text-center text-xs text-gray-500 my-6">ADVERTISEMENT</div>

        <div className='flex justify-evenly mt-3'>
          <Link to={`/chapter/${parseInt(chapterId) - 1}`} className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded">⬅ PREV</Link>
          <Link to={`/chapter/${parseInt(chapterId) + 1}`} className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded">NEXT ➡</Link>
        </div>
        {/* Conteúdo do capítulo */}
        <div
          className="prose dark:prose-invert max-w-none "
          style={{ fontSize: `${fontSize}px`, letterSpacing: '0.1em', lineHeight: '5' }}
          dangerouslySetInnerHTML={{ __html: chapter.context }}
        />
      </div>
      <div className='flex justify-evenly mt-3'>
        <Link to={`/chapter/${parseInt(chapterId) - 1}`} className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded">⬅ PREV</Link>
        <Link to={`/chapter/${parseInt(chapterId) + 1}`} className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded">NEXT ➡</Link>
      </div>
    </div>
  );
}

export default NovelTextPage;
