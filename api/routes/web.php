<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuporteController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/validar-colchetes', [SuporteController::class, 'index'])->name('validar-colchetes.index');
Route::post('/validar-colchetes', [SuporteController::class, 'validar'])->name('validar-colchetes.validar');
