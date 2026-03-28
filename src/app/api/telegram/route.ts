import { NextResponse } from "next/server";
import { makeErrorResponse, makeSuccessResponse } from "@/lib/http";
import { HTTPError } from "@/lib/errors";
import { getVideoInfo } from "@/features/instagram";
import { getPostIdFromUrl } from "@/features/instagram/utils";
import { VideoInfo } from "@/types";

/**
 * Telegram Bot Webhook Handler
 * POST /api/telegram
 *
 * Set your webhook:
 * https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://yoursite.vercel.app/api/telegram
 *
 * Env variable needed: TELEGRAM_BOT_TOKEN
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function sendMessage(chatId: number, text: string, replyMarkup?: object) {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      reply_markup: replyMarkup,
    }),
  });
}

async function sendVideo(chatId: number, videoUrl: string, caption?: string) {
  await fetch(`${TELEGRAM_API}/sendVideo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      video: videoUrl,
      caption: caption ?? "Downloaded via Insta Reel Downloader ✅",
      parse_mode: "HTML",
    }),
  });
}

// GET: Info + health check (also used for direct API calls)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postUrl = searchParams.get("postUrl");

  if (!postUrl) {
    return NextResponse.json(
      { ok: true, message: "Telegram Bot API is running. POST to this endpoint for webhook, or pass ?postUrl= for direct use." },
      { status: 200 }
    );
  }

  const postId = getPostIdFromUrl(postUrl);
  if (!postId) {
    return NextResponse.json(makeErrorResponse("Invalid Instagram URL"), { status: 400 });
  }

  try {
    const videoInfo = await getVideoInfo(postId);
    return NextResponse.json(makeSuccessResponse<VideoInfo>(videoInfo), { status: 200 });
  } catch (err: any) {
    if (err instanceof HTTPError) {
      return NextResponse.json(makeErrorResponse(err.message), { status: err.status });
    }
    return NextResponse.json(makeErrorResponse("Server Error"), { status: 500 });
  }
}

// POST: Telegram webhook
export async function POST(request: Request) {
  if (!BOT_TOKEN) {
    console.error("TELEGRAM_BOT_TOKEN is not set");
    return NextResponse.json({ ok: false, error: "Bot token not configured" }, { status: 500 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const message = body?.message;
  if (!message) {
    // Could be callback_query or other update — just acknowledge
    return NextResponse.json({ ok: true });
  }

  const chatId: number = message.chat.id;
  const text: string = message.text?.trim() ?? "";
  const firstName: string = message.from?.first_name ?? "there";

  // /start command
  if (text === "/start") {
    await sendMessage(
      chatId,
      `👋 <b>Hello ${firstName}!</b>\n\nSend me any Instagram <b>Reel</b> or <b>Video</b> link and I'll download it for you instantly! 🎬\n\n<i>Example:</i>\n<code>https://www.instagram.com/reel/ABC123/</code>`
    );
    return NextResponse.json({ ok: true });
  }

  // /help command
  if (text === "/help") {
    await sendMessage(
      chatId,
      `ℹ️ <b>How to use:</b>\n\n1. Copy an Instagram Reel/Video URL\n2. Paste it here\n3. I'll send you the video directly!\n\n<b>Supported links:</b>\n• instagram.com/reel/...\n• instagram.com/p/...\n\n<b>Commands:</b>\n/start - Welcome message\n/help - This message`
    );
    return NextResponse.json({ ok: true });
  }

  // Check if it looks like an Instagram URL
  const isInstagramUrl =
    text.includes("instagram.com/reel/") || text.includes("instagram.com/p/");

  if (!isInstagramUrl) {
    await sendMessage(
      chatId,
      `❌ Please send a valid Instagram link.\n\nExample:\n<code>https://www.instagram.com/reel/ABC123/</code>`
    );
    return NextResponse.json({ ok: true });
  }

  // Processing message
  await sendMessage(chatId, "⏳ Downloading your video, please wait...");

  const postId = getPostIdFromUrl(text);
  if (!postId) {
    await sendMessage(chatId, "❌ Could not extract post ID from the URL. Please check the link.");
    return NextResponse.json({ ok: true });
  }

  try {
    const videoInfo = await getVideoInfo(postId);
    await sendVideo(
      chatId,
      videoInfo.videoUrl,
      `✅ <b>Downloaded!</b>\n📐 ${videoInfo.width}x${videoInfo.height}\n\n<i>Powered by Insta Reel Downloader</i>`
    );
  } catch (err: any) {
    const msg = err instanceof HTTPError ? err.message : "Failed to get video. The post might be private or unavailable.";
    await sendMessage(chatId, `❌ ${msg}`);
  }

  return NextResponse.json({ ok: true });
}
