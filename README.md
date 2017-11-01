 ---
## React-frame7
---

> Author：Neo_Huang

> git: https://github.com/Roxyhuang/react-frame7

### How to start

If you want use in Windows, Please set

```bash
git config --global core.autocrlf true
git config --global core.safecrlf false
```

If show error of libpng16.16.dylib with anything php related,Please install libpng

```bash
brew install libpng
```

clone：

```bash
git clone https://github.com/Roxyhuang/react-frame7.git
```
install dependency：

```bash
npm install
```
run dev：

```bash
npm run dev
```

Beacause webpack-dashborad must run in Windows10，If you need run in Windows7, Please：

```bash
npm run dev:win
```

run release：

```bash
npm run build
```

run prod：

```bash
npm run prod
```


### 目录说明

```markdown
---react-frame7 # 项目根目录
    |
    |---build/ ---|script/ --|---build.js # entry for build
    |             |          |---check-version.js # check version of npm
    |             |          |---dev-server.js # entry for dev-server
    |             |config/ --|---webpack.base.conf.js # webpack-base config
    |             |          |---webpack.dev.conf.js # webpack-dev config
    |             |          |---webpack.prod.conf.js # webpack-pro config
    |             |          |---postcss.config.js    #postcss config
    |             |bin/ -----|---commands commands config
    |             |
    |---config/ --|---defalut.json # defalut config file
    |             |---development.json # dev config file
    |             |---production.json # prod config file
    |             |---release.json # release config file
    |
    |---dist/ #  dist file
    |
    |---src/-- |---assets/ ---|---css/ # global style
    |          |           ---|---img/ # image
    |          |---backend/---|mixin/ #  request function
    |          |              |---Backend.js # 请求区分渠道
    |          |              |---Client.js  # client file
    |          |---components/|---include/ # normal components
    |          |              |---container/ # views container
    |          |---views/-----|---project/      # entry 1
    |          |              |---project2/     # entry 2
    |          |---router/----| # router config
    |          |---utils/-----|---Console.js
    |          |              |---ErrorHander.js
    |          |              |---Exception.js
    |---public/|---index.html # template html
               |---assets/ # static assets
    |
    |---.babelrc # babel config file
    |---editorconfig # editor config file
    |---eslintignore # eslint ignore file
    |---.eslintrc # eslint config file
    |---.stylelintrc.js # stylelint config file
    |---.gitignore # git ignore file
    |---package.json
    |---README.md English README.MD
    |---README.ZH.md Chinese README.MD

```

### dependency config

#### 1.core

（1）core dependency

- react
- react dom
- react-frame7 or frame7
- webpack
- babel

（2）style
- less
- postcss

### About mobile and layout

- Please use px unit for base 750px design
- autoprefixer
- support mobile layout base clientWidth
- support mobile layout base flexible

### About image

- support base 64


### About Style

- support css in module
- support global css

### About config file

If you need write config file and get config , You can use node-config module

```javascript
import config from 'config';
const test = config.get('test');
```

### some problem

- code splitting
