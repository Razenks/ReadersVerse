<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NovelController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/verifyCode', [AuthController::class, 'verifyEmail']);
Route::post('/login', [AuthController::class, 'verifyLogin']);
Route::post('/verifyCodeLogin', [AuthController::class, 'validateCodeLogin']);
Route::post('/addNovels', [NovelController::class, 'addNovel']);
