import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import allTags from '../constants/tags';
import axios from 'axios';

function EditNovelPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();
    const [epubFile, setEpubFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [chapterPage, setChapterPage] = useState(1);
    const [chapterTotalPages, setChapterTotalPages] = useState(1);
    const [tagLetter, setTagLetter] = useState('A');
    const [tagPage, setTagPage] = useState(1);

    const tagsPerPage = 30;
    const filteredTags = allTags[tagLetter] || [];
    const totalTagPages = Math.ceil(filteredTags.length / tagsPerPage);
    const paginatedTags = filteredTags.slice((tagPage - 1) * tagsPerPage, tagPage * tagsPerPage);

    const categories = [
        "Fan-Fiction", "Billionaire", "Douluo", "Faloo", "Dragon Ball", "Football", "NBA", "Marvel", "Pokemon",
        "Elf", "Hogwarts", "System", "Naruto", "One Piece", "Villain", "Sign in", "Derivative Fanfic", "Hot", "Action",
        "Adventure", "Anime", "Comedy", "Systemflow", "Competitive Sports", "Contemporary Romance", "Detective", "Drama",
        "Eastern Fantasy", "Ecchi", "Fantasy", "Fantasy Romance", "Game", "Gender Bender", "Harem", "Historical",
        "Historical Romance", "Horror", "Josei", "LGBT", "Lolicon", "Magic", "Magical Realism", "Martial Arts", "Mecha",
        "Military", "Modern Life", "Movies", "Mystery", "Psychological", "Realistic Fiction", "Reincarnation", "Romance",
        "School Life", "Sci-fi", "Science fiction", "Secret", "Seinen", "Shoujo", "Shoujo Ai", "Shounen", "Shounen Ai",
        "Slice of Life", "Smut", "Sports", "Supernatural", "Suspense", "Terror", "Tragedy", "Video Games", "War", "Wuxia",
        "Xianxia", "Xuanhuan", "Yaoi", "Yuri", "Urban Life", "Travel Through Time", "BL", "BG", "GL", "Other", "Crossing",
        "Rebirth"
    ];

    useEffect(() => {
        axios.get(`/api/novel/${id}`).then(res => {
            const novel = res.data;
            setValue('title', novel.title);
            setValue('synopsis', novel.synopsis);
            setValue('author', novel.author);
            setValue('status', novel.status);
            setSelectedCategories(novel.categories);
            setSelectedTags(novel.tags);
        });

        axios.get(`/api/novel/${id}/chapters?page=${chapterPage}`).then(res => {
            setChapters(res.data.data);
            setChapterTotalPages(res.data.last_page);
        });
    }, [id, chapterPage]);

    const onSubmit = data => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('synopsis', data.synopsis);
        formData.append('author', data.author);
        formData.append('status', data.status);
        formData.append('categories', JSON.stringify(selectedCategories));
        formData.append('tags', JSON.stringify(selectedTags));
        if (epubFile) formData.append('epub', epubFile);
        if (coverFile) formData.append('cover', coverFile);

        axios.post(`/api/novel/${id}/update`, formData)
            .then(() => alert('Novel atualizada com sucesso!'))
            .catch(() => alert('Erro ao atualizar novel.'));
    };

    const toggleCategory = cat => {
        setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
    };

    const toggleTag = tag => {
        setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };

    const handleChapterChange = (index, field, value) => {
        const updated = [...chapters];
        updated[index][field] = value;
        setChapters(updated);
    };

    const updateChapter = (chapterId, content) => {
        axios.post(`/api/chapter/${chapterId}/update`, { content })
            .then(() => alert('Capítulo atualizado!'))
            .catch(() => alert('Erro ao atualizar capítulo.'));
    };

    const handleDeleteChapter = (chapterId) => {
        if (!window.confirm("Tem certeza que deseja excluir este capítulo?")) return;

        axios.delete(`/api/chapter/${chapterId}/delete`)
            .then(() => {
                alert("Capítulo excluído com sucesso.");
                setChapters(prev => prev.filter(ch => ch.id !== chapterId));
            })
            .catch(() => alert("Erro ao excluir capítulo."));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded mt-8">
            <h2 className="text-2xl font-bold mb-4">Edit Novel</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input {...register('title')} className="w-full border p-2 rounded" placeholder="Título" />
                <textarea {...register('synopsis')} className="w-full border p-2 rounded" placeholder="Sinopse" />
                <input {...register('author')} className="w-full border p-2 rounded" placeholder="Autor" />
                <select {...register('status')} className="w-full border p-2 rounded">
                    <option value="">Status</option>
                    <option value="ongoing">On Going</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                </select>

                <div>
                    <h4 className="font-semibold">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button key={cat} type="button" onClick={() => toggleCategory(cat)}
                                className={`px-3 py-1 rounded ${selectedCategories.includes(cat) ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>{cat}</button>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold">Tags</h4>
                    <div className="flex flex-wrap gap-1 mb-5">
                        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                            <button key={letter} type="button" onClick={() => { setTagLetter(letter); setTagPage(1); }}
                                className={tagLetter === letter ? 'font-bold text-blue-600 underline' : ''}>{letter}</button>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-5">
                        {paginatedTags.map(tag => (
                            <button key={tag} type="button" onClick={() => toggleTag(tag)}
                                className={`px-3 py-1 rounded ${selectedTags.includes(tag) ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>{tag}</button>
                        ))}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                        <button type="button" onClick={() => setTagPage(1)} disabled={tagPage === 1}>«</button>
                        <button type="button" onClick={() => setTagPage(prev => Math.max(prev - 1, 1))}>{'<'}</button>
                        {[...Array(totalTagPages)].map((_, i) => (
                            <button
                                type="button"
                                key={i}
                                onClick={() => setTagPage(i + 1)}
                                className={`px-2 ${tagPage === i + 1 ? 'text-blue-600 font-bold' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button type="button" onClick={() => setTagPage(prev => Math.min(prev + 1, totalTagPages))}>{'>'}</button>
                        <button type="button" onClick={() => setTagPage(totalTagPages)} disabled={tagPage === totalTagPages}>»</button>
                    </div>
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Modifications</button>
            </form>

            <div className="mt-10">
                <h3 className="text-xl font-bold mb-2">Chapters</h3>
                {chapters.map((chap, i) => (
                    <div key={chap.id} className="mb-4 p-3 border rounded">
                        <h4 className="font-semibold">{chap.title}</h4>
                        <div className="mt-2 flex gap-2">
                            <button
                                onClick={() => navigate(`/edit-chapter/${chap.id}`)}
                                className="bg-blue-600 text-white px-4 py-1 rounded"
                            >
                                Edit Page
                            </button>
                            <button
                                onClick={() => handleDeleteChapter(chap.id)}
                                className="bg-red-600 text-white px-4 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                <div className="flex justify-center gap-2 mt-4">
                    <button onClick={() => setChapterPage(1)} disabled={chapterPage === 1}>«</button>
                    <button onClick={() => setChapterPage(p => Math.max(1, p - 1))}>{'<'}</button>
                    <span className="px-2">Page {chapterPage} of {chapterTotalPages}</span>
                    <button onClick={() => setChapterPage(p => Math.min(chapterTotalPages, p + 1))}>{'>'}</button>
                    <button onClick={() => setChapterPage(chapterTotalPages)} disabled={chapterPage === chapterTotalPages}>»</button>
                </div>
            </div>
        </div>
    );
}

export default EditNovelPage;