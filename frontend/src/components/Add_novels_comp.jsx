import { useForm } from 'react-hook-form';
import { useState } from 'react';

function AddNovelsForm() {
    const { register, handleSubmit, reset } = useForm();
    const [epubFile, setEpubFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categories = [
        "All", "Fan-Fiction", "Billionaire", "Douluo", "Faloo", "Dragon Ball", "Football", "NBA", "Marvel", "Pokemon",
        // ... seu array completo
        "Rebirth"
    ];

    const toggleCategory = (category) => {
        setSelectedCategories((prev) => {
            if (prev.includes(category)) {
                return prev.filter(c => c !== category);
            } else if (prev.length < 4) {
                return [...prev, category];
            } else {
                alert('Você só pode selecionar até 4 categorias.');
                return prev;
            }
        });
    };

    const onSubmit = (data) => {
        if (!epubFile) {
            alert('Selecione um arquivo EPUB.');
            return;
        }

        if (selectedCategories.length === 0) {
            alert('Selecione pelo menos uma categoria.');
            return;
        }

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('synopsis', data.synopsis);
        formData.append('status', data.status);
        formData.append('categories', JSON.stringify(selectedCategories));
        formData.append('epub', epubFile);
        if (coverFile) formData.append('cover', coverFile);

        fetch('http://localhost:8000/api/addNovels', {
            method: 'POST',
            body: formData,
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(async (response) => {
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }
                return response.json();
            })
            .then((res) => {
                alert(res.message || 'Novel adicionada com sucesso!');
                reset();
                setEpubFile(null);
                setCoverFile(null);
                setSelectedCategories([]);
            })
            .catch((error) => {
                alert(error.message || 'Erro ao adicionar novel.');
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
                    <label className="block font-semibold mb-2">Categories (max 4):</label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category, idx) => (
                            <button
                                type="button"
                                key={idx}
                                onClick={() => toggleCategory(category)}
                                disabled={!selectedCategories.includes(category) && selectedCategories.length >= 4}
                                title={!selectedCategories.includes(category) && selectedCategories.length >= 4 ? 'Limite de 4 categorias' : ''}
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
                    <label className="block font-semibold">Status:</label>
                    <select
                        {...register('status', { required: true })}
                        className="w-full border px-3 py-2 rounded"
                        defaultValue=""
                    >
                        <option value="" disabled>Select</option>
                        <option value="em_andamento">On Going</option>
                        <option value="completo">Finished</option>
                        <option value="pausado">Paused</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold">EPUB Archive:</label>
                    <input
                        type="file"
                        accept=".epub"
                        onChange={e => setEpubFile(e.target.files[0])}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Cover Image (optional):</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setCoverFile(e.target.files[0])}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
                >
                    ADD NOVEL
                </button>
            </form>
        </div>
    );
}

export default AddNovelsForm;
