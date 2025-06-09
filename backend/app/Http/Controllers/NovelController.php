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
        $request->validate([
            'title' => 'required|string|max:255',
            'synopsis' => 'required|string',
            'status' => 'required|string',
            'categories' => 'required|string', // JSON string
            'epub' => 'required|file|mimes:epub',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        try {
            // Upload da capa
            $coverPath = null;
            if ($request->hasFile('cover')) {
                $coverPath = $request->file('cover')->store('covers', 'public');
            }

            // Decodifica categorias recebidas em JSON
            $categoriesArray = json_decode($request->categories, true);

            // Salva epub
            $epubPath = $request->file('epub')->store('epubs');
            $epubFile = storage_path('app/' . $epubPath);

            // Extrai capítulos do epub
            $chapters = $this->extractChaptersFromEpub($epubFile);

            // Cria novel
            $novel = Novel::create([
                'title' => $request->title,
                'synopsis' => $request->synopsis,
                'status' => $request->status,
                'categories' => implode(',', $categoriesArray), // salva como CSV
                'cover_path' => $coverPath,
                'chapter_count' => count($chapters),
                'added_at' => now(),
            ]);

            // Cria capítulos
            foreach ($chapters as $index => $ch) {
                Chapter::create([
                    'novel_id' => $novel->id,
                    'number' => $index + 1,
                    'title' => $ch['title'],
                    'context' => $ch['content'],
                    'published_at' => now()
                ]);
            }

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
                    @$dom->loadHTML($html);

                    $body = $dom->getElementsByTagName('body')->item(0);
                    if (!$body) continue;

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
}
