/* eslint-disable react/no-unknown-property */
import CONFIG from './config'
import { themeConsoleStyle } from '@/lib/themeConsoleStyle'
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
/* 全局CSS是叫GPT整理的，有啥问题它可以负责 */
/* 叫GPT写的，写的很烂，后续再优化——不是，VS你怎么骂人啊，要不你写个？ */
const Style = () => {
  return <style jsx global>{`
    body {
        background-color: #fbfbfb;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        -webkit-font-smoothing: antialiased;
    }
    /* 主题专属变量 */
    #theme-haru {
        font-family: "Hiragino Maru Gothic Pro", "BIZ UDGothic", Roboto, HelveticaNeue, Arial, sans-serif;
        --haru-accent: #cb912f;
        --haru-accent-soft: #d0fff2;
        --haru-line: #22222213;
        --haru-shadow-clear: #2222220c;
        --haru-hover-gray: #f3f3f3;
        --haru-radius-sm: 6px;
        --haru-radius-md: 8px;
        --haru-radius-lg: 12px;

        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 13px;
    }
    /* 主题专属选中样式 */
    #theme-haru ::selection {
        background-color: var(--haru-accent);
        color: #ffffff;
    }

    #theme-haru ::-moz-selection {
        background-color: var(--haru-accent);
        color: #ffffff;
    }
    #top-wrapper img {
        height: 44px;
    }
    /*#top-nav {
        background-color: rgb(251 251 251 / 70%);
    }*/
    /* haru专用：修改文章页正文宽度 */
    #theme-haru #container {
        width: 100%;
        max-width: 500px;
    }
    /* haru专用：关闭 NotionNext 默认懒加载灰色动画 */
    .lazy-image-placeholder {
        background: transparent !important;
        background-image: none !important;
        animation: none !important;
    }
    #theme-haru .notion-callout {
        border-radius: 10px !important;
        border-width: inherit !important;
        /* border-style: solid !important; */
    }
    #theme-haru .notion-callout > .notion-callout-text {
        padding-top: 10px;
  }

    #theme-haru input[name='search'] {
        border: 2px solid transparent !important;
    }

    #theme-haru input[name='search']:focus {
        box-shadow: none !important;
        border-color: var(--haru-accent) !important;
    }
    /* =========================
       Notion Inline Code
       ========================= */

    #theme-haru .notion-inline-code {
        display: inline-flex !important;
        align-items: center !important;

        box-sizing: border-box !important;

        padding: 2px 5px !important;

        border-radius: var(--haru-radius-sm) !important;

        background-color: rgba(135, 131, 120, 0.12) !important;

        color: #eb5757 !important;

        font-family:
            "SFMono-Regular",
            Consolas,
            "Liberation Mono",
            Menlo,
            monospace !important;

        font-size: 0.9em !important;
        line-height: 1.4 !important;

        vertical-align: middle !important;

        white-space: normal !important;
        overflow-wrap: anywhere !important;
        word-break: break-word !important;

        box-shadow: none !important;
        border: none !important;

        margin: 0 5px;
    }
    /* =========================
       文章底部信息
       分类 / Tag / 日期 三行
       ========================= */

    #theme-haru .post-footer-meta {
        display: flex !important;
        flex-direction: column !important;
        flex-wrap: nowrap !important;
        align-items: flex-start !important;

        gap: 6px !important;
    }

    /* 三行全部占满一行 */
    #theme-haru .post-footer-category,
    #theme-haru .post-footer-tags,
    #theme-haru .post-footer-date-row {
        width: 100% !important;
        flex: none !important;
    }

    /* 分类 */
    #theme-haru .post-footer-category {
        display: flex !important;
        align-items: center !important;
    }

    /* Tag */
    #theme-haru .post-footer-tags {
        display: flex !important;
        align-items: center !important;
        flex-wrap: wrap !important;
    }
    /* 三行图标统一占固定宽度 */
    #theme-haru .post-footer-category > i,
    #theme-haru .post-footer-tags > i,
    #theme-haru .post-footer-date-row i {
        display: inline-flex;
        align-items: center;
        justify-content: center;

        width: 18px;
        min-width: 18px;

        margin-right: 6px !important;
        padding: 0 !important;

        text-align: center;
    }

    /* 修改日期前的斜杠 */
    #theme-haru .post-footer-date-edited::before {
        content: '/';
        margin: 0 1rem;
    }
    /* 文章底部 Tag */
    #theme-haru .haru-footer-tag {
        border-radius: var(--haru-radius-sm);
    }

    /* Tag hover：姜黄色 */
    #theme-haru .haru-footer-tag:hover {
        background-color: var(--haru-accent) !important;
        color: #ffffff !important;
        box-shadow: none !important;
    }

    /* 内部文字也变白 */
    #theme-haru .haru-footer-tag:hover * {
        color: #ffffff !important;
    }
    /* Bookmark：和首页 .card 保持一致 */
    #theme-haru .notion-bookmark {
        cursor: pointer;

        /* 圆角 */
        border-radius: var(--haru-radius-lg) !important;

        /* 不撑满正文，给 hover 位移留空间 */
        width: calc(100% - 8px) !important;
        max-width: 500px;

        /* 提前预留边框 */
        border: 2px solid var(--haru-line) !important;

        /* 普通状态：浅色实心阴影 */
        box-shadow: 4px 4px 0 var(--haru-line) !important;

        transition:
            transform 0.18s ease,
            box-shadow 0.18s ease,
            border-color 0.18s ease !important;
    }

    #theme-haru .notion-bookmark:hover {
        transform: translate(2px, 2px);
        box-shadow: 0 0 0 var(--haru-shadow-clear) !important;
        border-color: var(--haru-accent) !important;
        background-color: inherit !important;
    }

    /* hover 不改变文字颜色 */
    #theme-haru .notion-bookmark:hover,
    #theme-haru .notion-bookmark:hover * {
        color: inherit !important;
    }

    @media (prefers-reduced-motion: reduce) {
        #theme-haru .notion-bookmark {
            transition: none !important;
        }
    }
    /* haru专用：修改代码框 */

    /* =========================
       Haru：Notion 代码块
       ================================================== */

    /* 整个代码框外壳 */
    #theme-haru .code-toolbar {
        position: relative !important;

        display: flex !important;
        flex-direction: column !important;

        width: 100% !important;
        max-width: 100% !important;

        margin: 1.5rem 0 !important;
        padding: 0 !important;

        /* 与首页 card 更接近的浅灰 */
        background: #f6f6f6 !important;

        border: 1px solid #e3e3e3 !important;
        border-radius: var(--haru-radius-lg) !important;

        overflow: hidden !important;

        box-shadow: none !important;
    }

    /* 清掉可能造成底部渐变 / 阴影的伪元素 */
    #theme-haru .code-toolbar::before,
    #theme-haru .code-toolbar::after {
        content: none !important;
        display: none !important;
        background: none !important;
        box-shadow: none !important;
    }

    /* =========================
       顶部工具栏
       ================================================== */

    #theme-haru .code-toolbar > .toolbar {
        order: 1 !important;

        position: static !important;
        inset: auto !important;
        transform: none !important;

        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;

        width: 100% !important;
        min-height: 36px !important;

        box-sizing: border-box !important;

        margin: 0 !important;
        padding: 0 12px !important;

        /* 比正文稍微深一点 */
        background: #ededed !important;

        border: 0 !important;
        border-bottom: 1px solid #dfdfdf !important;

        box-shadow: none !important;

        color: #777777 !important;

        font-size: 11px !important;
        line-height: 1 !important;

        opacity: 1 !important;
        visibility: visible !important;
    }

    /* 防止 Prism hover 才显示 */
    #theme-haru .code-toolbar:hover > .toolbar {
        opacity: 1 !important;
        visibility: visible !important;
    }

    /* toolbar 每一项 */
    #theme-haru .code-toolbar > .toolbar .toolbar-item {
        display: flex !important;
        align-items: center !important;

        margin: 0 !important;
        padding: 0 !important;

        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
    }

    /* Plain text */
    #theme-haru .code-toolbar > .toolbar .toolbar-item > span {
        margin: 0 !important;
        padding: 0 !important;

        color: #777777 !important;
        background: transparent !important;

        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;

        font-size: 11px !important;
        line-height: 1 !important;
    }

    /* Prism 自带的 Copy 文字按钮 */
    #theme-haru .code-toolbar .copy-to-clipboard-button {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;

        margin: 0 !important;
        padding: 4px 7px !important;

        border: 0 !important;
        border-radius: var(--haru-radius-sm) !important;

        background: transparent !important;
        box-shadow: none !important;

        color: #777777 !important;

        font-size: 11px !important;
        line-height: 1 !important;

        cursor: pointer;

        transition:
            background-color 0.15s ease,
            color 0.15s ease !important;
    }

    #theme-haru .code-toolbar .copy-to-clipboard-button:hover {
        background: var(--haru-accent) !important;
        color: #ffffff !important;
    }

    /* =========================
       真正的代码区域
       ================================================== */

    #theme-haru .code-toolbar > pre.notion-code {
        order: 2 !important;

        position: relative !important;

        display: block !important;

        width: 100% !important;
        max-width: 100% !important;

        box-sizing: border-box !important;

        margin: 0 !important;

        padding: 16px 18px 18px !important;

        background: #f6f6f6 !important;

        border: 0 !important;
        border-radius: 0 !important;

        box-shadow: none !important;

        overflow-x: hidden !important;
        overflow-y: visible !important;

        white-space: pre-wrap !important;

        font-size: 13px !important;
        line-height: 1.7 !important;
    }

    /* 真正的代码文字 */
    #theme-haru .code-toolbar > pre.notion-code > code {
        display: block !important;

        width: 100% !important;
        max-width: 100% !important;

        box-sizing: border-box !important;

        margin: 0 !important;
        padding: 0 !important;

        background: transparent !important;

        white-space: pre-wrap !important;
        overflow-wrap: anywhere !important;
        word-break: break-word !important;

        overflow: visible !important;

        font-size: 13px !important;
        line-height: 1.7 !important;
    }

    /* 清掉 pre 自己可能产生的阴影/渐变 */
    #theme-haru .code-toolbar > pre.notion-code::before,
    #theme-haru .code-toolbar > pre.notion-code::after {
        content: none !important;
        display: none !important;

        background: none !important;
        box-shadow: none !important;
    }

    /* =========================
       隐藏 pre 内部重复的 Copy SVG
       ================================================== */

    #theme-haru .code-toolbar .notion-code-copy {
        display: none !important;
    }

    /* =========================
       深色模式
       ================================================== */

    .dark #theme-haru .code-toolbar {
        background: #2b2b2b !important;
        border-color: #424242 !important;
        box-shadow: none !important;
    }

    .dark #theme-haru .code-toolbar > .toolbar {
        background: #333333 !important;
        border-bottom-color: #434343 !important;

        color: #b8b8b8 !important;
    }

    .dark #theme-haru .code-toolbar > .toolbar .toolbar-item > span {
        background: transparent !important;
        box-shadow: none !important;
        color: #b8b8b8 !important;
    }

    .dark #theme-haru .code-toolbar .copy-to-clipboard-button {
        color: #b8b8b8 !important;
    }

    .dark #theme-haru .code-toolbar .copy-to-clipboard-button:hover {
        background: var(--haru-accent) !important;
        color: #ffffff !important;
    }

    .dark #theme-haru .code-toolbar > pre.notion-code {
        background: #2b2b2b !important;
    }

    /* 减少动画 */
    @media (prefers-reduced-motion: reduce) {
        #theme-haru .code-toolbar .copy-to-clipboard-button {
            transition: none !important;
        }
    }

    /* haru专用：修改代码框结束 */
    /* haru专用：修改无序列表 */
    /* =========================
       Haru：无序列表
       ========================= */

    /* 无序列表整体 */
    #theme-haru .notion-list-disc {
        margin-top: 0rem !important;
        margin-bottom: 0rem !important;
        padding-left: 1.4rem !important;
    }
    /* 无序列表 + 有序列表，所有层级统一 */
    #theme-haru .notion-list-disc li,
    #theme-haru .notion-list-numbered li {
        line-height: 1.6rem !important;

        margin-top: 0 !important;
        margin-bottom: 0 !important;
    }
    /* 圆点改成姜黄色 */
    #theme-haru .notion-list-disc > li::marker {
        color: var(--haru-accent) !important;
    }
    #theme-haru .notion-list-disc .notion-list-disc {
        margin-top: 0rem !important;
        margin-bottom: 0rem !important;
    }
    #theme-haru .notion-list-disc .notion-list-disc > li {
        list-style-type: circle !important;
    }

    /* =========================
       Haru：Checkbox
       ========================= */

    /* 外层只负责承载，不画框 */
    #theme-haru .notion-property-checkbox {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;

        margin-top: 8px !important;
        padding: 0 !important;
        border: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
    }

    /* 未选中 */
    #theme-haru .notion-property-checkbox-unchecked {
        width: 16px !important;
        height: 16px !important;

        box-sizing: border-box !important;

        border: 2px solid var(--haru-line) !important;
        border-radius: 5px !important;

        background: transparent !important;
    }

    /* 已选中 */
    #theme-haru .notion-property-checkbox-checked {
        width: 16px !important;
        height: 16px !important;

        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;

        box-sizing: border-box !important;

        padding: 2px !important;

        border: 2px solid var(--haru-accent) !important;
        border-radius: 5px !important;

        background-color: var(--haru-accent) !important;
    }

    /* 白色勾勾 */
    #theme-haru .notion-property-checkbox-checked svg {
        display: block !important;

        width: 100% !important;
        height: 100% !important;

        margin: 0 !important;

        fill: #ffffff !important;

        transform: none !important;
    }
    /* Todo：checkbox 始终和第一行文字对齐 */
    #theme-haru .notion-to-do-item {
        align-items: flex-start !important;
    }
    /* haru专用：checkbox结束 */

    /* Category / Tag 索引页共用 */
    #theme-haru .haru-taxonomy-list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;

        background: transparent !important;
    }

    /* 单个 Category / Tag */
    #theme-haru .haru-taxonomy-item {
        display: inline-flex;
        align-items: center;

        padding: 5px 9px;
        border-radius: var(--haru-radius-sm);

        font-size: 15px;
        line-height: 1.5;

        color: inherit;
        background: transparent;

        cursor: pointer;

        transition:
            background-color 0.18s ease,
            color 0.18s ease;
    }

    /* hover：与文章底部 Tag 统一 */
    #theme-haru .haru-taxonomy-item:hover {
        background-color: var(--haru-accent) !important;
        color: #fff !important;
    }
    /* haru专用：Category / Tag 索引页共用开始 */
    #theme-haru .haru-taxonomy-item:hover * {
        color: #fff !important;
    }

    #theme-haru .haru-page-title {
        display: flex;
        align-items: flex-start;
        gap: 6px;

        font-size: 1.875rem;
        line-height: 2.25rem;
        padding-top: 1rem;
        margin-bottom: 1.25rem;
    }



    #theme-haru .haru-page-title > i {
        flex: 0 0 auto;
        margin-top: 0.18em;
    }

    #theme-haru .haru-page-title > img {
        width: 32px;
        height: 32px;

        flex: 0 0 auto;

        margin: 0.18em 0 0 0 !important;

        object-fit: contain;
    }

    @media (min-width: 768px) {
        #theme-haru .haru-page-title {
            padding-top: 3rem;
        }
    }
    /* Tag 页面：横向排列并自动换行 */
    #theme-haru #tags-list.haru-taxonomy-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 8px;

        width: 100%;
        max-width: 500px;
    }

    /* Tag 项目保持内容宽度，不拉伸 */
    #theme-haru #tags-list .haru-taxonomy-item {
        width: auto;
        flex: 0 0 auto;
    }
    /* haru专用：Category / Tag 索引页共用结束 */
    /* =========================
       Archive
       ========================= */

    /* 月份标题 */
    #theme-haru .haru-archive-month {
        padding-top: 28px;
        padding-bottom: 8px;

        font-size: 17px;
        line-height: 1.5;
        font-weight: 500;
    }

    /* 每个月下面的文章列表 */
    #theme-haru .haru-archive-posts {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;

        margin: 0;
        padding: 0;
        list-style: none;
    }
    #theme-haru .haru-archive-posts > li {
        margin: 0;
        padding: 0;
    }

    /* 单篇归档文章：沿用首页 .card 的视觉语言 */
    #theme-haru .haru-archive-card {
        display: block;
        width: 200px;

        padding: 11px 14px;

        border: 2px solid var(--haru-line);
        border-radius: var(--haru-radius-md);

        box-shadow: 4px 4px 0 var(--haru-line);

        text-decoration: none !important;

        transition:
            transform 0.18s ease,
            box-shadow 0.18s ease,
            border-color 0.18s ease;
    }

    /* 和首页 card 一样的按压 hover */
    #theme-haru .haru-archive-card:hover {
        transform: translate(2px, 2px);
        box-shadow: 0 0 0 var(--haru-shadow-clear);
        border-color: var(--haru-accent);
    }

    /* 日期：作为卡片的小标题 */
    #theme-haru .haru-archive-date {
        margin-bottom: 3px;

        font-size: 11px;
        line-height: 1.4;

        color: #999;
    }

    /* 文章标题 */
    #theme-haru .haru-archive-title {
        font-size: 15px;
        line-height: 1.5;
        font-weight: 500;

        color: #555;
    }

    /* 不让文章标题在 hover 时出现默认下划线 */
    #theme-haru .haru-archive-card:hover .haru-archive-title {
        text-decoration: none;
    }

    /* Dark mode */
    .dark #theme-haru .haru-archive-date {
        color: #888;
    }

    .dark #theme-haru .haru-archive-title {
        color: #ccc;
    }

    .main-menu {
        border: 2px solid var(--haru-line);
    }
    .nav-menu {
        padding: 8px 0px 4px 0px;
    }
    .nav-menu span {
        font-size: 15px;
        font-weight: 600;
        line-height: 2;
        color: #8c8c8c;
    }
    .nav-menu span:hover {
        color: #000000;
    }
    .nav-menu span > i {
        width: 18px;
        margin-right: 4px;
    }
    .nav-submenu {
        padding: 4px 0px 4px 2px;
    }
    .nav-submenu a > span {
        font-size: 13px;
        font-weight: 600;
        line-height: 1.3;
        color: rgb(153, 153, 153);
        text-align: left;
    }
    .nav-submenu a > span > i {
        margin-right: 10px;
    }
    /* 首页 topic 图片：桌面 3 + 2，手机单列，图片最大宽度 250px。 */
    #theme-haru .haru-home-topics {
        width: 100%;
        max-width: 798px;
        margin: 24px 0 32px;
    }
    #theme-haru .haru-home-topics-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 250px));
        gap: 24px;
        align-items: start;
        margin: 0;
        padding: 0;
        list-style: none;
    }
    #theme-haru .haru-home-topics-grid > li {
        min-width: 0;
        margin: 0;
        padding: 0;
    }
    #theme-haru .haru-home-topic-link {
        display: block;
        width: 100%;
        max-width: 250px;
    }
    #theme-haru .haru-home-topic-link:focus-visible {
        outline: 2px solid var(--haru-accent);
        outline-offset: 4px;
    }
    #theme-haru .haru-home-topic-image {
        display: block;
        width: 100%;
        max-width: 250px;
        height: auto;
        margin: 0;
    }
    @media (max-width: 767px) {
        #theme-haru .haru-home-topics-grid {
            grid-template-columns: minmax(0, 250px);
            gap: 20px;
        }
    }
    #theme-haru .haru-pagination {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        margin: 32px 0;
        color: #6b7280;
        font-size: 1.1rem;
        font-weight: 300;
        line-height: 1.3;
    }
    .dark #theme-haru .haru-pagination,
    #theme-haru.dark .haru-pagination { color: #9ca3af; }
    #theme-haru .haru-pagination-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        width: fit-content;
        padding: 0;
        color: inherit;
        text-decoration: none;
        border: 0;
    }
    #theme-haru .haru-pagination-next { margin-left: auto; }
    #theme-haru .haru-pagination-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        flex: 0 0 18px;
        color: inherit;
        line-height: 1;
    }
    #theme-haru .haru-pagination-prev { transform: rotate(180deg); }
    #theme-haru .haru-pagination-link:focus-visible {
        outline: 2px solid var(--haru-accent);
        outline-offset: 4px;
        border-radius: 2px;
    }
    #theme-haru .haru-gallery-layout { container-type: inline-size; }
    #theme-haru .haru-gallery-layout > .haru-pagination {
        width: 100%;
        max-width: 648px;
    }
    #theme-haru .haru-gallery { container-type: inline-size; }
    #theme-haru .haru-gallery-grid {
        column-count: 3;
        column-gap: 24px;
        max-width: 648px;
    }
    #theme-haru .haru-gallery-card {
        --gallery-surface: #ffffff;
        display: flex;
        flex-direction: column;
        break-inside: avoid;
        margin-bottom: 24px;
        background: var(--gallery-surface);
        min-width: 0;
        overflow: hidden;
        border-radius: var(--haru-radius-md);
        text-decoration: none;
    }
    .dark #theme-haru .haru-gallery-card,
    #theme-haru.dark .haru-gallery-card {
        --gallery-surface: #262626;
    }
    #theme-haru .haru-gallery-media {
        position: relative;
        isolation: isolate;
        width: 100%;
        overflow: hidden;
        flex-shrink: 0;
        background: transparent;
    }
    #theme-haru .haru-gallery-cover {
        display: block;
        width: 100%;
        height: auto;
        object-position: center;
        margin: 0;
    }
    #theme-haru .haru-gallery-cover.is-long {
        aspect-ratio: 3 / 4;
        object-fit: cover;
        object-position: center top;
    }
    #theme-haru .haru-gallery-crop-fade {
        position: absolute;
        z-index: 1;
        left: 0;
        right: 0;
        bottom: 0;
        height: 42px;
        background: linear-gradient(transparent, var(--gallery-surface) 85%);
        pointer-events: none;
    }
    #theme-haru .haru-gallery-count {
        position: absolute;
        z-index: 2;
        right: 0;
        top: 0;
        display: grid;
        place-items: center;
        box-sizing: border-box;
        width: 30px;
        height: 30px;
        /* Center the number at the triangle's centroid (20px, 20px). */
        padding: 0 0 10px 10px;
        text-align: center;
        /* Avoid clip-path antialiasing along the flush right/bottom edges. */
        background: linear-gradient(45deg, transparent 50%, #e3d7d2 50%);
        color: #393534;
        font-size: 13px;
        font-weight: 700;
        line-height: 1;
        font-variant-numeric: tabular-nums;
        pointer-events: none;
    }
    #theme-haru .haru-gallery-empty {
        display: grid;
        place-items: center;
        aspect-ratio: 3 / 4;
        height: 100%;
        font-size: 14px;
    }
    #theme-haru .haru-gallery-empty .haru-gallery-icon {
        width: 64px;
        height: 64px;
        object-fit: contain;
        font-size: 48px;
        line-height: 64px;
        text-align: center;
        margin: 0;
    }
    #theme-haru .haru-gallery-copy { padding: 14px 16px; min-width: 0; }
    #theme-haru .haru-gallery-summary {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        overflow-wrap: anywhere;
    }
    @container (min-width: 1100px) {
        #theme-haru .haru-gallery-layout > .haru-pagination { max-width: 872px; }
        #theme-haru .haru-gallery-grid { column-count: 4; max-width: 872px; }
    }
    @media (max-width: 767px) {
        #theme-haru .haru-gallery-layout > .haru-pagination { max-width: none; }
        #theme-haru .haru-gallery-grid { column-count: 1; max-width: none; }
        #theme-haru .haru-gallery-card { flex-direction: row; align-items: flex-start; margin-bottom: 20px; }
        #theme-haru .haru-gallery-media { width: 34%; flex: 0 0 34%; }
        #theme-haru .haru-gallery-copy { flex: 1; padding: 14px 12px; }
        #theme-haru .haru-gallery-summary { -webkit-line-clamp: 4; }
        #theme-haru .stack-comment .title,
        #theme-haru .haru-gallery-copy .title {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            overflow-wrap: anywhere;
        }
    }
    .card {
        /* 首页文章列表 */
        cursor: pointer;

        /* 预留边框空间，避免 Hover 时改变布局 */
        border: 2px solid var(--haru-line);

        /* 普通状态：浅色实心阴影 */
        box-shadow: 4px 4px 0 var(--haru-line);

        transition:
            transform 0.18s ease,
            box-shadow 0.18s ease,
            border-color 0.18s ease;
    }

    .card:hover {
        /* 向右下方移动 2px */
        transform: translate(2px, 2px);

        /* 收起阴影 */
        box-shadow: 0 0 0 var(--haru-shadow-clear);

        /* 只改变颜色，不改变边框宽度 */
        border-color: var(--haru-accent);
    }

    @media (prefers-reduced-motion: reduce) {
        .card {
            transition: none;
        }
    }
    /* =========================
       Notion Gallery：统一 500px 内双列
       ========================= */
    /* =========================
       Notion Gallery：视图标签
       ========================= */

    /* 去掉 active 状态原本的黑色下划线 */
    #theme-haru .notion-collection-view-tabs-content-item-active {
        border-bottom: none !important;
        box-shadow: none !important;

        /* 和文章底部 Tag 一样做成小圆角块 */
        border-radius: var(--haru-radius-sm) !important;
        background-color: var(--haru-hover-gray) !important;
    }
    /* 杀掉更多下划线 */
    #theme-haru .notion-collection-card * {
        text-decoration: none !important;
    }
    /* 所有视图标签都使用同样的圆角 */
    #theme-haru .notion-collection-view-tabs-content-item {
        border-radius: var(--haru-radius-sm) !important;

        transition:
            background-color 0.18s ease,
            color 0.18s ease !important;
    }

    /* hover 与文章底部 Tag 一致 */
    #theme-haru .notion-collection-view-tabs-content-item:hover {
        background-color: var(--haru-accent) !important;
        box-shadow: none !important;
    }
    /* 数据库 / collection 外层不要自己缩窄 */
    #theme-haru .notion-collection,
    #theme-haru .notion-collection-view,
    #theme-haru .notion-gallery {
        width: 100% !important;
        max-width: 500px !important;
        min-width: 0 !important;

        margin-left: 0 !important;
        margin-right: 0 !important;

        box-sizing: border-box !important;
        padding: 0 !important;
    }

    /* Gallery 本体固定两列 */
    #theme-haru .notion-gallery-grid {
        display: grid !important;

        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        grid-auto-columns: minmax(0, 1fr) !important;

        width: 100% !important;
        max-width: 500px !important;
        min-width: 0 !important;

        gap: 12px !important;

        margin: 0 !important;
        padding: 4px 4px 4px 0 !important;

        box-sizing: border-box !important;
    }
    /* Gallery 只有 1 张卡片时，横跨两列 */
    #theme-haru .notion-gallery-grid > .notion-collection-card:only-child {
        grid-column: 1 / -1;
    }
    /* 不管 Notion 设置的是 small / medium / large，都统一,顺便去掉横线 */
    #theme-haru .notion-gallery-grid[class*='size-'] {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        border-top: none !important;
    }

    /* 每张卡只服从 grid 分配的宽度 */
    #theme-haru .notion-collection-card {
        display: block !important;

        width: 100% !important;
        max-width: none !important;
        min-width: 0 !important;

        margin: 0 !important;
        box-sizing: border-box !important;

        border: 2px solid var(--haru-line) !important;
        border-radius: var(--haru-radius-md) !important;

        box-shadow: 4px 4px 0 var(--haru-line) !important;

        overflow: hidden;

        transition:
            transform 0.18s ease,
            box-shadow 0.18s ease,
            border-color 0.18s ease !important;
    }

    #theme-haru .notion-collection-card:hover {
        transform: translate(2px, 2px);
        box-shadow: 0 0 0 var(--haru-shadow-clear) !important;
        border-color: var(--haru-accent) !important;
    }

    /* 封面统一比例 */
    #theme-haru .notion-collection-card-cover {
        display: block !important;

        width: 100% !important;
        height: auto !important;

        aspect-ratio: 4 / 3;

        overflow: hidden;
    }

    #theme-haru .notion-collection-card-cover img {
        display: block !important;

        width: 100% !important;
        height: 100% !important;

        object-fit: cover !important;
    }

    /* 正文部分也不能撑宽 */
    #theme-haru .notion-collection-card-body {
        width: 100% !important;
        min-width: 0 !important;
        box-sizing: border-box !important;
    }
    /* =========================
       Notion List：列表视图
       ========================= */

    /* 每一条列表 */
    #theme-haru .notion-list-item {
        display: flex !important;
        align-items: center !important;

        width: 100% !important;
        box-sizing: border-box !important;

        border-radius: var(--haru-radius-sm) !important;

        text-decoration: none !important;

        overflow: hidden;

        transition:
            background-color 0.18s ease !important;
    }

    /* 去掉标题、日期以及内部元素的下划线 */
    #theme-haru .notion-list-item,
    #theme-haru .notion-list-item:hover,
    #theme-haru .notion-list-item *,
    #theme-haru .notion-list-item:hover * {
        text-decoration: none !important;
    }

    /* 标题区域：icon + 标题文字垂直居中 */
    #theme-haru .notion-list-item-title {
        display: flex !important;
        align-items: center !important;

        min-width: 0;
    }

    /* 标题 icon */
    #theme-haru .notion-list-item-title .notion-page-icon-inline {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;

        flex: 0 0 auto;
    }

    /* icon 图片本身 */
    #theme-haru .notion-list-item-title .notion-page-title-icon {
        display: block !important;

        margin: 0 !important;
        vertical-align: middle !important;
    }

    /* 标题文字 */
    #theme-haru .notion-list-item-title .notion-property-title {
        display: inline-flex !important;
        align-items: center !important;

        line-height: 1.5 !important;
    }

    /* 右侧属性区域 */
    #theme-haru .notion-list-item-body {
        display: flex !important;
        align-items: center !important;

        margin-left: auto !important;
    }

    /* 日期属性 */
    #theme-haru .notion-list-item-property {
        display: flex !important;
        align-items: center !important;
    }

    /* Created time：灰色、小字号，与标题垂直居中 */
    #theme-haru .notion-property-created_time,
    #theme-haru .notion-property-last_edited_time {
        display: inline-flex !important;
        align-items: center !important;

        color: #999 !important;

        font-size: 12px !important;
        line-height: 1.5 !important;

        white-space: nowrap;
    }

    /* =========================
       Notion Page Link：页面引用
       ========================= */

    /* 整个页面引用 */
    #theme-haru .notion-page-link[class*='notion-block-'] {
        display: inline-flex !important;
        align-items: center !important;

        padding: 4px 6px !important;
        border-radius: var(--haru-radius-sm) !important;

        text-decoration: none !important;
        border-bottom: none !important;
        box-shadow: none !important;

        transition:
            background-color 0.18s ease !important;
    }

    /* 杀掉内部所有下划线 */
    #theme-haru .notion-page-link[class*='notion-block-'] *,
    #theme-haru .notion-page-link[class*='notion-block-']:hover,
    #theme-haru .notion-page-link[class*='notion-block-']:hover * {
        text-decoration: none !important;
        border-bottom: none !important;
        box-shadow: none !important;
    }

    /* icon + 标题文字 */
    #theme-haru .notion-page-link[class*='notion-block-'] .notion-page-title {
        display: inline-flex !important;
        align-items: center !important;

        gap: 4px;

        margin: 0 !important;
        padding: 0 !important;
    }

    /* icon 外层 */
    #theme-haru .notion-page-link[class*='notion-block-'] .notion-page-icon-inline {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;

        flex: 0 0 auto;
    }

    /* icon 图片 */
    #theme-haru .notion-page-link[class*='notion-block-'] .notion-page-title-icon {
        display: block !important;

        margin: 0 !important;
        vertical-align: middle !important;
    }

    /* 标题 */
    #theme-haru .notion-page-link[class*='notion-block-'] .notion-page-title-text {
        display: inline-flex !important;
        align-items: center !important;

        line-height: 1.5 !important;

        text-decoration: none !important;
        border-bottom: none !important;
    }

    /* hover：和刚才 List 一样保留灰色 */
    #theme-haru .notion-page-link[class*='notion-block-']:hover {
        background-color: var(--haru-hover-gray) !important;
        border-radius: var(--haru-radius-sm) !important;
    }
    /* 处理 Notion Quote：去掉原本的背景和左边框，改成左侧姜黄色圆头竖线 */
    #theme-haru .notion-quote {
        display: block;
        position: relative;

        border-radius: 5px;

        /* 去掉原本背景和左边框 */
        background-color: transparent !important;
        border-left: none !important;

        width: 100%;
        white-space: pre-wrap;
        word-break: break-word;

        padding: .2em .9em;
        margin: 6px 0;

        font-size: 1em;
    }

    /* 左侧姜黄色圆头竖线 */
    #theme-haru .notion-quote::before {
        content: '';

        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;

        width: 4px;

        background-color: var(--haru-accent);
        border-radius: 999px;
    }
    /* =========================
    Notion Toggle：自定义折叠图标
    ========================= */

    /* summary 本体：让图标和文字垂直对齐 */
    #theme-haru .notion-toggle > summary {
        display: inline-flex !important;
        align-items: center !important;
        width: fit-content !important;
        max-width: 100%;
        min-height: 0 !important;
        padding: 0 !important;
        gap: 6px;

        list-style: none !important;

        cursor: pointer;
    }

    #theme-haru .notion-toggle > summary :is(h1, h2, h3, h4, h5, .notion-h, .notion-h-title) {
        margin: 0 !important;
        padding: 0 !important;
        line-height: inherit;
    }

    /* 隐藏浏览器默认小三角 */
    #theme-haru .notion-toggle > summary::-webkit-details-marker {
        display: none !important;
    }

    #theme-haru .notion-toggle > summary::marker {
        content: '' !important;
    }

    /* 自定义 Font Awesome 图标 */
    #theme-haru .notion-toggle > summary::before {
        content: '\f0a9'; /* 这里换成你想要的 FA unicode */

        display: inline-flex;
        align-items: center;
        justify-content: center;

        width: 1em;
        height: 1em;

        margin-right: 0;

        font-family: "Font Awesome 6 Free";
        font-weight: 900;
        line-height: 1;

        color: var(--haru-accent);

        flex: 0 0 auto;

        transform: rotate(0deg);
        transform-origin: center;

        transition: transform 0.18s ease;
    }

    /* 打开时，同一张图顺时针旋转 90° */
    #theme-haru .notion-toggle[open] > summary::before {
        transform: rotate(90deg);
    }

    /* =========================
    文章正文链接，包括公告栏
    ========================= */
    #theme-haru :is(#article-wrapper, #announcement-content)
    :is(.notion-text, .notion-list-disc, .notion-list-numbered, .notion-quote) a {
        color: #000000 !important;
        text-decoration: none !important;
        border-bottom: none !important;
        box-shadow: none !important;

        background-image: linear-gradient(
            transparent calc(100% - 8px),
            var(--haru-accent-soft) 3px
        ) !important;

        background-repeat: no-repeat !important;
    }

    #theme-haru :is(#article-wrapper, #announcement-content)
    :is(.notion-text, .notion-list-disc, .notion-list-numbered, .notion-quote) a:hover {
        background-color: var(--haru-accent-soft) !important;
    }
    /* =========================
    Notion File：附件
    ========================= */

    #theme-haru .notion-file-link {
        display: flex !important;
        align-items: center !important;

        border-radius: var(--haru-radius-sm) !important;

        text-decoration: none !important;

        overflow: hidden;
    }

    /* 隐藏 react-notion-x 默认附件 SVG */
    #theme-haru .notion-file-link .notion-file-icon {
        display: none !important;
    }

    /* 使用 Font Awesome 图标替代 */
    #theme-haru .notion-file-link::before {
        content: '\f0c6'; /* 示例：file 图标，换成你自己选的 unicode */

        display: inline-flex;
        align-items: center;
        justify-content: center;

        width: 1.2em;
        min-width: 1.2em;

        margin-right: 8px;

        font-family: "Font Awesome 6 Free";
        font-weight: 900;
        line-height: 1;

        color: var(--haru-accent);

        flex: 0 0 auto;
    }

    /* 文件文字区域垂直居中 */
    #theme-haru .notion-file-info {
        display: flex !important;
        align-items: center !important;

        min-width: 0;
    }

    /* 文件标题 */
    #theme-haru .notion-file-title {
        line-height: 1.5 !important;
        text-decoration: none !important;
    }

    /* =========================
    Haru：有序列表序号
    ========================= */
    #theme-haru .notion-list-numbered li::marker {
        color: var(--haru-accent) !important;
        font-weight: 700 !important;
    }

    /* =========================
    Notion Tabs
    PC / Mobile：统一自动换行
    ========================= */

    /* 整体外框 */
    #theme-haru .notion-tabs {
        position: relative;
        width: 100%;
        box-sizing: border-box;

        margin: 0 !important;
        padding: 0 !important;

        /* 必须保留：用于消除图片底部空隙 */
        line-height: 0 !important;

        border: 2px solid var(--haru-line) !important;
        border-radius: 16px !important;

        overflow: hidden;

        /* .card 风格，仅向下投影 */
        box-shadow: 0 4px 0 var(--haru-shadow-clear);
    }


    /* =========================
    标签栏
    ========================= */

    #theme-haru .notion-tabs-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        gap: 3px;

        padding: 5px 6px;

        border: none !important;
        overflow: visible;

        /* 恢复父级 line-height: 0 的影响 */
        line-height: 1.35 !important;
    }

    /* 清除 Notion 原始装饰线 */
    #theme-haru .notion-tabs-list::before,
    #theme-haru .notion-tabs-list::after {
        content: none !important;
        display: none !important;
    }


    /* =========================
    单个标签
    ========================= */

    #theme-haru .notion-tabs-tab {
        display: inline-flex;
        align-items: center;
        justify-content: center;

        flex: 0 0 auto;

        width: auto !important;
        min-width: 28px;
        min-height: 28px;

        padding: 0 8px !important;

        border: none !important;
        border-radius: 999px !important;

        background: transparent;
        color: inherit;

        font-size: 0.8125rem !important;
        line-height: 28px !important;

        white-space: nowrap;
        cursor: pointer;

        box-shadow: none !important;
        outline: none !important;
        text-decoration: none !important;

        transition:
            background-color 0.15s ease,
            color 0.15s ease;
    }

    /* 清除 Notion 原始标签下划线 / 指示线 */
    #theme-haru .notion-tabs-tab::before,
    #theme-haru .notion-tabs-tab::after {
        content: none !important;
        display: none !important;
    }

    /* hover */
    #theme-haru .notion-tabs-tab:hover {
        background-color: var(--haru-accent) !important;
        color: #fff !important;
    }

    /* 当前标签 */
    #theme-haru .notion-tabs-tab[aria-selected='true'] {
        background-color: var(--haru-accent) !important;
        color: #fff !important;
    }


    /* =========================
    Tab 内容
    ========================= */

    /* 默认：所有内容左右留白 12px */
    #theme-haru .notion-tabs-panel {
        margin: 0 !important;
        padding: 0 12px !important;

        border: none !important;

        /* 不再让整个 panel 继承 line-height: 0 */
        line-height: inherit !important;
    }


    /* =========================
    只有图片突破左右 padding，撑满 Tab
    ========================= */

    /* 图片如果是 panel 的一级子元素，就抵消 12px padding */
    #theme-haru .notion-tabs-panel > figure,
    #theme-haru .notion-tabs-panel > .notion-asset-wrapper {
        display: block !important;

        width: calc(100% + 24px) !important;
        max-width: none !important;

        margin-left: -12px !important;
        margin-right: -12px !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;

        padding: 0 !important;

        line-height: 0 !important;
    }


    /* 图片内部容器保持无额外间距 */
    #theme-haru .notion-tabs-panel figure .notion-asset-wrapper,
    #theme-haru .notion-tabs-panel .notion-asset-wrapper > div {
        width: 100% !important;
        max-width: none !important;

        margin: 0 !important;
        padding: 0 !important;

        line-height: 0 !important;
    }


    /* 图片本身撑满 */
    #theme-haru .notion-tabs-panel img {
        display: block !important;

        width: 100% !important;
        max-width: none !important;
        height: auto !important;

        margin: 0 !important;
        padding: 0 !important;

        border-radius: 0 !important;

        vertical-align: bottom !important;
    }


    /* =========================
    Tabs 内普通文字留边距
    ========================= */

    #theme-haru .notion-tabs-panel > .notion-text,
    #theme-haru .notion-tabs-panel > .notion-list,
    #theme-haru .notion-tabs-panel > .notion-quote {
        padding-left: 12px !important;
        padding-right: 12px !important;
    }
    



    
    /* 可自定义的css部分结束 */

    ${themeConsoleStyle('nav', CONFIG, { rootId: 'theme-haru' })}
  `}</style>
}

export { Style }
