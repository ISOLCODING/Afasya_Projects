@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

:: ╔══════════════════════════════════════════════════════════════════╗
:: ║          AFASYA PROJECTS - DEPLOYMENT SCRIPT (WINDOWS)          ║
:: ║          Backend: Laravel 12  |  Frontend: React + Vite        ║
:: ╚══════════════════════════════════════════════════════════════════╝

echo.
echo  ██████╗ ███████╗██████╗ ██╗      ██████╗ ██╗   ██╗
echo  ██╔══██╗██╔════╝██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝
echo  ██║  ██║█████╗  ██████╔╝██║     ██║   ██║ ╚████╔╝ 
echo  ██║  ██║██╔══╝  ██╔═══╝ ██║     ██║   ██║  ╚██╔╝  
echo  ██████╔╝███████╗██║     ███████╗╚██████╔╝   ██║   
echo  ╚═════╝ ╚══════╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   
echo.
echo  Afasya Projects - Vercel Deployment Script
echo  ==========================================
echo.

:: Cek parameter
SET DEPLOY_TYPE=%1
SET DEPLOY_ENV=%2

IF "%DEPLOY_TYPE%"=="" (
    echo  Pilih jenis deployment:
    echo  [1] Preview  - Deploy sebagai preview (untuk testing)
    echo  [2] Full     - Deploy backend + frontend
    echo  [3] Backend  - Deploy hanya backend (Laravel)
    echo  [4] Frontend - Deploy hanya frontend (React)
    echo.
    SET /P CHOICE="  Masukkan pilihan (1-4): "
    
    IF "!CHOICE!"=="1" SET DEPLOY_TYPE=preview
    IF "!CHOICE!"=="2" SET DEPLOY_TYPE=full
    IF "!CHOICE!"=="3" SET DEPLOY_TYPE=backend
    IF "!CHOICE!"=="4" SET DEPLOY_TYPE=frontend
)

IF "%DEPLOY_ENV%"=="" SET DEPLOY_ENV=preview

echo.
echo  [INFO] Deployment Type: %DEPLOY_TYPE%
echo  [INFO] Environment: %DEPLOY_ENV%
echo.

:: ─────────────────────────────────────────────────────────────────
:: STEP 1: Validasi tools
:: ─────────────────────────────────────────────────────────────────
echo  [STEP 1] Validasi tools yang dibutuhkan...

WHERE vercel >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] Vercel CLI belum terinstall!
    echo  Jalankan: npm install -g vercel
    pause
    EXIT /B 1
)
echo  [OK] Vercel CLI ditemukan

WHERE composer >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo  [WARN] Composer tidak ditemukan di PATH
) ELSE (
    echo  [OK] Composer ditemukan
)

WHERE node >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] Node.js tidak ditemukan!
    pause
    EXIT /B 1
)
echo  [OK] Node.js ditemukan
echo.

:: ─────────────────────────────────────────────────────────────────
:: STEP 2: Cek autentikasi Vercel
:: ─────────────────────────────────────────────────────────────────
echo  [STEP 2] Mengecek autentikasi Vercel...

vercel whoami >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo  [INFO] Belum login ke Vercel. Melakukan login...
    vercel login
    IF %ERRORLEVEL% NEQ 0 (
        echo  [ERROR] Login gagal! Periksa koneksi internet Anda.
        pause
        EXIT /B 1
    )
)

FOR /F "tokens=*" %%i IN ('vercel whoami') DO SET VERCEL_USER=%%i
echo  [OK] Login sebagai: %VERCEL_USER%
echo.

:: ─────────────────────────────────────────────────────────────────
:: STEP 3: Build Frontend
:: ─────────────────────────────────────────────────────────────────
IF "%DEPLOY_TYPE%"=="full" GOTO BUILD_FRONTEND
IF "%DEPLOY_TYPE%"=="frontend" GOTO BUILD_FRONTEND
GOTO SKIP_FRONTEND_BUILD

:BUILD_FRONTEND
echo  [STEP 3] Building Frontend (React + Vite)...
cd frontend

IF NOT EXIST node_modules (
    echo  [INFO] Menginstall dependencies frontend...
    npm install
    IF %ERRORLEVEL% NEQ 0 (
        echo  [ERROR] npm install gagal!
        cd ..
        pause
        EXIT /B 1
    )
)

echo  [INFO] Building untuk production...
npm run build
IF %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] Build frontend gagal! Periksa error di atas.
    cd ..
    pause
    EXIT /B 1
)

echo  [OK] Frontend berhasil di-build ke frontend/dist/
cd ..
echo.
GOTO STEP4

:SKIP_FRONTEND_BUILD
echo  [STEP 3] Skip build frontend (tidak diperlukan)
echo.

:STEP4
:: ─────────────────────────────────────────────────────────────────
:: STEP 4: Build Backend (Laravel)
:: ─────────────────────────────────────────────────────────────────
IF "%DEPLOY_TYPE%"=="full" GOTO BUILD_BACKEND
IF "%DEPLOY_TYPE%"=="backend" GOTO BUILD_BACKEND
GOTO SKIP_BACKEND_BUILD

:BUILD_BACKEND
echo  [STEP 4] Mempersiapkan Backend (Laravel 12)...
cd backend

IF NOT EXIST vendor (
    echo  [INFO] Menginstall Composer dependencies...
    WHERE composer >nul 2>&1
    IF %ERRORLEVEL% NEQ 0 (
        echo  [ERROR] Composer tidak ditemukan! Install di https://getcomposer.org
        cd ..
        pause
        EXIT /B 1
    )
    composer install --no-dev --optimize-autoloader
    IF %ERRORLEVEL% NEQ 0 (
        echo  [ERROR] Composer install gagal!
        cd ..
        pause
        EXIT /B 1
    )
)

echo  [INFO] Optimasi Laravel untuk production...
php artisan config:cache --ansi 2>nul || echo  [WARN] config:cache dilewati
php artisan route:cache --ansi 2>nul || echo  [WARN] route:cache dilewati
php artisan view:cache --ansi 2>nul || echo  [WARN] view:cache dilewati

echo  [OK] Backend siap untuk deploy
cd ..
echo.
GOTO STEP5

:SKIP_BACKEND_BUILD
echo  [STEP 4] Skip build backend (tidak diperlukan)
echo.

:STEP5
:: ─────────────────────────────────────────────────────────────────
:: STEP 5: Deploy ke Vercel
:: ─────────────────────────────────────────────────────────────────
echo  [STEP 5] Deploying ke Vercel...

SET DEPLOY_FLAGS=-y --no-wait
IF "%DEPLOY_ENV%"=="production" SET DEPLOY_FLAGS=%DEPLOY_FLAGS% --prod

vercel deploy . %DEPLOY_FLAGS%
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo  [ERROR] Deployment gagal!
    echo  Tips troubleshooting:
    echo  1. Pastikan sudah login: vercel login
    echo  2. Cek vercel.json sudah benar
    echo  3. Lihat error log di atas
    pause
    EXIT /B 1
)

echo.
echo  ═══════════════════════════════════════════════
echo   ✅ DEPLOYMENT BERHASIL!
echo  ═══════════════════════════════════════════════
echo.
echo  Gunakan perintah berikut untuk melihat URL:
echo    vercel inspect [deployment-url]
echo    vercel ls
echo.
echo  Atau buka: https://vercel.com/dashboard
echo.

ENDLOCAL
pause
