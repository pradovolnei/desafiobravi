<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/users', [UserController::class, 'store']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/contacts/{user_id}', [ContactController::class, 'show']);
Route::post('/contacts/{user_id}', [ContactController::class, 'store']);
Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);
Route::put('/contacts/{id}', [ContactController::class, 'update']);
Route::get('/contact/{id}', [ContactController::class, 'showContact']);

