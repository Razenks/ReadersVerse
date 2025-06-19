import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, BookOpen } from 'react-feather';
import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';

function NovelsByTag() {
  const { tag } = useParams();
  const [novels, setNovels] = useState([]);

  useEffect(() => {
    fetch(`/api/tags/${encodeURIComponent(tag)}`)
      .then(res => res.json())
      .then(data => setNovels(data))
      .catch(err => console.error('Erro ao buscar novels por tag:', err));
  }, [tag]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-8">Novels tagged with "{tag}"</h1>

      <div className="h-[3px] w-full bg-gradient-to-r from-black via-gray-800 to-gray-600 mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {novels.map(novel => {
          let statusColor = 'text-gray-600';

          if (novel.status === 'completed') statusColor = 'text-green-600';
          else if (novel.status === 'ongoing') statusColor = 'text-blue-600';
          else if (novel.status === 'finished') statusColor = 'text-red-600';


          return (
            <Link key={novel.id} to={`/novel/${novel.id}`} className="flex w-full sm:w-[400px]">
              <img
                src={`./storage/${novel.cover_path}`}
                alt={novel.title}
                className="w-[105px] h-[140px] lg:w-[130px] lg:h-[180px] object-cover mr-4 shrink-0"
              />
              <div className="flex flex-col justify-between w-full overflow-hidden">
                <h3 className="text-lg font-semibold text-black break-words overflow-hidden text-ellipsis max-h-[3em] leading-snug">
                  {novel.title}
                </h3>

                <div className="flex items-center text-sm text-gray-600 mt-5 mb-1">
                  <Clock className="w-5 h-5 mr-1" />
                  {formatDistanceToNowStrict(new Date(novel.updated_at), {
                    addSuffix: true,
                    unit: 'hour',
                  })}
                </div>

                <p className="mb-1 text-sm text-left flex"><span className="font-semibold"><BookOpen className="w-5 h-5 mr-1" /></span> {novel.chapter_count} Chapters</p>

                <p className="text-sm">
                  Status: <span className={`ml-1 font-bold ${statusColor}`}>{novel.status}</span>
                </p>
              </div>
            </Link>

          );
        })}
      </div>
    </main>
  );
}

export default NovelsByTag;
