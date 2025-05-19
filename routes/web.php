<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});

Route::get('/login', function () {
    return view('login');
});

Route::get('/register', function () {
    return view('register');
});

Route::get('/terms', function() {
    return view('terms');
});

Route::get('/privacy-policy', function () {
    return view('/policy');
});

Route::get('/dmca', function () {
    return view('/dmca');
});

Route::get('/contact', function () {
    return view('/contact');
});

