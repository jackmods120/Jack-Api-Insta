# 🤖 Telegram Bot Setup Guide

## پێویستەکان / Requirements

1. **Telegram Bot Token** — لە [@BotFather](https://t.me/BotFather) وەربگرە
2. **Vercel Deployment** — پڕۆژەکە دیپلۆی بکە

---

## گامەکان / Steps

### 1. Bot دروست بکە
1. بچۆ [@BotFather](https://t.me/BotFather) لە تیلیگرام
2. بنووسە `/newbot`
3. ناوی بۆتەکەت بنووسە
4. `TOKEN`ەکەت وەردەگریت — ئەمە پاراستە بگرە!

### 2. Environment Variable زیاد بکە
لە Vercel dashboard:
```
TELEGRAM_BOT_TOKEN = 123456789:ABCdefGHIjklMNOpqrSTUvwxYZ
```

یان لە `.env.local`:
```
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrSTUvwxYZ
```

### 3. Webhook دامەزرێنە
دوای دیپلۆیکردن، ئەم URLە لە براوزەرت باز بدە:
```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://your-site.vercel.app/api/telegram
```

**نموونە:**
```
https://api.telegram.org/bot123456:ABC/setWebhook?url=https://insta-downloader.vercel.app/api/telegram
```

### 4. تاقیکردنەوە
بۆتەکەت لە تیلیگرام بکەرەوە و:
- `/start` بنووسە
- ئینستاگرام لینکێک بنێرە

---

## API Endpoints

### `GET /api/telegram`
Health check — بۆ تاقیکردنەوەی سێرڤەر.

### `GET /api/telegram?postUrl=<url>`
ڕاستەوخۆ ڤیدیۆ مەعلوماتی وەربگرە (بەبێ بۆت).

**نموونە:**
```
GET /api/telegram?postUrl=https://www.instagram.com/reel/ABC123/
```

**وەڵامی:**
```json
{
  "success": true,
  "data": {
    "filename": "ig-downloader-1234567.mp4",
    "videoUrl": "https://...",
    "width": "1080",
    "height": "1920"
  }
}
```

### `POST /api/telegram`
Telegram Webhook — خۆکارانە کاردەکات.

---

## بۆتی تیلیگرام چی دەکات؟

| کاربەر دەنێرێت | بۆت وەڵام دەداتەوە |
|---|---|
| `/start` | پێخۆشبوون + رێنمایی |
| `/help` | چۆنیەتی بەکارهێنان |
| Instagram URL | ڤیدیۆی داگرتوو |
| هەر شتێکی تر | ئاگادارکردنەوە |

---

## ⚠️ تێبینی
- بۆتەکە تەنها ڤیدیۆی **گشتی** (public) دادەگرێت
- پۆستی **تایبەتی** (private) کاری پێ ناکات
