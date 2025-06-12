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