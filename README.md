# Message Board by Vue

## update

增加了绿色主题可供选择，新增删除留言功能。

## 简介

一个简易留言板。\
技术栈: \
前端: Vue3 + Tailwind CSS + Less \
后端: Node.js + Express\
数据库: MySQL \
UI界面参考
[Xoyondo留言板](https://xoyondo.com/zh/create-personal-message-board), 推荐页面大小为800x1000.

## Screenshot

<div align=center>
<img src="./img_show/page1-3.png" width=50% /><img src="./img_show/page1-4.png" width=50% />
</div>
<!-- ![image](./img_show/page1-3.png) -->

## IDE Setup

[VSCode](https://code.visualstudio.com/) + Easy LESS插件

css构建过程:\
index.less -(Easy LESS插件)-> index.css -(Tailwind CLI)-> index_output.css

## Project Setup

```sh
cd vue
cnpm install

cd server
cnpm install
```

### Run

```sh
# 启动前端
cd vue
npm run dev

# 启动后端
cd server
node server.js
```
