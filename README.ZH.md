 ---
## React-frame7
---

> Author：Neo_Huang 转载请注明出处，谢谢

> git: https://github.com/Roxyhuang/react-frame7

### How to start

如果使用Windows平台，设置空格转换:

```bash
git config --global core.autocrlf true
git config --global core.safecrlf false
```

如果Mac下报错libpng16.16.dylib with anything php related，请执行

```bash
brew install libpng
```

克隆项目：

```bash
git clone https://github.com/Roxyhuang/react-frame7.git
```
安装依赖：

```bash
npm install
```
启动dev环境：

```bash
npm run dev
```

因为在webpack-dashborad，仅需要Windows10，因此如果Windows以下需要执行：

```bash
npm run dev:win
```

启动release环境：

```bash
npm run build
```

启动prod环境：

```bash
npm run prod
```


### 目录说明

```markdown
---react-frame7 # 项目根目录
    |
    |---build/ ---|script/ --|---build.js # 生产环境或测试欢迎启动配置
    |             |          |---check-version.js # 检测npm版本是否正确
    |             |          |---dev-server.js # 开发环境启动配置
    |             |config/ --|---webpack.base.conf.js # webpack-base配置
    |             |          |---webpack.dev.conf.js # webpack-dev配置
    |             |          |---webpack.prod.conf.js # webpack-prod配置
    |             |          |---postcss.config.js    #postcss配置
    |             |bin/ -----|---commands 命令配置
    |             |
    |---config/ --|---defalut.json # 默认配置
    |             |---development.json #开发配置
    |             |---production.json #生产配置
    |             |---release.json #测试配置
    |
    |---dist/ #编译后生成文件目录
    |
    |---src/-- |---assets/ ---|---css/ # 全局样式
    |          |           ---|---img/ # 图片资源
    |          |---backend/---|mixin/ #  请求组合
    |          |              |---Backend.js # 请求区分渠道
    |          |              |---Client.js  # 主请求文件
    |          |---components/|---include/ # 木偶组件 其余的为智能组建或者为页面容器
    |          |              |---container/ # 页面容器组建
    |          |---views/-----|---project/      # 多入口1
    |          |              |---project2/     # 多入口2
    |          |---router/----| # 路由配置
    |          |---utils/-----|---Console.js
    |          |              |---ErrorHander.js
    |          |              |---Exception.js
    |---public/|---index.html # 模块页面
               |---assets/ #静态资源
    |
    |---.babelrc # babel配置
    |---editorconfig # 编辑器配置
    |---eslintignore # eslint忽略文件
    |---.eslintrc # eslint配置
    |---.stylelintrc.js # stylelint配置
    |---.gitignore # git忽略文件
    |---package.json
    |---README.md

```

### 依赖配置

前文中已搭建了私有的npm仓库，因此包管理全部依赖npm

#### 1.核心依赖

#####（1）核心库

- react
- react dom
- react-frame7或frame7
- webpack
- babel

#####（2）样式

- less
- postcss

### 移动适配、浏览器适配以及设计稿还原

- 项目中已配置postcss 写样式时直接根据750设计稿编写px即可
- 自动浏览器适配了
- 支持js获取clientWidth方案
- 支持flexible方案

### 关于图片引入
- 小图自动转base 64
- 单入口图片自动在下的assets/img目录
- 多入口文件自动生成至[name]/assets/img

### 关于样式引入
- 采用了 css in module的方式编写css
- 也可以采用global的方式引入css
- 样式中的图片直接使用相对路径即可

### 关于项目配置
采用了config模块，可以在项目根目录下config下编写json文件，并可以通过

```javascript
const test = config.get('test');
```
