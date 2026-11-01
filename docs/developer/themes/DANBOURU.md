# 新主题开发基线

官方 NotionNext、origin/main 与本地 HEAD 在整理时均为 a2aa934b41c51ea95b74cbb67430e38392be01cd（2026-11-01）。

## 已整理

- RSS、SEO、Page 日期路径逻辑采用官方基线。
- 保留 Danbouru 布局、图库、Notion 图标规范化、UUID 文章跳转及文章返回值的序列化兼容处理。
- 取消主题 Live2D 加载，移动端首页入口改为可见站点图标。
- 清空旧站首页专题、默认图库分类和 about 首页设置。可在 homeTopics.js 与 config.js 中配置新内容。
- 保持现有本地 Notion 环境配置，不引入私有数据库令牌。

## 新主题入口

- index.js：页面布局与组件组合
- style.js：主题样式
- config.js：主题默认配置
- homeTopics.js：首页专题卡片
- lib/gallery.js：图库分页与分类规则
- components/：主题组件

当前仍以 danbouru 为主题标识，便于连续开发；正式命名时需同时修改图库判断、路由引用和样式根标识。Notion 的 THEME 配置优先于 NEXT_PUBLIC_THEME。

## 可删除文件（本次仅断开引用，未删除资源）

- components/Live2DWidget.js：旧站公共挂件组件，无运行引用。
- themes/danbouru/components/Live2DWidget.js：原主题挂件组件，已断开加载。
- public/live2d/：上述组件使用的 Cubism 脚本、模型、纹理和动作资源。
- public/topics/：旧站五张专题图，默认专题已清空；若不复用可删除。

components/Live2D.js 与 conf/widget.config.js 属于官方公共功能，其他主题仍有引用，保留。
public/OG.* 与 favicon* 属于站点品牌素材，应在确定新站视觉后替换，不作为废弃文件删除。

没有提交或推送本轮改动。
