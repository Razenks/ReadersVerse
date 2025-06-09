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

            $novel = Novel::create([
                'title' => $request->title,
                'synopsis' => $request->synopsis,
                'status' => $request->status,
                'categories' => implode(',', $categoriesArray),
                'cover_path' => $coverPath,
                'chapter_count' => 0,
                'added_at' => now(),
            ]);

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
