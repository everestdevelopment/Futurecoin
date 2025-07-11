# Futurecoin Backend

NOTCOIN uslubidagi clicker bot uchun backend (Node.js + Express + MongoDB)

## Ishga tushirish

1. Bog‘liqliklarni o‘rnating:
   ```sh
   npm install
   ```
2. .env faylini yarating va quyidagilarni kiriting:
   ```env
   MONGODB_URI=mongodb://localhost:27017/futurecoin
   JWT_SECRET=supersecretkey
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   CLAIM_OPEN_DATE=2025-10-10
   ```
3. Serverni ishga tushiring:
   ```sh
   npm run dev
   ```

## Tuzilma
- src/controllers/ — API logikasi
- src/models/ — Ma’lumotlar bazasi sxemalari
- src/routes/ — API marshrutlari
- src/middlewares/ — Auth va error handling
- src/services/ — O‘yin, wallet, statistika va boshqalar
- src/utils/ — Yordamchi funksiyalar
- src/config/ — Konfiguratsiya
- src/app.js — Kirish nuqtasi 