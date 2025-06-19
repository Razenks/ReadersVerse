<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Chapter;
use App\Models\Novel;

class GetNovelsController extends Controller
{
    public function getNovel($id)
    {
        $novel = Novel::with('chapters')->findOrFail($id);
        return response()->json($novel);
    }

    public function getChapters($id)
    {
        return Chapter::where('novel_id', $id)->orderBy('number')->paginate(10);
    }

    public function getChapter($chapterId)
    {
        $chapter = Chapter::with('novel') // se quiser o título da novel também
            ->findOrFail($chapterId);

        return response()->json([
            'id' => $chapter->id,
            'title' => $chapter->title,
            'number' => $chapter->number,
            'context' => $chapter->context,
            'created_at' => $chapter->created_at,
            'novel' => [
                'id' => $chapter->novel->id,
                'title' => $chapter->novel->title,
            ],
        ]);
    }

    public function getRecentChapters()
    {
        Log::info('Iniciando getRecentChapters');

        try {
            $chapters = Chapter::with('novel')
                ->orderBy('created_at', 'desc')
                ->take(12)
                ->get();

            $result = $chapters->map(function ($chapter) {
                return [
                    'id' => $chapter->id,
                    'title' => $chapter->title,
                    'number' => $chapter->number,
                    'context' => $chapter->context,
                    'created_at' => $chapter->created_at,
                    'novel' => [
                        'id' => $chapter->novel->id ?? null,
                        'title' => $chapter->novel->title ?? 'Sem título',
                        'cover_path' => $chapter->novel->cover_path
                            ? asset('storage/' . $chapter->novel->cover_path)
                            : null,
                    ],
                ];
            });

            Log::info('getRecentChapters finalizado com sucesso');

            return response()->json($result);
        } catch (\Exception $e) {
            Log::error('Erro no getRecentChapters: ' . $e->getMessage());
            return response()->json(['error' => 'Erro ao buscar capítulos recentes'], 500);
        }
    }

    public function getNovelsByCategory($category)
    {
        try {
            $novels = Novel::where('categories', 'like', "%$category%")
                ->select('id', 'title', 'cover_path', 'status', 'author')
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($novels);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao buscar novels por categoria',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getNovelsByTag($tag)
    {
        $novels = Novel::where('tags', 'like', "%$tag%")
            ->select('id', 'title', 'cover_path', 'status', 'author', 'updated_at', 'chapter_count') // <-- ADICIONE 'chapter_count' AQUI
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json($novels);
    }

    public function getNovelsByName($searchQuery)
    {
        $novels = Novel::where('title', 'like', "%$searchQuery%")
            ->select('id', 'title', 'cover_path', 'status', 'author', 'updated_at', 'chapter_count')
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json($novels);
    }

    public function recentlyUpdatedNovels(Request $request)
    {
        $perPage = 10; // novels por página
        $page = $request->input('page', 1);

        $novels = Novel::select(
            'novels.id',
            'novels.title',
            'novels.cover_path',
            'novels.status',
            'novels.author',
            'novels.updated_at'
        )
            ->join('chapters', 'novels.id', '=', 'chapters.novel_id')
            ->groupBy('novels.id', 'novels.title', 'novels.cover_path', 'novels.status', 'novels.author', 'novels.updated_at')
            ->orderBy('updated_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($novels);
    }
}
