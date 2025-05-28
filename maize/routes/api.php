<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FarmerController;
use App\Http\Controllers\FieldController;
use App\Http\Controllers\SensorController;
use App\Http\Controllers\SensorReadingController;
use App\Http\Controllers\YieldPredictionController;
use App\Http\Controllers\RecommendationController;
use App\Http\Controllers\HistoricalYieldController;


Route::get('/', fn () => ['message' => 'Welcome to Maize Yield Tool API']);
Route::get('/v1', fn () => ['message' => 'Maize Yield Tool API v1 - Ready to serve your requests']);

Route::apiResource('products', ProductController::class);

// Authentication routes
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::middleware('auth:sanctum')->get('me', [AuthController::class, 'me']);
});

// User CRUD routes
Route::apiResource('users', UserController::class);

// Farmer CRUD routes
Route::apiResource('farmers', FarmerController::class);

// Field CRUD routes
Route::apiResource('fields', FieldController::class);

// Sensor CRUD routes
Route::apiResource('sensors', SensorController::class);

// SensorReading CRUD routes
Route::apiResource('sensor-readings', SensorReadingController::class);

// YieldPrediction CRUD routes
Route::apiResource('yield-predictions', YieldPredictionController::class);

// Recommendation CRUD routes
Route::apiResource('recommendations', RecommendationController::class);

// HistoricalYield CRUD routes
Route::apiResource('historical-yields', HistoricalYieldController::class);