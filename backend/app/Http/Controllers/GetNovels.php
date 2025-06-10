<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chapter;
use App\Models\Novel;

class GetNovels extends Controller
{
    public function getNovel($id)
    {
        $novel = Novel::findOrFail($id);
        return response()->json($novel);
    }

    public function getChapters($id)
    {
        return Chapter::where('novel_id', $id)->orderBy('number')->paginate(10);
    }
}
