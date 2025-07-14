<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Password;

Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

Route::post('/register', [AuthController::class, 'register']);

// Password reset routes for email links
Route::get('reset-password/{token}', function ($token) {
    return view('auth.reset-password', ['token' => $token, 'email' => request('email')]);
})->name('password.reset');