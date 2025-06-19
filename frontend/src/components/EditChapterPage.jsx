import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditChapterPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    axios.get(`/api/chapter/${chapterId}`)
      .then(res => setChapter(res.data))
      .catch(() => alert('Erro ao carregar capítulo'));
  }, [chapterId]);

  const formatTextToHtml = (text) => {
    // Divide por quebra de linha, remove vazios e transforma em <p>
    return text
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => `<p>${line.trim()}</p>`)
      .join('');
  };

  const handleSave = () => {
    axios.post(`/api/chapter/${chapterId}/update`, {
      title: chapter.title,
      context: formatTextToHtml(chapter.context), // transforma texto puro em HTML
    })
      .then(() => {
        alert("Capítulo atualizado com sucesso!");
        navigate(-1);
      })
      .catch(() => alert("Erro ao atualizar capítulo."));
  };

  if (!chapter) return <div className="text-white">Carregando...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded mt-6">
      <h2 className="text-2xl font-bold mb-4">Editar Capítulo</h2>
      <input
        className="w-full border p-2 mb-3 rounded"
        value={chapter.title}
        onChange={e => setChapter({ ...chapter, title: e.target.value })}
        placeholder="Título"
      />
      <textarea
        className="w-full border p-2 rounded"
        value={chapter.context}
        onChange={e => setChapter({ ...chapter, context: e.target.value })}
        rows={15}
      />
      <div className="flex gap-3 mt-4">
        <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">Salvar</button>
        <button onClick={() => navigate(-1)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancelar</button>
      </div>
    </div>
  );
}

export default EditChapterPage;
