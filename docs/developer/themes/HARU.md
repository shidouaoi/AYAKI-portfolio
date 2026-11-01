# Haru 主题开发

Haru 基于 Danbouru，主题目录为 themes/haru，Notion THEME 设置为 haru。

- index.js：布局与导航上下文；子组件只引用 @/themes/haru 的 useNavGlobal。
- style.js：样式根为 #theme-haru，CSS 类及变量前缀为 haru-。
- config.js：默认配置；独立配置键为 HARU_GALLERY_CATEGORIES、HARU_GALLERY_TAGS、HARU_HOME_HIDDEN_CATEGORIES、HARU_MENU_COLLAPSED。环境变量为 NEXT_PUBLIC_HARU_MENU_COLLAPSED。
- homeTopics.js：首页专题，当前为空。
- lib/gallery.js：Haru 图库分类与分组；分页由 lib/gallery/pagination.js 共用。
- lib/db/notion/galleryPosts.js：按当前主题选择图库规则，同时支持 Haru 与 Danbouru。

保留原作者署名及旧图片代理地址的兼容处理；Haru 不加载 Live2D，复制过来的 components/Live2DWidget.js 当前无引用，可删除。
说明文档须放在 docs 中，不能放到主题目录，避免动态导入扫描 Markdown。

当前保持原布局，后续可直接从以上入口进行设计调整。

## 首页视觉版本

首页组件：themes/haru/components/HaruHome.js；样式：themes/haru/homeStyle.js。首页单独使用无侧栏布局，内页保留原布局。

杂谈严格匹配分类“杂谈”，按发表时间取最新一篇正文及最新五篇列表。加锁文章不读取正文。不存在该分类时显示空状态。

作品配置统一在 themes/haru/homeTopics.js：src（图片路径）、href（点击地址）、category（文章分类）、title、description、note、icon（FA 类名）、limit（文章数）。目前用数据库已有的“技术分享”分类展示四篇真实文章；请替换为自己的作品内容。src 留空时回退到文章封面。

背景、从设计稿提取的两处标题字、favicon 放在 public/haru/。全站 favicon.ico/png/webp 已替换。头像继续读取 Notion 数据库 icon。悬停强调色 #f57b66，卡片保留向右下移动并收起阴影的效果。
