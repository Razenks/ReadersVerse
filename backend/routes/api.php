<?php

use App\Http\Controllers\GetNovelsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NovelController;
use App\Http\Controllers\FilterCategories;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/verifyCode', [AuthController::class, 'verifyEmail']);
Route::post('/login', [AuthController::class, 'verifyLogin']);
Route::post('/verifyCodeLogin', [AuthController::class, 'validateCodeLogin']);
Route::post('/addNovels', [NovelController::class, 'addNovel']);
Route::post('/novel/{id}/update', [NovelController::class, 'update']);
Route::post('/chapter/{chapterId}/update', [NovelController::class, 'updateChapter']);

// Usar GET para pegar dados, com parâmetros de rota
Route::get('/novel/{novelId}', [GetNovelsController::class, 'getNovel']);
Route::get('/novel/{novelId}/chapters', [GetNovelsController::class, 'getChapters']);
Route::get('/chapter/{chapterId}', [GetNovelsController::class, 'getChapter']);
Route::get('/chapters/recent', [GetNovelsController::class, 'getRecentChapters']);
Route::get('/novels/category/{category}', [GetNovelsController::class, 'getNovelsByCategory']);
Route::get('/novels', [NovelController::class, 'listNovels']);
Route::get('/filterNovels', [FilterCategories::class, 'filterNovels']);
Route::get('/recent-updates', [GetNovelsController::class, 'recentlyUpdatedNovels']);
Route::get('/tags/{tag}', [GetNovelsController::class, 'getNovelsByTag']);
Route::get('/novels/search/{searchQuery}', [GetNovelsController::class, 'getNovelsByName']);
Route::get('/popular-novels', [NovelController::class, 'popular']);
Route::get('/novel/{id}', [NovelController::class, 'show']);

// Usar DELETE para deletar os dados
Route::delete('/chapter/{chapterId}/delete', [NovelController::class, 'destroyChapter']);
Route::delete('/novels/{id}', [NovelController::class, 'destroyNovel']);