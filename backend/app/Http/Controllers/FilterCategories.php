<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Chapter;
use App\Models\Novel;

class FilterCategories extends Controller
{
    public function filterNovels(Request $request)
{
    $query = Novel::query();

    // Categorias (até 4)
    if ($request->has('categories') && is_array($request->categories)) {
        foreach ($request->categories as $category) {
            $query->whereRaw("FIND_IN_SET(?, categories)", [$category]);
        }
    }

    // Status (completed, ongoing, etc.)
    if ($request->filled('status')) {
        $query->where('status', $request->status);
    }

    // Ordenação
    switch ($request->sort_by) {
        case 'popular':
            $query->orderByDesc('views'); // ou outro campo como likes, ratings, etc.
            break;

        case 'new':
            $query->orderByDesc('created_at');
            break;

        case 'updated':
        default:
            $query->orderByDesc('updated_at');
            break;
    }

    $novels = $query->paginate(20);

    return response()->json($novels);
}
}
