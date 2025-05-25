<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/novels', [NovelController::class, 'index']);
Route::get('/novels/{id}', [NovelController::class, 'show']);
Route::get('/chapters/{id}', [ChapterController::class, 'show']);

