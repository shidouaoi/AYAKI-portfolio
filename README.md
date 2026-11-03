# AYAKI Portfolio · Theme "Haru"

![AYAKI Portfolio Banner](https://ayaki.cat-fish.net/og.jpg)

基于 [NotionNext](https://github.com/notionnext-org/NotionNext) 和 [猫尾巴纸箱？](https://danbouru.cat-fish.net/) 改造的个人作品集站点。
由[猫鱼](https://cat-fish.net)制作主题及维护。

### 主要魔改

- 根据不同的分类制作首页不同样式的区块
- 作品列表下方的封面图由[homeTopics.js](themes/haru/homeTopics.js)控制，可自定义
- SNS图标由[socialLinks.js](themes/haru/socialLinks.js)控制，可自定义
- 图库模式小升级：取消按月份排列，并修复一个webkit造成的视觉bug
- 新增内文购物车引导框特殊样式，由Notion的Callout标注区块触发
    - 触发条件：标注区块里第一行文字是`ご購入はこちら`（兼容有无冒号），并且图标是`shopping cart`
- 凑合在 labels.js 里放了多语言控制……但后来放弃做多语言了

### 挣扎的痕迹

建站笔记放在[这里](https://danbouru.cat-fish.net/memo-others/40db7f05-e444-804f-a309-d70647a9aa51)了。