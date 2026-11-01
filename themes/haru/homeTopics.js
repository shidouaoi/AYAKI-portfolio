// 首页作品配置。每项对应一个作品区块，图片和文案均在此编辑。
// src: public 内图片路径；category: Notion 分类名；limit: 显示文章数。
// 留空 src 时使用该分类首篇文章封面。description 留空时读取首篇文章摘要。
const HOME_TOPICS = [
  {
    id: 'works',
    src: 'haru/haru-cover.jfif',
    href: '/category/ハル日和',
    category: 'ハル日和',
    title: 'ハル日和 〜僕たちの家族日記〜',
    description:
      'いっぱい笑って、ちょっと悩んで、疲れたら一緒に眠る。愛に溢れた家族の話。',
    note: '(note)这里为什么要分两行？',
    icon: 'fas fa-layer-group',
    limit: 4
  },
  {
    id: 'second-series',
    src: 'haru/haru-other-1.jfif', // 例：'/haru/second-series.webp'；留空使用文章封面
    href: '/category/第二个连载',
    category: '第二个连载',
    title: '第二个连载',
    description: '这里填写第二个连载的简介。',
    note: '', // 可选补充说明，留空不显示
    icon: 'fa-solid fa-book',
    limit: 4 // 首页最多显示 4 篇，保留 more 分类入口
  }
]
export default HOME_TOPICS
