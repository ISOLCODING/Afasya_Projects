# 📋 Master Environment Variables - Afasya Projects
> **Cara Pakai:** Salin "Key" dan "Value" di bawah ini ke Vercel Dashboard: 
> `Vercel > Your Project > Settings > Environment Variables`

---

## 🟢 Backend (Grup 1)
| Key | Value (Saran/Contoh) |
|-----|-------|
| `APP_NAME` | `Afasya Projects` |
| `APP_ENV` | `production` |
| `APP_DEBUG` | `false` |
| `APP_KEY` | `base64:SuWn3vQfOy/hFz0XcW2LRH2cBVbNtWwTWapqlOLbNaU=` |
| `APP_URL` | `https://afasya-projects.vercel.app` |
| `APP_TIMEZONE` | `Asia/Jakarta` |
| `CACHE_STORE` | `array` |
| `SESSION_DRIVER` | `cookie` |
| `QUEUE_CONNECTION` | `sync` |
| `LOG_CHANNEL` | `stderr` |
| `VIEW_COMPILED_PATH` | `/tmp` |
| `FILESYSTEM_DISK` | `public` |

## 🔵 Frontend (Grup 2)
| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://afasya-projects.vercel.app/api` |
| `VITE_APP_NAME` | `Afasya Projects` |

## 🟡 Database (Grup 3 - Wajib Diisi)
*Dapatkan nilai ini dari provider cloud database Anda (Supabase/Railway/dll)*
| Key | Value |
|-----|-------|
| `DB_CONNECTION` | `mysql` |
| `DB_HOST` | *(Isi Host Database Cloud)* |
| `DB_PORT` | `3306` |
| `DB_DATABASE` | *(Isi Nama Database)* |
| `DB_USERNAME` | *(Isi Username Database)* |
| `DB_PASSWORD` | *(Isi Password Database)* |

---
**💡 Tips:** Gunakan **Supabase** (PostgreSQL) atau **PlanetScale** (MySQL) untuk database yang stabil di lingkungan Serverless seperti Vercel.
