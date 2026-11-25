<?php

use App\Http\Controllers\Api\ApiAuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Public API Auth endpoints (for React Native driver/staff apps & external shop webhooks)
    Route::post('/auth/login', [ApiAuthController::class, 'login']);
    Route::post('/auth/register', [ApiAuthController::class, 'register']);

    // Protected Sanctum API endpoints (accepts either Bearer token OR Inertia stateful session)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [ApiAuthController::class, 'me']);
        Route::post('/auth/logout', [ApiAuthController::class, 'logout']);
        Route::post('/auth/logout-all', [ApiAuthController::class, 'logoutAll']);
    });
});
