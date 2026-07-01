# ShuoShuo Guide

## Creating a New ShuoShuo

### Step 1: Create a .md file

Place a new `.md` file in `src/content/shuoshuo/`. The filename becomes the URL slug.

Example: `src/content/shuoshuo/my-moment.md` -> `/shuoshuo/my-moment/`

### Step 2: Write Frontmatter

```yaml
---
published: 2025-06-30          # Required: publish date (YYYY-MM-DD)
images:                        # Optional: image URLs
  - https://example.com/1.jpg
  - https://example.com/2.jpg
videos:                        # Optional: embedded videos
  - type: bilibili             # Video type: bilibili / youtube / direct
    bvid: BV1GJ411x7h7         # Bilibili BV ID
    title: My Video            # Optional: video title
tags: [daily, photography]     # Optional: tags
pinned: true                   # Optional: pin to top
draft: false                   # Optional: draft mode (dev-only)
comment: true                  # Optional: enable comments
---
```

### Step 3: Write Markdown Body

After the `---` closing line, write your Markdown content. Standard Markdown syntax is supported (bold, links, lists, etc).

## Video Embed Types

### Bilibili
```yaml
videos:
  - type: bilibili
    bvid: BV1GJ411x7h7        # From URL: bilibili.com/video/BVxxx
    title: Optional Title
```

### YouTube
```yaml
videos:
  - type: youtube
    youtubeId: dQw4w9WgXcQ    # From URL: youtube.com/watch?v=xxx
```

### Direct MP4
```yaml
videos:
  - type: direct
    src: https://example.com/video.mp4
    title: My Direct Video
```

## Configuration

Edit `src/config/shuoshuoConfig.ts`:

| Key | Default | Description |
|-----|---------|-------------|
| `enable` | `true` | Enable/disable shuoshuo feature |
| `postsPerPage` | `10` | Items per page |
| `maxGridImages` | `9` | Max thumbnail images in list grid |
| `showTags` | `true` | Show tags on list page |

Toggle navigation visibility via `src/config/siteConfig.ts`:
```ts
pages: {
  shuoshuo: true,  // Show in nav bar
}
```

## Font Settings

Shuoshuo body font can be customized in `src/config/fontConfig.ts`:
```ts
shuoshuoBodyFont: \"--font-inter\",  // Or any registered font variable
```

## Example Posts

See `src/content/shuoshuo/` for 4 examples:

| File | Description |
|------|-------------|
| `hello.md` | Basic: 2 images + tags + pinned |
| `photo-demo.md` | Multi-image: 11 photos (9-grid + overflow badge) |
| `bilibili-demo.md` | Video: Bilibili embed |
| `mixed-demo.md` | Mixed: images + video together |