<?php

/**
 * Entry point untuk Vercel Serverless Function
 * 
 * File ini menjadi bridge antara Vercel PHP runtime
 * dan Laravel application yang ada di folder backend/
 * 
 * Struktur Project:
 * ├── api/
 * │   └── index.php  ← File ini (Vercel serverless entry point)
 * ├── backend/       ← Laravel application
 * │   ├── app/
 * │   ├── public/
 * │   │   └── index.php
 * │   └── ...
 * └── frontend/      ← React/Vite application
 *     └── dist/      ← Build output (served as static)
 */

// Set base path ke root project
$backendPath = __DIR__ . '/../backend';

// Override APP_BASE_PATH jika diperlukan
if (!defined('LARAVEL_START')) {
    define('LARAVEL_START', microtime(true));
}

// Forward semua request ke Laravel public/index.php
require_once $backendPath . '/public/index.php';