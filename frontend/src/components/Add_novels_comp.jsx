import { useForm } from 'react-hook-form';
import { useState } from 'react';
import allTags from '../constants/tags';

function AddNovelsForm() {
    const { register, handleSubmit, reset } = useForm();
    const [epubFile, setEpubFile] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [coverFile, setCoverFile] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagLetter, setTagLetter] = useState('A');
    const [currentTagPage, setCurrentTagPage] = useState(1);

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

    const tagsPerPage = 30;
    const filteredTags = allTags[tagLetter] || [];
    const totalTagPages = Math.ceil(filteredTags.length / tagsPerPage);
    const paginatedTags = filteredTags.slice((currentTagPage - 1) * tagsPerPage, currentTagPage * tagsPerPage);

    const onSubmit = (data) => {
        if (!epubFile) {
            alert('Selecione um arquivo EPUB.');
            return;
        }

        if (selectedCategories.length === 0) {
            alert("Selecione pelo menos uma categoria.");
            return;
        }

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('synopsis', data.synopsis);
        formData.append('categories', JSON.stringify(selectedCategories));
        formData.append('tags', JSON.stringify(selectedTags));
        formData.append('status', data.status);
        formData.append('author', data.author);
        formData.append('epub', epubFile);
        formData.append('cover', coverFile);

        fetch('http://localhost:8000/api/addNovels', {
            method: 'POST',
            body: formData
        })
            .then(async response => {
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(text);
                }
                return response.json();
            })
            .then(data => {
                alert(data.message || 'Novel adicionada com sucesso!');
                reset();
                setEpubFile(null);
                setSelectedCategories([]);
                setSelectedTags([]);
            })
            .catch(async error => {
                const message = error.message || 'Erro ao adicionar novel.';
                alert(message);
            });
    };

    const toggleCategory = (category) => {
        setSelectedCategories((prev) => {
            if (prev.includes(category)) {
                return prev.filter((c) => c !== category);
            } else if (prev.length < 4) {
                return [...prev, category];
            } else {
                alert("Você só pode selecionar até 4 categorias.");
                return prev;
            }
        });
    };

    const toggleTag = (tag) => {
        setSelectedTags((prev) => {
            if (prev.includes(tag)) {
                return prev.filter((t) => t !== tag);
            } else if (prev.length < 10) {
                return [...prev, tag];
            } else {
                alert("Você só pode selecionar até 10 tags.");
                return prev;
            }
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4">Add New Novel</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div>
                    <label className="block font-semibold">Title:</label>
                    <input
                        type="text"
                        {...register('title', { required: true })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Título da novel"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Synopsis:</label>
                    <textarea
                        {...register('synopsis', { required: true })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Escreva a sinopse aqui..."
                    />
                </div>

                <div>
                    <label className="block font-semibold">Author:</label>
                    <input
                        type="text"
                        {...register('author', { required: true })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Novel's Author"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-2">Category:</label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category, index) => (
                            <button type="button" key={index} onClick={() => toggleCategory(category)}
                                disabled={!selectedCategories.includes(category) && selectedCategories.length >= 4}
                                className={`border px-3 py-1 rounded transition
                                  ${selectedCategories.includes(category)
                                        ? 'bg-blue-500 text-white'
                                        : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'}
                                ${!selectedCategories.includes(category) && selectedCategories.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block font-semibold mb-2">Tags:</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                            <button
                                key={letter}
                                type="button"
                                onClick={() => {
                                    setTagLetter(letter);
                                    setCurrentTagPage(1);
                                }}
                                className={`px-2 text-sm font-semibold ${tagLetter === letter ? 'text-blue-600 underline' : ''}`}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {paginatedTags.map((tag, index) => (
                            <button
                                type="button"
                                key={index}
                                onClick={() => toggleTag(tag)}
                                disabled={!selectedTags.includes(tag) && selectedTags.length >= 10}
                                className={`border px-3 py-1 rounded transition
                                    ${selectedTags.includes(tag)
                                        ? 'bg-green-500 text-white'
                                        : 'border-green-400 text-green-400 hover:bg-green-400 hover:text-white'}
                                    ${!selectedTags.includes(tag) && selectedTags.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-1 mt-2">
                        <button type="button" onClick={() => setCurrentTagPage(1)} disabled={currentTagPage === 1}>«</button>
                        <button type="button" onClick={() => setCurrentTagPage(prev => Math.max(prev - 1, 1))}>{'<'}</button>
                        {[...Array(totalTagPages)].map((_, i) => (
                            <button
                                type="button"
                                key={i}
                                onClick={() => setCurrentTagPage(i + 1)}
                                className={`px-2 ${currentTagPage === i + 1 ? 'text-blue-600 font-bold' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button type="button" onClick={() => setCurrentTagPage(prev => Math.min(prev + 1, totalTagPages))}>{'>'}</button>
                        <button type="button" onClick={() => setCurrentTagPage(totalTagPages)} disabled={currentTagPage === totalTagPages}>»</button>
                    </div>
                </div>

                <div>
                    <label className="block font-semibold">Status:</label>
                    <select
                        {...register('status', { required: true })}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Select</option>
                        <option value="ongoing">On Going</option>
                        <option value="completed">Finished</option>
                        <option value="paused">Paused</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold">EPUB Archive:</label>
                    <input
                        type="file"
                        accept=".epub"
                        onChange={(e) => setEpubFile(e.target.files[0])}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Image Archive:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverFile(e.target.files[0])}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded">
                    ADD NOVEL
                </button>
            </form>
        </div>
    );
}

export default AddNovelsForm;
