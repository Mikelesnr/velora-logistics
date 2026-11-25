<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SystemUserRoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'appName' => config('app.name'),
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    // System Admin only: promote/assign system_admin, system_staff, system_accountant, system_it_support, or shop roles
    Route::middleware(['role:system_admin'])->prefix('system')->name('system.')->group(function () {
        Route::patch('/users/{user}/role', [SystemUserRoleController::class, 'update'])->name('users.role.update');
    });
});

require __DIR__.'/auth.php';
