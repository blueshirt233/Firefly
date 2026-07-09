import type { SiteConfig } from "@/types/siteConfig";

// Define site language
const SITE_LANG = "zh_CN";

export const siteConfig: SiteConfig = {
  // Site title
  title: "Firefly",

  // Site subtitle
  subtitle: "Demo site",

  // Site URL
  site_url: "https://firefly.cuteleaf.cn",

  // Site description
  description:
    "Firefly is a fresh and beautiful Astro blog theme based on Fuwari template.",
  
  // Site keywords
  keywords: [
    "Firefly",
    "Fuwari",
    "Astro",
    "ACGN",
    "blog",
    "tech blog",
    "static blog",
  ],

  // Theme color
  themeColor: {
    hue: 165,
    fixed: false,
    defaultMode: "system",
  },

  // Page width (rem)
  pageWidth: 100,

  // Card style
  card: {
    border: true,
    followTheme: false,
  },

  // Favicon
  favicon: [
    {
      src: "/favicon/favicon.ico",
    },
  ],

  // Navbar
  navbar: {
    logo: {
      type: "image",
      value: "assets/images/firefly.png",
      alt: "F",
    },
    title: "Firefly",
    widthFull: false,
    menuAlign: "center",
    followTheme: false,
    stickyNavbar: true,
  },

  // Site start date
  siteStartDate: "2025-01-01",

  // Timezone
  timezone: "Asia/Shanghai",

  // Page switches
  pages: {
    friends: true,
    sponsor: true,
    guestbook: true,
    bangumi: true,
    gallery: true,
    anime: true,
    shuoshuo: true,
  },

  // Category bar
  categoryBar: true,

  // Fold article
  foldArticle: true,

  // Post list layout
  postListLayout: {
    defaultMode: "list",
    mobileDefaultMode: "list",
    showTags: true,
    descriptionLines: 2,
    allowSwitch: true,
    grid: {
      masonry: false,
      columnWidth: 320,
    },
  },

  // Post config
  post: {
    rehypeCallouts: {
      theme: "github",
      enablePythonMarkdownAdmonitions: false,
    },
    showLastModified: true,
    outdatedThreshold: 30,
    sharePoster: true,
    generateOgImages: false,
  },

  // Bangumi
  bangumi: {
    userId: "1143164",
    mode: "dynamic",
    apiUrl: "https://bgmapi.anibt.net",
    subjectBaseUrl: "https://bgmmi.anibt.net/subject/",
    categoryOrder: ["anime", "book", "music", "game"],
  },

  // Anime
  anime: {
    bilibili: {
      uid: "38932988",
    },
  },

  // Pagination
  pagination: {
    postsPerPage: 10,
  },

  // Image optimization
  imageOptimization: {
    formats: "webp",
    quality: 85,
    noReferrerDomains: ["*.hdslb.com", "*.bilibili.com"],
  },

  // Site language
  lang: SITE_LANG,
};