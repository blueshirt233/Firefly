# 说说 V3 修改方案

## 1. 删除评论配置

从 shuoshuo schema 移除 comment/password/passwordHint 字段，hello.md 删除 comment: true 行。

## 2. 标签去掉 # 前缀

每条说说卡片右下角 #{tag} -> {tag}，一行改动。

## 3. 新增标题卡片 + 标签过滤栏

### 页面布局（从上到下）

| 标题卡片 | card-base px-8 py-6, text-2xl font-bold text-(--primary) |
| 计数副标题 | 共 X 条说说（点击标签时动态更新）|
| 标签过滤栏 | card-base px-6 py-3, flex flex-wrap gap-2 按钮行 |
| 说说列表 | 按标签筛选后的卡片列表 |

### 标签过滤按钮样式

激活: bg-(--primary) text-white rounded-full px-4 py-1.5
未激活: bg-(--enter-btn-bg) text-(--primary) rounded-full px-4 py-1.5
hover: scale-105, active: scale-95, transition-all duration-200

### 过滤逻辑（客户端 JS）

1. 收集所有说说标签，去重并计算数量
2. 渲染按钮: 全部 N | 标签1 N1 | 标签2 N2 ...
3. 点击标签 -> 过滤卡片显示/隐藏
4. 同步更新标题卡片中的计数

## 4. 文件变更

| src/content.config.ts | 移除 comment/password/passwordHint |
| src/content/shuoshuo/hello.md | 移除 comment: true |
| src/pages/shuoshuo/index.astro | 新增标题+过滤栏+去#+动态计数 |

不影响任何其他页面。