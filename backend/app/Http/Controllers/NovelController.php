<?php

namespace App\Http\Controllers;

use App\Models\Novel;
use Illuminate\Http\Request;
use App\Models\Chapter;
use PhpZip\ZipFile;
use DOMDocument;

class NovelController extends Controller
{


    public function addNovel(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'synopsis' => 'required|string',
                'status' => 'required|string',
                'author' => 'required|string',
                'categories' => 'required|string',
                'epub' => 'required|file|mimes:epub',
                'cover' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048'
            ]);

            $coverPath = null;
            if ($request->hasFile('cover')) {
                $coverPath = $request->file('cover')->store('covers', 'public');
            }

            $categoriesArray = json_decode($request->categories, true);
            $epubPath = $request->file('epub')->store('epubs');
            $epubFile = storage_path('app/' . $epubPath);
            $chapters = $this->extractChaptersFromEpub($epubFile);

            $novelData = $request->only([
                'title',
                'synopsis',
                'status',
                'author'
            ]);

            $novelData['categories'] = implode(',', json_decode($request->categories, true));
            $novelData['cover_path'] = $coverPath;
            $novelData['chapter_count'] = 0;
            $novelData['added_at'] = now();

            $novel = Novel::create($novelData);

            foreach ($chapters as $index => $ch) {
                Chapter::create([
                    'novel_id' => $novel->id,
                    'number' => $index + 1,
                    'title' => $ch['title'],
                    'context' => $ch['content'],
                    'published_at' => now()
                ]);
            }

            $novel->chapter_count = count($chapters);
            \Log::info('Capítulos detectados:', ['count' => count($chapters)]);
            $novel->save();

            return response()->json(['message' => 'Novel cadastrada com sucesso!']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao processar a requisição',
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
                if (str_ends_with($entry, '.xhtml') || str_ends_with($entry, '.html')) {
                    $html = $zip->getEntryContents($entry);
                    $dom = new DOMDocument();
                    @$dom->loadHTML($html); // Primeiro carrega o HTML

                    $body = $dom->getElementsByTagName('body')->item(0);
                    if (!$body)
                        continue;

                    $title = $dom->getElementsByTagName('title')->item(0)?->nodeValue ?? 'Chapter';

                    $chapters[] = [
                        'title' => $title,
                        'content' => $dom->saveHTML($body)
                    ];
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
            $novels = Novel::select('id', 'title', 'cover_path', 'status', 'author')
                ->orderBy('added_at', 'desc')  // Mais recentes primeiro
                ->limit(6)                     // Limita a 6 novels
                ->get();

            return response()->json($novels);
        } catch (\Exception $e) {
            \Log::error('Erro ao buscar novels: ' . $e->getMessage());
            return response()->json([
                'error' => 'Erro ao buscar novels',
                'message' => $e->getMessage()
            ], 500);
        }
    }



}
