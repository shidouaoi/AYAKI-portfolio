export function ArticleStyle() {
  return (
    <style jsx global>{`
      #theme-haru.haru-article-shell {
        --haru-accent-soft: #ffd6ce;
        --haru-hover-gray: #e3d7d2;
        padding: 90px 0 0;
      }
      #theme-haru.haru-article-shell .haru-page-title {
        padding-top: 0;
      }
      #theme-haru.haru-article-shell .haru-article-main > .mt-12,
      #theme-haru.haru-article-shell .haru-article-main > .py-10 {
        margin-top: 0;
        padding-top: 0;
      }
      #theme-haru.haru-article-shell #posts-wrapper.card-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
      }
      #theme-haru.haru-article-shell
        :is(.haru-archive-card, .haru-gallery-card, #posts-wrapper .card) {
        --gallery-surface: #fff;
        background: #fff;
        border-color: #e3d7d2;
        color: #393534;
      }
      #theme-haru.haru-article-shell .haru-gallery-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px;
        column-count: auto;
        max-width: 100%;
      }
      #theme-haru.haru-article-shell .haru-gallery-column {
        display: flex;
        flex-direction: column;
        gap: 24px;
        min-width: 0;
      }
      #theme-haru.haru-article-shell .haru-gallery-card {
        margin-bottom: 0;
      }
      #theme-haru.haru-article-shell .haru-gallery-card:hover {
        border-color: var(--haru-home-accent) !important;
        color: #393534 !important;
      }
      #theme-haru.haru-article-shell
        .haru-gallery-card:hover
        .haru-gallery-count {
        background: linear-gradient(45deg, transparent 50%, #f57b66 50%);
        color: #fff;
      }
      #theme-haru.haru-article-shell .haru-gallery-card .title,
      #theme-haru.haru-article-shell .haru-gallery-card:hover .title {
        color: #393534 !important;
      }
      #theme-haru.haru-article-shell .haru-gallery-card .description,
      #theme-haru.haru-article-shell .haru-gallery-card:hover .description {
        color: rgb(85 81 79) !important;
      }
      #theme-haru.haru-article-shell .haru-gallery-layout {
        width: 100%;
        max-width: 100%;
      }
      #theme-haru.haru-article-shell
        :is(.haru-archive-month, .haru-taxonomy-item) {
        color: #393534;
      }
      @media (max-width: 767px) {
        #theme-haru.haru-article-shell .haru-gallery-column {
          display: contents;
        }
        #theme-haru.haru-article-shell .haru-gallery-grid {
          column-count: auto;
          grid-template-columns: minmax(0, 1fr);
        }
      }
      @media (max-width: 480px) {
        #theme-haru.haru-article-shell #posts-wrapper.card-list {
          grid-template-columns: minmax(0, 1fr);
        }
        #theme-haru.haru-article-shell .haru-gallery-grid {
          column-count: 1;
        }
      }
      .haru-article-sidebar {
        position: sticky;
        top: 28px;
        max-height: calc(100vh - 56px);
        overflow-y: auto;
        scrollbar-width: thin;
      }
      .haru-title-category {
        margin: -12px 0 24px;
        gap: 6px;
      }
      .haru-mobile-article-divider {
        display: none;
      }
      .haru-article-around {
        display: flex;
        justify-content: space-between;
        gap: 24px;
        margin: 32px 0;
      }
      .haru-article-around a {
        display: flex;
        align-items: center;
        gap: 8px;
        max-width: 48%;
      }
      .haru-article-around a:last-child {
        margin-left: auto;
      }
      @media (max-width: 640px) {
        .haru-mobile-article-divider {
          display: block;
          margin: 32px 0;
        }
        .haru-article-around {
          margin-bottom: 0;
        }
        .haru-article-sidebar {
          position: static;
          max-height: none;
          overflow: visible;
        }
      }
      .haru-sidebar-links,
      .haru-sidebar-taxonomies {
        display: contents;
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
      #theme-haru.haru-article-shell .haru-home-avatar {
        align-items: center;
        justify-content: center;
      }
      #theme-haru.haru-article-shell .haru-home-avatar img {
        margin: 0;
        object-fit: contain;
      }
      #theme-haru.haru-article-shell
        :is(
          .notion-collection-card,
          .notion-page-link[class*='notion-block-'],
          .notion-bookmark
        ) {
        background: #fff !important;
      }
      .haru-menu-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 0;
        border: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        line-height: 1.8;
        text-align: left;
        cursor: pointer;
      }
      .haru-menu-toggle span {
        flex: 1;
      }
      .haru-menu-toggle:hover {
        color: var(--haru-accent);
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
      .haru-article-recent li a::before,
      .haru-article-categories li a::before {
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
          width: calc(100% - 40px);
        }
        #theme-haru.haru-article-shell .haru-page-title {
          font-size: 29px;
        }
        .haru-article-sidebar {
          margin-top: 55px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 64px 20px;
        }
        .haru-article-profile {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          gap: 20px;
          width: fit-content;
          max-width: 100%;
          justify-self: center;
        }
        .haru-article-profile-copy {
          flex: 0 1 auto;
          min-width: 0;
          max-width: 200px;
        }
        .haru-article-profile .haru-home-avatar {
          flex: 0 0 90px;
          margin: 0;
        }
        .haru-article-profile .haru-home-socials {
          clear: none;
          gap: 10px;
          margin: 12px 0 0;
        }
        .haru-article-profile .haru-article-name {
          margin-bottom: 4px;
        }
        .haru-sidebar-taxonomies {
          display: block;
          grid-column: 1;
          grid-row: 2;
          min-width: 0;
        }
        .haru-sidebar-links {
          display: block;
          grid-column: 2;
          grid-row: 2;
          min-width: 0;
        }
        .haru-sidebar-links > nav > .haru-article-menu > li:first-child {
          margin-top: 0;
        }
        .haru-sidebar-taxonomies
          > .haru-article-sidebar-section:first-child
          > h2,
        .haru-sidebar-links > nav > .haru-article-menu > li:first-child > a,
        .haru-sidebar-links
          > nav
          > .haru-article-menu
          > li:first-child
          > button {
          font-size: 16px;
          line-height: 24px;
        }
        .haru-article-recent > li:nth-child(n + 6) {
          display: none;
        }
        .haru-menu-toggle span {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .haru-article-tags {
          gap: 7px 4px;
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
