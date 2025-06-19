<?php

namespace App\Http\Controllers;

use App\Models\Novel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Chapter;
use PhpZip\ZipFile;
use DOMDocument;

class NovelController extends Controller
{


    public function addNovel(Request $request)
    {
        set_time_limit(120);
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'synopsis' => 'required|string',
                'status' => 'required|string',
                'author' => 'required|string',
                'categories' => 'required|string',
                'tags' => 'required|string',
                'epub' => 'required|file|mimes:epub',
                'cover' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048'
            ]);

            $coverPath = null;
            if ($request->hasFile('cover')) {
                $coverPath = $request->file('cover')->store('covers', 'public');
            }

            $categoriesArray = json_decode($request->categories, true);
            $tagsArray = json_decode($request->tags, true);

            if (!is_array($categoriesArray) || !is_array($tagsArray)) {
                throw new \Exception('Formato inválido para categorias ou tags.');
            }

            $epubPath = $request->file('epub')->store('epubs');
            $epubFile = storage_path('app/' . $epubPath);
            $chapters = $this->extractChaptersFromEpub($epubFile);

            if (empty($chapters)) {
                logger("EPUB sem capítulos: $epubPath");
                throw new \Exception("Nenhum capítulo extraído do EPUB.");
            }

            $novelData = $request->only(['title', 'synopsis', 'status', 'author']);
            $novelData['categories'] = implode(',', $categoriesArray);
            $novelData['tags'] = implode(',', $tagsArray);
            $novelData['cover_path'] = $coverPath;
            $novelData['chapter_count'] = 0;

            $novel = Novel::create($novelData);

            $chapterData = [];
            foreach ($chapters as $index => $ch) {
                $chapterData[] = [
                    'novel_id' => $novel->id,
                    'number' => $index + 1,
                    'title' => $ch['title'],
                    'context' => $ch['content'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            Chapter::insert($chapterData);
            $novel->chapter_count = count($chapterData);
            $novel->save();

            return response()->json(['message' => 'Novel cadastrada com sucesso!'], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao adicionar novel', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Erro interno no servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function extractChaptersFromEpub($epubPath)
    {
        $zip = new ZipFile();
        $chapters = [];

        try {
            $zip->openFile($epubPath);
            $entries = $zip->getListFiles();

            foreach ($entries as $entry) {
                if (preg_match('/\.(xhtml|html)$/i', $entry)) {
                    try {
                        $html = $zip->getEntryContents($entry);
                        $dom = new DOMDocument();
                        libxml_use_internal_errors(true); // evita warnings
                        @$dom->loadHTML($html);

                        $body = $dom->getElementsByTagName('body')->item(0);
                        if (!$body) {
                            logger("Arquivo '$entry' sem <body>");
                            continue;
                        }

                        $title = $dom->getElementsByTagName('title')->item(0)?->nodeValue ?? 'Chapter';

                        $chapters[] = [
                            'title' => $title,
                            'content' => $dom->saveHTML($body)
                        ];
                    } catch (\Throwable $e) {
                        logger("Erro ao processar '$entry': " . $e->getMessage());
                    }
                }
            }
        } finally {
            $zip->close();
        }

        return $chapters;
    }

    public function listNovels()
    {
        try {
            $novels = Novel::select('id', 'title', 'cover_path', 'status', 'author', 'tags')
                ->orderBy('created_at', 'desc')  // Mais recentes primeiro
                ->limit(6)                     // Limita a 6 novels
                ->get();

            return response()->json($novels);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao buscar novels',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $novel = Novel::findOrFail($id);

        $novel->title = $request->input('title');
        $novel->synopsis = $request->input('synopsis');
        $novel->author = $request->input('author');
        $novel->status = $request->input('status');
        $novel->categories = $request->input('categories');
        $novel->tags = $request->input('tags');

        // Atualiza a capa se tiver nova
        if ($request->hasFile('cover')) {
            $cover = $request->file('cover');
            $coverPath = $cover->store('covers', 'public');
            $novel->cover_path = $coverPath;
        }

        $novel->save();

        return response()->json(['message' => 'Novel atualizada com sucesso!']);
    }

    public function updateChapter(Request $request, $id)
    {
        $chapter = Chapter::findOrFail($id);

        $chapter->title = $request->input('title');
        $chapter->context = $request->input('context');

        if ($request->has('number')) {
            $chapter->number = $request->input('number');
        }

        $chapter->save();

        return response()->json(['message' => 'Capítulo atualizado com sucesso!']);
    }

    public function destroyChapter($id)
    {
        $chapter = Chapter::findOrFail($id);
        $chapter->delete();

        return response()->json(['message' => 'Capítulo removido com sucesso!']);
    }

    public function destroyNovel($id)
{
    $novel = Novel::find($id);
    if (!$novel) {
        return response()->json(['error' => 'Novel não encontrada'], 404);
    }

    // Opcional: remover capítulos ou arquivos relacionados aqui

    $novel->delete();
    return response()->json(['message' => 'Novel removida com sucesso']);
}

    public function popular()
    {
        $popularNovels = Novel::orderBy('views', 'desc')->take(12)->get();
        return response()->json($popularNovels);
    }

    public function show($id)
    {
        $novel = Novel::findOrFail($id);

        // Incrementa 1 no campo views (essa linha é fundamental)
        $novel->increment('views');

        return response()->json($novel);
    }
}
