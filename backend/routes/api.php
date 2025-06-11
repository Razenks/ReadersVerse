<?php

use App\Http\Controllers\GetNovelsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NovelController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/verifyCode', [AuthController::class, 'verifyEmail']);
Route::post('/login', [AuthController::class, 'verifyLogin']);
Route::post('/verifyCodeLogin', [AuthController::class, 'validateCodeLogin']);
Route::post('/addNovels', [NovelController::class, 'addNovel']);

// Usar GET para pegar dados, com parâmetros de rota
Route::get('/novel/{novelId}', [GetNovelsController::class, 'getNovel']);
Route::get('/novel/{novelId}/chapters', [GetNovelsController::class, 'getChapters']);
Route::get('/chapter/{chapterId}', [GetNovelsController::class, 'getChapter']);
Route::get('/novels', [NovelController::class, 'listNovels']);