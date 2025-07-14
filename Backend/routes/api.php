<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ModulePreferenceController;
use App\Http\Controllers\CategoryController;
use App\Models\Test; // Fix: Make sure the 'M' in Models is uppercase
use App\Http\Controllers\TestController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\AutoNumberSettingController;
use App\Http\Controllers\BarcodeSettingController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [ResetPasswordController::class, 'reset']);

// Authenticated routes group
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products', [ProductController::class, 'index']);

    // Authenticated user info
    Route::get('/user', function (Request $request) {
        $user = $request->user()->load('shop');
        return $user;
    });

    Route::get('/module-preferences', [ModulePreferenceController::class, 'index']);
    Route::post('/module-preferences', [ModulePreferenceController::class, 'store']);

    Route::post('/logout', [LoginController::class, 'logout']);
});

// Client store route (can be public or inside auth middleware as per your logic)


Route::middleware('auth:sanctum')->post('/test', [TestController::class, 'store']);
Route::middleware('auth:sanctum')->get('/test', [TestController::class, 'index']);


Route::middleware('auth:sanctum')->post('/suppliers', [SupplierController::class, 'store']);
Route::middleware('auth:sanctum')->get('/supplier',[SupplierController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auto-number/{module}', [AutoNumberSettingController::class, 'show']);
    Route::put('/auto-number/{module}', [AutoNumberSettingController::class, 'update']);
});

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/ex1',[ProductController::class,'store']);
});

Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('/brands', [\App\Http\Controllers\BrandController::class, 'store']);
    Route::get('/brands', [\App\Http\Controllers\BrandController::class, 'index']);
    Route::get('/brands/{id}', [\App\Http\Controllers\BrandController::class, 'show']); // View single brand
    Route::put('/brands/{id}', [\App\Http\Controllers\BrandController::class, 'update']); // Edit brand
    Route::delete('/brands/{id}', [\App\Http\Controllers\BrandController::class, 'destroy']); // Delete brand
});

Route::middleware('auth:sanctum')->get('/activities', function (Request $request) {
    $perPage = $request->query('per_page', 5); // default 5
    return \App\Models\Activity::orderBy('date', 'desc')->limit($perPage)->get();
});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);


});

Route::middleware('auth:sanctum')->group(function () {
   Route::post('/clients', [ClientController::class, 'store']);
   Route::get('/clients/next-code', [ClientController::class, 'getNextCode']);
   Route::get('/clients',[ClientController::class, 'index']);
   Route::delete('/client/{id}',[ClientController::class,'destroy']);
   Route::get('/client/{id}', [ClientController::class, 'show']);
});

Route::post('/register-details', [\App\Http\Controllers\RegisterDetailsController::class, 'store']);