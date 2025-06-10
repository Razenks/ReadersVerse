<?php

use App\Http\Controllers\GetNovels;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NovelController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/verifyCode', [AuthController::class, 'verifyEmail']);
Route::post('/login', [AuthController::class, 'verifyLogin']);
Route::post('/verifyCodeLogin', [AuthController::class, 'validateCodeLogin']);
Route::post('/addNovels', [NovelController::class, 'addNovel']);

// Usar GET para pegar dados, com parâmetros de rota
Route::get('/novel/{novelId}', [GetNovels::class, 'getNovel']);
Route::get('/novel/{novelId}/chapters', [GetNovels::class, 'getChapters']);
Route::get('/novels', [NovelController::class, 'listNovels']);