import {
  type NavBarConfig,
  type NavBarLink,
  type NavBarSearchConfig,
  NavBarSearchMethod,
} from "../types/navBarConfig";

// ============================================================================
// 导航栏配置
// ============================================================================
const getDynamicNavBarConfig = (): NavBarConfig => {
  const links: NavBarLink[] = [
    LinkPresets.Home,
  ];

  // 文章
  links.push({
    name: "文章", url: "#", icon: "material-symbols:article",
    children: [LinkPresets.Archive, LinkPresets.Categories, LinkPresets.Tags],
  });

  links.push(LinkPresets.Friends);
  links.push(LinkPresets.Guestbook);

  // 我的 — 音乐可视化排第一
  links.push({
    name: "我的", url: "#", icon: "material-symbols:person",
    children: [
      LinkPresets.MusicVisualizer,
      LinkPresets.Gallery,
      LinkPresets.shuoshuo,
      LinkPresets.Anime,
      LinkPresets.Bangumi,
    ],
  });

  // 关于
  links.push({
    name: "关于", url: "#", icon: "material-symbols:info",
    children: [LinkPresets.Sponsor, LinkPresets.About],
  });

  // 链接
  links.push({
    name: "链接", url: "#", icon: "material-symbols:link",
    children: [
      { name: "GitHub", url: "https://github.com/CuteLeaf/Firefly", external: true, icon: "fa7-brands:github" },
      { name: "Gitee", url: "https://gitee.com/CuteLeaf/Firefly", external: true, icon: "fa7-brands:gitee" },
      { name: "QQ交流群", url: "https://qm.qq.com/q/ZGsFa8qX2G", external: true, icon: "fa7-brands:qq" },
      { name: "Firefly文档", url: "https://docs-firefly.cuteleaf.cn", external: true, icon: "material-symbols:docs" },
    ],
  });

  return { links } as NavBarConfig;
};

export const navBarSearchConfig: NavBarSearchConfig = {
  method: NavBarSearchMethod.PageFind,
};

export const LinkPresets: Record<string, NavBarLink> = {
  Home: { name: "主页", url: "/", icon: "material-symbols:home" },
  Archive: { name: "归档", url: "/archive/", icon: "material-symbols:archive" },
  Categories: { name: "分类", url: "/categories/", icon: "material-symbols:folder-open-rounded" },
  Tags: { name: "标签", url: "/tags/", icon: "material-symbols:tag-rounded" },
  Friends: { name: "友链", url: "/friends/", icon: "material-symbols:group", pageKey: "friends" },
  Sponsor: { name: "打赏", url: "/sponsor/", icon: "material-symbols:favorite", pageKey: "sponsor" },
  Guestbook: { name: "留言", url: "/guestbook/", icon: "material-symbols:chat", pageKey: "guestbook" },
  About: { name: "关于我", url: "/about/", icon: "material-symbols:person" },
  Bangumi: { name: "番组计划", url: "/bangumi/", icon: "material-symbols:movie", pageKey: "bangumi" },
  Gallery: { name: "相册", url: "/gallery/", icon: "material-symbols:photo-library", pageKey: "gallery" },
  shuoshuo: { name: "说说", url: "/shuoshuo/", icon: "material-symbols:chat-bubble-rounded", pageKey: "shuoshuo" },
  Anime: { name: "追番", url: "/anime/", icon: "material-symbols:live-tv", pageKey: "anime" },
  MusicVisualizer: {
    name: "音乐可视化",
    url: "/music-visualizer/",
    icon: "material-symbols:music-note-rounded",
    pageKey: "musicVisualizer",
  },
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();