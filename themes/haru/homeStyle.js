import Head from 'next/head'

export function HomeStyle() {
  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap'
        />
      </Head>
      <style jsx global>{`
        #theme-haru.haru-home-shell {
          --haru-home-accent: #f57b66;
          --haru-accent: #f57b66;
          color: #393534;
          background: #fee8e4 url('/haru/bg.webp') center top / 200% auto
            repeat-y;
          background-attachment: fixed;
          min-height: 100vh;
          font-size: 14px;
          font-family:
            'Noto Sans', 'Hiragino Maru Gothic Pro', 'BIZ UDGothic', Roboto,
            HelveticaNeue, Arial, sans-serif;
          font-weight: 400;
        }
        #theme-haru .text-gray-500,
        #theme-haru .haru-pagination,
        #theme-haru .description {
          color: rgb(85 81 79);
        }
        #theme-haru hr {
          border-color: #e3d7d2 !important;
        }
        #theme-haru .haru-footer-tag:not(:hover) {
          background: #fff !important;
        }
        #theme-haru .haru-home-chat-content {
          scrollbar-color: transparent transparent;
        }
        #theme-haru .haru-home-chat-content.is-scrolling {
          scrollbar-color: #e3d7d2 transparent;
        }
        .haru-home-chat-content::-webkit-scrollbar {
          width: 6px;
        }
        .haru-home-chat-content::-webkit-scrollbar-thumb {
          background: transparent;
          border-radius: 6px;
        }
        .haru-home-chat-content.is-scrolling::-webkit-scrollbar-thumb {
          background: #e3d7d2;
        }
        .haru-chat-outline-mobile {
          display: none;
        }
        .haru-home-main {
          width: min(100% - 57.6px, 882px);
          margin: auto;
          padding-top: 59.4px;
        }
        .haru-home-intro {
          display: grid;
          grid-template-columns: minmax(0, 400px) minmax(0, 310px);
          gap: 27px;
          max-width: 737px;
          margin: 0 auto;
          align-items: start;
        }
        .haru-home-chat {
          position: relative;
          min-height: 0;
          width: 100%;
          aspect-ratio: 500 / 720;
          box-sizing: border-box;
          height: auto;
          padding: 68.4px 64.8px 58.5px;
        }
        #theme-haru .haru-home-chat-date {
          display: block;
          margin-top: 18px;
          text-align: right;
          color: var(--haru-home-accent);
        }
        .haru-home-chat-outline {
          overflow: visible;
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .haru-home-chat-content {
          position: absolute;
          inset: 11% 14% 8%;
          overflow-y: auto;
          overflow-x: hidden;
          overscroll-behavior: contain;
          scrollbar-width: thin;
          scrollbar-color: #e3d7d2 transparent;
          font-size: 14px;
          line-height: 1.9;
          overflow-wrap: anywhere;
        }
        .haru-home-chat-content h2 {
          font-size: 14px;
          font-weight: 400;
          margin: 0 0 14.4px;
        }
        .haru-home-chat-content p {
          white-space: pre-line;
          margin: 0 0 16.2px;
        }
        .haru-home-chat-content .notion-page {
          padding: 0 !important;
          width: 100%;
          font-size: 14px;
        }
        .haru-home-chat-content .notion {
          background: transparent !important;
          color: #393534;
        }
        .haru-home-chat-content .notion-asset-wrapper {
          max-width: 100%;
          margin: 10.8px 0;
        }
        .haru-home-chat-content .notion-asset-wrapper img,
        .haru-home-chat-cover {
          border-radius: 12.6px;
          width: 100%;
          height: auto;
        }
        .haru-home-profile {
          min-width: 0;
          padding: 0 0 9px;
        }
        .haru-home-avatar {
          width: 154.8px;
          height: 154.8px;
          border-radius: 50%;
          background: #e3d7d2;
          display: grid;
          place-items: center;
          overflow: hidden;
          margin-bottom: 21.6px;
        }
        .haru-home-avatar img {
          width: 82%;
          height: 82%;
          object-fit: contain;
          border-radius: 0;
        }
        .haru-home-profile h1 {
          font-size: 41.4px;
          line-height: 1.3;
          margin: 0 0 14.4px;
          font-weight: 400;
          letter-spacing: 0.04em;
        }
        .haru-home-bio {
          font-size: 14px;
          line-height: 1.45;
          white-space: pre-line;
          margin-bottom: 22.5px;
        }
        .haru-home-socials {
          display: flex;
          gap: 21.6px;
          flex-wrap: wrap;
          margin: 19.8px 0;
        }
        .haru-home-socials a,
        .haru-home-social-placeholder {
          width: 46.8px;
          height: 46.8px;
          border-radius: 50%;
          background: #fff;
          display: grid;
          place-items: center;
          font-size: 14px;
          transition: background-color 0.18s;
        }
        #theme-haru .fa-pixiv {
          display: inline-block;
          width: 1em;
          height: 1em;
          background: currentColor;
          mask: url('/haru/fa-pixiv.svg') center / contain no-repeat;
          -webkit-mask: url('/haru/fa-pixiv.svg') center / contain no-repeat;
        }
        #theme-haru .fa-pixiv::before {
          content: none;
        }
        #theme-haru.haru-home-shell .haru-home-socials a:hover {
          background: #e3d7d2;
          color: inherit;
        }
        .haru-home-chat-list {
          margin-top: 23.4px;
          font-size: 14px;
          color: #66616a;
        }
        .haru-home-chat-list > a:not(.haru-home-more) {
          display: flex;
          justify-content: space-between;
          gap: 12.6px;
          line-height: 1.6;
          padding: 4.5px 0;
        }
        .haru-home-chat-list > a > span {
          min-width: 0;
          flex: 1;
          max-width: 18em;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .haru-home-chat-list time {
          color: #aaa2b0;
          flex-shrink: 0;
          font-variant-numeric: tabular-nums;
        }
        #theme-haru .haru-home-more {
          color: var(--haru-home-accent);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          line-height: 1.4;
          margin-top: 7.2px;
          font-size: 14px;
        }
        .haru-home-works {
          margin-top: 58.5px;
        }
        .haru-home-works-title {
          display: flex;
          justify-content: center;
          margin: 0 0 54px;
        }
        .haru-home-works-title img {
          width: 193.5px;
          height: auto;
        }
        .haru-home-topic {
          display: grid;
          grid-template-columns: 270px minmax(0, 1fr);
          gap: 25.2px;
          margin-bottom: 70.2px;
          align-items: stretch;
        }
        .haru-home-topic-cover {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10.8px;
          overflow: hidden;
          box-shadow: 5.4px 6.3px 0 #e3d7d2;
          background: #fbd8d3;
          min-height: 324px;
        }
        .haru-home-topic-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .haru-home-topic-cover > i {
          font-size: 14px;
        }
        .haru-home-topic-content {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .haru-home-topic-content h3 {
          font-size: 26.1px;
          line-height: 1.4;
          font-weight: 400;
          margin: -5px 0 23.4px;
        }
        .haru-home-topic-description {
          white-space: pre-line;
        }
        .haru-home-topic-description,
        .haru-home-topic-note {
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-line;
          margin: 0 0 18px;
        }
        .haru-home-post-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 19.8px 14.4px;
          margin-top: 0;
          padding-top: 7.2px;
        }
        .haru-home-post-card {
          display: flex;
          align-items: center;
          gap: 12.6px;
          min-width: 0;
          background: #fff;
          border: 2.7px solid #e3d7d2;
          border-radius: 20.7px;
          padding: 8.1px 9.9px;
          box-shadow: 4.5px 5.4px 0 #e3d7d2;
          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease,
            border-color 0.18s ease;
        }
        .haru-home-post-card:hover {
          transform: translate(1.8px, 1.8px);
          box-shadow: 0 0 0 transparent;
          border-color: var(--haru-home-accent);
        }
        .haru-home-post-icon {
          display: grid;
          place-items: center;
          width: 84.6px;
          height: 84.6px;
          flex: 0 0 84.6px;
          border: 2.7px solid #fee5e1;
          border-radius: 13.5px;
          overflow: hidden;
          font-size: 14px;
        }
        .haru-home-post-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .haru-home-post-copy {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4.5px;
          color: #66616a;
        }
        .haru-home-post-title {
          font-weight: 700;
          font-size: 14px;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .haru-home-post-summary {
          font-size: 14px;
          line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .haru-home-footer {
          max-width: 990px;
          margin: 171px auto 0;
          padding: 27px 21.6px 52.2px;
          display: flex;
          flex-wrap: wrap;
          gap: 12.6px;
          justify-content: center;
          align-items: center;
          color: #66616a;
          font-size: 14px;
        }
        #theme-haru.haru-home-shell a:hover,
        #theme-haru.haru-home-shell a:focus-visible {
          color: var(--haru-home-accent);
        }
        #theme-haru.haru-home-shell a:focus-visible {
          outline: 1.8px solid var(--haru-home-accent);
          outline-offset: 3.6px;
        }
        .haru-home-empty {
          color: #93868a;
          font-size: 14px;
          line-height: 1.8;
        }
        @media (min-width: 1500px) {
          .haru-home-main {
            width: min(100% - 72px, 1044px);
            padding-top: 76.5px;
          }
          .haru-home-intro {
            max-width: 737px;
            gap: 27px;
          }
          .haru-home-chat {
            min-height: 0;
            padding: 73.8px 70.2px 63px;
          }
          .haru-home-avatar {
            width: 175.5px;
            height: 175.5px;
          }
          .haru-home-topic {
            grid-template-columns: 306px minmax(0, 1fr);
          }
          .haru-home-topic-cover {
            min-height: 396px;
          }
          .haru-home-post-icon {
            width: 94.5px;
            height: 94.5px;
            flex-basis: 94.5px;
          }
        }
        @media (max-width: 900px) {
          .haru-home-main {
            width: calc(100% - 36px);
            padding-top: 36px;
          }
          .haru-home-intro {
            gap: 22.5px;
            grid-template-columns: minmax(0, 400px) minmax(0, 310px);
          }
          .haru-home-chat {
            padding: 64.8px 31.5px 40.5px;
            min-height: 0;
          }
          .haru-home-profile h1 {
            font-size: 32.4px;
          }
          .haru-home-avatar {
            width: 121.5px;
            height: 121.5px;
          }
          .haru-home-bio {
            font-size: 14px;
          }
          .haru-home-socials {
            gap: 13.5px;
          }
          .haru-home-socials a {
            width: 39.6px;
            height: 39.6px;
          }
          .haru-home-topic {
            grid-template-columns: 198px minmax(0, 1fr);
            gap: 20.7px;
          }
          .haru-home-post-grid {
            grid-template-columns: 1fr;
          }
          .haru-home-topic-content h3 {
            font-size: 21.6px;
          }
          .haru-home-topic-description {
            font-size: 14px;
          }
          .haru-home-post-icon {
            width: 63px;
            height: 63px;
            flex-basis: 63px;
          }
          .haru-home-post-title {
            font-size: 14px;
          }
          .haru-home-post-summary {
            font-size: 14px;
          }
        }
        @media (max-width: 580px) {
          .haru-home-main {
            width: calc(100% - 40px);
            padding-top: 27px;
          }
          .haru-home-intro {
            display: flex;
            flex-direction: column;
            gap: 25.2px;
          }
          .haru-home-profile {
            display: contents;
          }
          .haru-home-profile-header {
            order: -1;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .haru-home-profile-header > .haru-home-avatar {
            float: none;
            margin: 0 0 14px;
          }
          .haru-home-profile-header > h1 {
            padding-top: 0;
          }
          .haru-home-profile-header > .haru-home-bio {
            min-height: 0;
          }
          .haru-home-chat-list {
            order: 1;
            width: calc(100% - 10.8px);
          }
          .haru-chat-outline-desktop {
            display: none;
          }
          .haru-chat-outline-mobile {
            display: block;
          }
          .haru-home-avatar {
            width: 99px;
            height: 99px;
            float: left;
            margin: 0 19.8px 13.5px 0;
          }
          .haru-home-profile h1 {
            padding-top: 10.8px;
            font-size: 28.8px;
          }
          .haru-home-bio {
            min-height: 49.5px;
          }
          .haru-home-socials {
            clear: both;
            justify-content: center;
          }
          .haru-home-chat-list {
            margin: 21.6px 5.4px 0;
            font-size: 14px;
          }
          .haru-home-chat {
            width: 100%;
            min-height: 0;
            padding: 70.2px 41.4px 49.5px;
          }
          .haru-home-chat-label {
            left: 31.5px;
          }
          .haru-home-works {
            margin-top: 36px;
          }
          .haru-home-works-title {
            margin-bottom: 31.5px;
          }
          .haru-home-works-title img {
            width: 171px;
          }
          .haru-home-topic {
            display: flex;
            flex-direction: column;
            gap: 23.4px;
          }
          .haru-home-topic-cover {
            width: 75%;
            max-width: 270px;
            min-height: 270px;
            align-self: center;
          }
          .haru-home-topic-cover img {
            max-height: 378px;
          }
          .haru-home-topic-content {
            width: 100%;
          }
          .haru-home-topic-content h3 {
            width: 90%;
            margin: 0 auto 15.3px;
            text-align: center;
            justify-content: center;
            font-weight: 700;
            white-space: nowrap;
            font-size: clamp(12px, 3.6vw, 20.7px);
          }
          .haru-home-topic-description,
          .haru-home-topic-note {
            width: 75%;
            max-width: 270px;
            margin-left: auto;
            margin-right: auto;
          }
          .haru-home-post-grid {
            width: 75%;
            max-width: 270px;
            margin: 7.2px auto 0;
            grid-template-columns: minmax(0, 1fr);
            gap: 14.4px;
          }
          .haru-home-topic-more {
            width: 75%;
            max-width: 270px;
            margin-left: auto;
            margin-right: auto;
            justify-content: flex-end;
          }
          .haru-home-post-card {
            padding: 9px;
            border-radius: 19.8px;
          }
          .haru-home-post-icon {
            width: 70.2px;
            height: 70.2px;
            flex-basis: 70.2px;
          }
          .haru-home-footer {
            margin-top: 58.5px;
            font-size: 14px;
            gap: 8.1px;
            padding-bottom: 27px;
          }
          .haru-home-footer-divider {
            display: none;
          }
        }
        .haru-home-topic-more {
          align-self: flex-end;
        }
        .haru-home-socials a,
        .haru-home-social-placeholder {
          font-size: 22.5px;
        }
        .haru-home-post-icon {
          font-size: 30px;
        }
        @media (min-width: 581px) {
          .haru-home-topic-full .haru-home-topic-content {
            position: relative;
          }
          .haru-home-topic-full .haru-home-post-grid {
            margin-top: auto;
          }
          .haru-home-topic-full .haru-home-topic-more {
            position: absolute;
            top: 100%;
            right: 0;
          }
        }
        .haru-home-intro {
          --haru-social-width: 252px;
        }
        .haru-home-intro .haru-home-socials,
        .haru-home-intro .haru-home-chat-list {
          width: var(--haru-social-width);
          max-width: 100%;
          box-sizing: border-box;
        }
        .haru-home-intro .haru-home-socials > * {
          flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .haru-home-intro {
            --haru-social-width: 198.9px;
          }
        }
        @media (max-width: 580px) {
          .haru-home-intro .haru-home-socials {
            margin-left: auto;
            margin-right: auto;
          }
          .haru-home-intro .haru-home-chat-list {
            margin-left: auto;
            margin-right: auto;
            align-self: center;
          }
        }
        #theme-haru .haru-home-footer {
          font-size: 12px;
        }
        @media (prefers-reduced-motion: reduce) {
          .haru-home-post-card,
          .haru-home-socials a {
            transition: none;
          }
        }
      `}</style>
    </>
  )
}
