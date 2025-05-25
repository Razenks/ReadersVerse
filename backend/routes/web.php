<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/teste-conexao', function () {
    try {
        DB::connection()->getPdo();
        return "✅ Conexão bem-sucedida com o banco!";
    } catch (\Exception $e) {
        return "❌ Erro na conexão: " . $e->getMessage();
    }
});