<?php

namespace App\Http\Controllers;

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
}
