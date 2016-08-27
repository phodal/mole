# Mole(墨乐) - a github-base note
 
> A GitHub-base Cloud Note, design for open & free GitHub User.

Feature in Design: 

 - GitHub as Database
 - GitHub Page as Blog / Note for Display
 - Markdown Support
 - Issues as Todo List
 - Issues as Idea List
 
Platform in Plan: 

> Build with React

 - Electron for Desktop (Mac OS, Windows, GNU/Linux)
 - Cordova for Mobile (Android, iOS, Windows Phone)
 - Web
 
 
Setup
---

```
git clone git@github.com:phodal/mole.git
npm install
```


API
---

### Note API in Design

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

### GitHub API

Todo Example: [https://github.com/phodal/mole-test/issues/1](https://github.com/phodal/mole-test/issues/1)

Idea Example: [https://github.com/phodal/ideas/issues](https://github.com/phodal/ideas/issues)

Commit History: [https://api.github.com/repos/phodal/mole-test/commits?path=notes/hello-world.md](https://api.github.com/repos/phodal/mole-test/commits?path=notes/hello-world.md)

TODO
---

 - Localstorage 回收。 Localstorage 的存储大小为5M。

License
---

[![Phodal's Idea](http://brand.phodal.com/shields/idea-small.svg)](http://ideas.phodal.com/)

© 2016 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas).  This code is distributed under the MIT license. See `LICENSE` in this directory.

[![待我代码编成,娶你为妻可好](http://brand.phodal.com/slogan/slogan.svg)](http://www.xuntayizhan.com/person/ji-ke-ai-qing-zhi-er-shi-dai-wo-dai-ma-bian-cheng-qu-ni-wei-qi-ke-hao-wan/)
