#!/bin/bash

# ╔══════════════════════════════════════════════════════════════════╗
# ║          AFASYA PROJECTS - DEPLOYMENT SCRIPT (UNIX/MAC)         ║
# ║          Backend: Laravel 12  |  Frontend: React + Vite        ║
# ╚══════════════════════════════════════════════════════════════════╝

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

print_header() {
    echo -e "\n${CYAN}${BOLD}"
    echo "  ██████╗ ███████╗██████╗ ██╗      ██████╗ ██╗   ██╗"
    echo "  ██╔══██╗██╔════╝██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝"
    echo "  ██║  ██║█████╗  ██████╔╝██║     ██║   ██║ ╚████╔╝ "
    echo "  ██║  ██║██╔══╝  ██╔═══╝ ██║     ██║   ██║  ╚██╔╝  "
    echo "  ██████╔╝███████╗██║     ███████╗╚██████╔╝   ██║   "
    echo "  ╚═════╝ ╚══════╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   "
    echo -e "${NC}"
    echo -e "  ${BOLD}Afasya Projects - Vercel Deployment Script${NC}"
    echo "  =========================================="
    echo ""
}

info()    { echo -e "  ${BLUE}[INFO]${NC} $1"; }
success() { echo -e "  ${GREEN}[OK]${NC} $1"; }
warning() { echo -e "  ${YELLOW}[WARN]${NC} $1"; }
error()   { echo -e "  ${RED}[ERROR]${NC} $1"; }
step()    { echo -e "\n  ${CYAN}${BOLD}[$1]${NC} $2"; }

# ─────────────────────────────────────────────────────────────────
# Arguments
# ─────────────────────────────────────────────────────────────────
DEPLOY_TYPE=${1:-""}
DEPLOY_ENV=${2:-"preview"}

if [[ -z "$DEPLOY_TYPE" ]]; then
    print_header
    echo "  Pilih jenis deployment:"
    echo "  [1] preview  - Deploy sebagai preview (untuk testing)"
    echo "  [2] full     - Deploy backend + frontend bersama"
    echo "  [3] backend  - Deploy hanya backend (Laravel)"
    echo "  [4] frontend - Deploy hanya frontend (React)"
    echo ""
    read -rp "  Masukkan pilihan (1-4): " CHOICE
    
    case $CHOICE in
        1) DEPLOY_TYPE="preview" ;;
        2) DEPLOY_TYPE="full" ;;
        3) DEPLOY_TYPE="backend" ;;
        4) DEPLOY_TYPE="frontend" ;;
        *) DEPLOY_TYPE="preview" ;;
    esac
fi

print_header
info "Deployment Type: $DEPLOY_TYPE"
info "Environment: $DEPLOY_ENV"

# ─────────────────────────────────────────────────────────────────
# STEP 1: Validasi tools
# ─────────────────────────────────────────────────────────────────
step "STEP 1" "Validasi tools yang dibutuhkan..."

if ! command -v vercel &> /dev/null; then
    error "Vercel CLI belum terinstall!"
    info "Jalankan: npm install -g vercel"
    exit 1
fi
success "Vercel CLI ditemukan"

if ! command -v node &> /dev/null; then
    error "Node.js tidak ditemukan!"
    exit 1
fi
success "Node.js ditemukan"

if ! command -v composer &> /dev/null; then
    warning "Composer tidak ditemukan di PATH"
else
    success "Composer ditemukan"
fi

# ─────────────────────────────────────────────────────────────────
# STEP 2: Cek autentikasi Vercel
# ─────────────────────────────────────────────────────────────────
step "STEP 2" "Mengecek autentikasi Vercel..."

if ! vercel whoami &> /dev/null; then
    info "Belum login ke Vercel. Melakukan login..."
    vercel login
fi

VERCEL_USER=$(vercel whoami)
success "Login sebagai: $VERCEL_USER"

# ─────────────────────────────────────────────────────────────────
# STEP 3: Build Frontend (jika diperlukan)
# ─────────────────────────────────────────────────────────────────
if [[ "$DEPLOY_TYPE" == "full" || "$DEPLOY_TYPE" == "frontend" ]]; then
    step "STEP 3" "Building Frontend (React + Vite)..."
    
    cd frontend
    
    if [[ ! -d "node_modules" ]]; then
        info "Menginstall dependencies frontend..."
        npm install
    fi
    
    info "Building untuk production..."
    npm run build
    
    if [[ ! -d "dist" ]]; then
        error "Build gagal! Folder dist tidak ditemukan."
        exit 1
    fi
    
    success "Frontend berhasil di-build ke frontend/dist/"
    cd ..
else
    step "STEP 3" "Skip build frontend"
fi

# ─────────────────────────────────────────────────────────────────
# STEP 4: Prepare Backend (jika diperlukan)
# ─────────────────────────────────────────────────────────────────
if [[ "$DEPLOY_TYPE" == "full" || "$DEPLOY_TYPE" == "backend" ]]; then
    step "STEP 4" "Mempersiapkan Backend (Laravel 12)..."
    
    cd backend
    
    if [[ ! -d "vendor" ]]; then
        if ! command -v composer &> /dev/null; then
            error "Composer tidak ditemukan! Install di https://getcomposer.org"
            exit 1
        fi
        info "Menginstall Composer dependencies..."
        composer install --no-dev --optimize-autoloader
    fi
    
    info "Optimasi Laravel untuk production..."
    php artisan config:cache --ansi 2>/dev/null || warning "config:cache dilewati"
    php artisan route:cache --ansi 2>/dev/null || warning "route:cache dilewati"
    php artisan view:cache --ansi 2>/dev/null || warning "view:cache dilewati"
    
    success "Backend siap untuk deploy"
    cd ..
else
    step "STEP 4" "Skip prepare backend"
fi

# ─────────────────────────────────────────────────────────────────
# STEP 5: Deploy ke Vercel
# ─────────────────────────────────────────────────────────────────
step "STEP 5" "Deploying ke Vercel..."

DEPLOY_FLAGS="-y --no-wait"
if [[ "$DEPLOY_ENV" == "production" ]]; then
    DEPLOY_FLAGS="$DEPLOY_FLAGS --prod"
fi

vercel deploy . $DEPLOY_FLAGS

echo ""
echo -e "  ${GREEN}${BOLD}═══════════════════════════════════════════════${NC}"
echo -e "  ${GREEN}${BOLD} ✅ DEPLOYMENT BERHASIL!${NC}"
echo -e "  ${GREEN}${BOLD}═══════════════════════════════════════════════${NC}"
echo ""
info "Gunakan perintah berikut untuk melihat URL:"
echo "     vercel inspect [deployment-url]"
echo "     vercel ls"
echo ""
info "Atau buka: https://vercel.com/dashboard"
echo ""
