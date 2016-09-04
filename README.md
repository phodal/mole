# 墨乐 - Mole, a github-base note

[![Build Status](https://travis-ci.org/phodal/mole.svg?branch=master)](https://travis-ci.org/phodal/mole)

> A GitHub-base Cloud Note, design for open & free GitHub User.

Online Demo: [https://phodal.github.io/mole-web/](https://phodal.github.io/mole-web/)

Features: 

 - GitHub as Database
 - GitHub Page as Blog / Note for Display (TBC)
 - Markdown Support
 - Issues as Idea List 
 
跨平台

 - Web——GitHub Page发布。react-static-boilerplate提供了一个脚本可以直接发布代码到GitHub Page。
 - Mobile——Android和iOS等移动版本。由于使用的是React MDL作为UI框架，所以只需要写点简单的Cordova脚本就可以实现打包。
 - Desktop——Electron桌面。同样的，使用个脚本来实现。
 - Chrome插件(TBC)
 - 微信集成(TBC)

Setup GitHub
---

1. create a GitHub branch with gh-pages for note
2. open App and setup
 
 - Repo
 - Token
 - Commit Username
 - Commit Email

Documents
---

### Setup

Basic

```
git clone git@github.com:phodal/mole.git
npm install
```

Run Server

```
npm start
```

Run Android

```
./ci/run-android.sh
```

Run iOS

```
./ci/run-ios.sh
```

Run Electron

```
npm run electron
```

技术栈

 - React MDL
 - Fetch 
 - Webpack
 - Redux
 - Cordova
 - Electron

More

 - moment，用于显示时间
 - jsdiff，用于diff修改
 - github-api，一个简单好用的GitHub API封装
 - draft.js，用于未来提供富文本支持
 - to-markdown和markdown-it，用于用富文本提供转换支持，似乎不是很完善

### API

#### Note API

Example: [https://github.com/phodal/mole-test/blob/gh-pages/api/all.json](https://github.com/phodal/mole-test/blob/gh-pages/api/all.json)

```
{
    "description": "对于以技术为核心的技术博客来说，人们是冲着他们需要的内容去的，绝大多数情况下都不是在闲逛。如果你的网站里没有他想要的东西的话，他便会离开，人们是出于目的去搜索，基于动机，而不是无聊的在闲逛。无聊的话，他们更多的会去刷刷朋友圈的，看看鸡汤。",
    "path": "notes/hello-world-2.md",
    "title": "分析篇：什么样的文章受欢迎？",
    "created": "2016-08-19T01:37:50+00:00",
    "updated": "2016-08-23T12:32:53+00:00"
}
```

#### GitHub API

Ideas Example: [https://github.com/phodal/ideas/issues](https://github.com/phodal/ideas/issues)

Commit History: [https://api.github.com/repos/phodal/mole-test/commits?path=notes/hello-world.md](https://api.github.com/repos/phodal/mole-test/commits?path=notes/hello-world.md)

License
---

[![Phodal's Idea](http://brand.phodal.com/shields/idea-small.svg)](http://ideas.phodal.com/)

© 2016 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas).  This code is distributed under the MIT license. See `LICENSE` in this directory.

[![待我代码编成,娶你为妻可好](http://brand.phodal.com/slogan/slogan.svg)](http://www.xuntayizhan.com/person/ji-ke-ai-qing-zhi-er-shi-dai-wo-dai-ma-bian-cheng-qu-ni-wei-qi-ke-hao-wan/)
