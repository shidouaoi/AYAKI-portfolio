export function ArticleStyle() {
  return (
    <style jsx global>{`
      #theme-haru.haru-article-shell {
        --haru-accent-soft: #ffd6ce;
        --haru-hover-gray: #e3d7d2;
        padding: 90px 0 0;
      }
      .haru-article-layout {
        display: grid;
        grid-template-columns: minmax(0, 570px) minmax(0, 220px);
        gap: 70px;
        width: min(100% - 58px, 860px);
        margin: 0 auto;
        align-items: start;
        min-height: calc(100vh - 300px);
      }
      .haru-article-main,
      .haru-article-sidebar {
        min-width: 0;
      }
      #theme-haru.haru-article-shell #container {
        width: 100%;
        max-width: none;
        margin: 0;
        padding: 0;
      }
      #theme-haru.haru-article-shell .haru-page-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 38px;
        font-weight: 400;
        line-height: 1.4;
        color: #393534;
        margin: 0 0 28px;
        overflow-wrap: anywhere;
      }
      #theme-haru.haru-article-shell #container > section {
        padding: 0;
      }
      #theme-haru.haru-article-shell :is(.notion, .notion-page) {
        font-family: inherit;
        font-size: 14px;
        line-height: 1.85;
        color: #393534;
        background: transparent;
        --fg-color: #393534;
        --bg-color: transparent;
      }
      #theme-haru.haru-article-shell .notion-page {
        width: 100%;
        max-width: none;
        padding: 0;
      }
      #theme-haru.haru-article-shell .notion-viewport {
        padding: 0;
      }
      #theme-haru.haru-article-shell .notion-text {
        font-size: 14px;
      }
      #theme-haru.haru-article-shell a:focus-visible {
        outline: 2px solid var(--haru-accent);
        outline-offset: 4px;
      }
      .haru-article-profile .haru-home-avatar {
        display: flex;
        width: 90px;
        height: 90px;
        margin: 0 0 15px;
      }
      .haru-article-name {
        display: block;
        font-size: 25px;
        line-height: 1.5;
        margin-bottom: 8px;
      }
      .haru-article-profile p {
        font-size: 12px;
        line-height: 1.8;
      }
      .haru-article-profile .haru-home-socials {
        display: flex;
        justify-content: flex-start;
        gap: 15px;
        margin: 18px 0 28px;
      }
      .haru-article-profile .haru-home-socials a {
        width: 30px;
        height: 30px;
        font-size: 15px;
        flex: 0 0 30px;
      }
      .haru-article-sidebar-section {
        margin: 0 0 28px;
      }
      .haru-article-sidebar-section h2 {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 12px;
        font-size: 16px;
        font-weight: 400;
      }
      .haru-article-sidebar-section ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .haru-article-sidebar-section li {
        min-width: 0;
        margin: 6px 0;
      }
      .haru-article-sidebar-section li a {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 1.8;
      }
      .haru-article-sidebar-section .haru-article-menu ul {
        padding-left: 14px;
      }
      .haru-article-menu i {
        margin-right: 8px;
      }
      .haru-article-recent li a::before {
        content: '·';
        margin-right: 8px;
      }
      .haru-article-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 7px 12px;
      }
      .haru-article-tags a {
        overflow-wrap: anywhere;
      }
      #theme-haru.haru-article-shell .haru-home-footer {
        margin-top: 100px;
      }
      @media (max-width: 900px) {
        .haru-article-layout {
          grid-template-columns: minmax(0, 1fr) 190px;
          gap: 35px;
        }
      }
      @media (max-width: 640px) {
        #theme-haru.haru-article-shell {
          padding-top: 35px;
        }
        .haru-article-layout {
          display: block;
          width: calc(100% - 36px);
        }
        #theme-haru.haru-article-shell .haru-page-title {
          font-size: 29px;
        }
        .haru-article-sidebar {
          margin-top: 55px;
        }
        .haru-article-profile .haru-home-avatar {
          float: none;
        }
        .haru-article-sidebar-section {
          max-width: 100%;
        }
      }
    `}</style>
  )
}
