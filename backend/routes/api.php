<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ServiceController;
use App\Http\Controllers\Api\V1\PortfolioController;
use App\Http\Controllers\Api\V1\TeamController;
use App\Http\Controllers\Api\V1\ClientController;
use App\Http\Controllers\Api\V1\PageController;
use App\Http\Controllers\Api\V1\FaqController;
use App\Http\Controllers\Api\V1\ContactController;
use App\Http\Controllers\Api\V1\SubscriptionController;
use App\Http\Controllers\Api\V1\SettingController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\BrandController;
use App\Http\Controllers\Api\V1\ServicePackageController;
use App\Http\Controllers\Api\V1\PaymentMethodController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\UserDashboardController;
use App\Http\Controllers\Api\V1\AuthController;

Route::prefix('v1')->group(function () {
    // Auth Routes
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::put('/me', [AuthController::class, 'updateProfile']);
        Route::put('/me/password', [AuthController::class, 'updatePassword']);
        Route::post('/logout', [AuthController::class, 'logout']);
        
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::get('/user-packages', [UserDashboardController::class, 'userPackages']);
    });

    // Services & Packages
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{service:slug}', [ServiceController::class, 'show']);
    Route::get('/service-packages', [ServicePackageController::class, 'index']);
    
    // Payments & Orders
    Route::get('/payment-methods', [PaymentMethodController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::post('/orders/{uuid}/payment-proof', [OrderController::class, 'uploadProof']);

    // Portfolios
    Route::get('/portfolios', [PortfolioController::class, 'index']);
    Route::get('/portfolios/{portfolio:slug}', [PortfolioController::class, 'show']);

    // Team
    Route::get('/team', [TeamController::class, 'index']);
    Route::get('/team/{team:id}', [TeamController::class, 'show']);

    // Clients/Testimonials
    Route::get('/clients', [ClientController::class, 'index']);

    // Content Pages
    Route::get('/pages', [PageController::class, 'index']);
    Route::get('/pages/{page:slug}', [PageController::class, 'show']);

    // FAQs
    Route::get('/faqs', [FaqController::class, 'index']);

    // Contact Message
    Route::post('/contact', [ContactController::class, 'store']);

    // Newsletter
    Route::post('/subscribe', [SubscriptionController::class, 'store']);

    // Site Settings
    Route::get('/settings', [SettingController::class, 'index']);

    // Brands
    Route::get('/brands', [BrandController::class, 'index']);

    // Blog/Posts
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{post:slug}', [PostController::class, 'show']);
});
