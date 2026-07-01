// ==================================================================
// ShuoShuo Utilities - Video embed, image path resolution helpers
// Supports: Bilibili (bvid), YouTube (youtubeId), Direct MP4
// ==================================================================

import type { ShuoShuoVideo } from "@/types/shuoshuoConfig"

// Resolve relative image paths to absolute URLs
export function resolveImagePath(image: string, entryFilePath: string): string {
  if (image.startsWith("http") || image.startsWith("data:") || image.startsWith("/")) return image
  const idx = entryFilePath.lastIndexOf("/")
  const baseDir = idx >= 0 ? entryFilePath.substring(0, idx) : ""
  const clean = image.replace(/^\.\//, "")
  return baseDir + (baseDir.endsWith("/") ? "" : "/") + clean
}

// Generate responsive Bilibili player iframe (16:9, mobile-friendly)
export function getBilibiliEmbedHtml(bvid: string, title?: string): string {
  const t = title ? `&t=${encodeURIComponent(title)}` : ""
  return `<div class="relative w-full shuoshuo-video-wrapper" style="padding-top: 56.25%"><iframe src="https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&as_wide=1${t}" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" class="absolute top-0 left-0 w-full h-full rounded-lg" loading="lazy" title="Bilibili"></iframe></div>`
}

// Generate YouTube no-cookie embed iframe
export function getYoutubeEmbedHtml(youtubeId: string): string {
  return `<iframe src="https://www.youtube-nocookie.com/embed/${youtubeId}" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen class="w-full rounded-lg" style="aspect-ratio: 16/9; min-height: 360px;" loading="lazy"></iframe>`
}

// Dispatch to correct embed function based on video type
export function renderVideoHtml(video: ShuoShuoVideo): string {
  switch (video.type) {
    case "bilibili":
      return getBilibiliEmbedHtml(video.bvid || "", video.title)
    case "youtube":
      return getYoutubeEmbedHtml(video.youtubeId || "")
    case "direct":
      return `<video controls class="w-full rounded-lg" style="max-height: 70vh;" preload="metadata"><source src="${video.src}" type="video/mp4"></video>`
    default:
      return ""
  }
}
