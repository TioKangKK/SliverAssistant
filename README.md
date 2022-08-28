# 益助银龄 - 助老小程序

## 本地运行

1. 安装微信小程序开发者工具
2. 确认已安装 node14，yarn, 以及 git
3. 在终端运行
   1. `git clone https://github.com/TioKangKK/SliverAssistant.git`
   2. `cd SliverAssistant`
   3. `yarn`
   4. `yarn dev:weapp`
4. 打开微信小程序开发者工具，打开`SliverAssistant/dist`目录本地预览

## 文件结构

```plain
|- config // 编译配置相关
|- dist // 编译后的产物
|- src // 源码
    |- assets // 一些图片资源
    |- business // 业务组件
    |- components // 样式组件
    |- constants // 一些常量
    |- pages // 首页
    |- pagesDocument // 档案相关页面
    |- pagesGroups // 分组相关页面
    |- pagesNotification // 消息通知相关页面
    |- pagesPersonal // 登录注册相关页面
    |- pagesWatchOver // 观护相关页面
    |- service // 接口相关
    |- store // 前端本地存储
    |- types // 一些类型信息
    |- utils // 一些基础方法
    app.config.ts // 项目配置
    app.less // 项目级样式
    app.ts // 项目入口
.package.json // 项目包文件信息
works.md // 一些项目中使用的词汇
```
