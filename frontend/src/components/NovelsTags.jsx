import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import allTags from '../constants/tags'; // Certifique-se que este arquivo está exportando um objeto { A: [], B: [], ... }

function TagsPage() {
  const [selectedLetter, setSelectedLetter] = useState('A');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const tags = allTags[selectedLetter] || [];

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">
        Explore the Most Used Light Novel Tags
      </h1>
      <div className="h-[3px] w-full bg-gradient-to-r from-black via-gray-800 to-gray-600 mb-10" />

      {/* LETRAS */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            className={`text-sm px-2 ${selectedLetter === letter ? 'underline text-blue-600' : 'text-gray-600'
              }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* TAGS DA LETRA SELECIONADA */}
      <div key={selectedLetter} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {tags.map(tag => (
          <Link
            to={`/tags/${encodeURIComponent(tag)}`}
            key={tag}
            className="text-blue-600 hover:underline text-sm"
          >
            {tag}
          </Link>
        ))}
      </div>
    </main>
  );
}

export default TagsPage;
