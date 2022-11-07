## MICRO-APP-TEMPLATE
## 项目介绍
此项目为一个微前端架构的项目，微前端的框架为[micro-app](https://cangdu.org/micro-app/)。  
基座使用技术栈：webpack + typescript + vue3 +  + vue-router + pinia
## 项目结构
```
.
├── package.json
├── packages                                   
│   ├── base
│   │   ├── public
│   │   │   ├── favicon.ico
│   │   │   └── index.html
│   │   ├── src
│   │   │   ├── App.vue
│   │   │   ├── api
│   │   │   ├── assets
│   │   │   ├── components
│   │   │   ├── eventCenter
│   │   │   ├── layout
│   │   │   │   ├── components
│   │   │   │   │   └── Navbar.vue
│   │   │   │   ├── empty.vue
│   │   │   │   └── index.vue
│   │   │   ├── main.ts
│   │   │   ├── models
│   │   │   │   └── User.ts
│   │   │   ├── router
│   │   │   │   ├── index.ts
│   │   │   │   └── modules
│   │   │   ├── shims-vue.d.ts
│   │   │   ├── store
│   │   │   │   └── index.ts
│   │   │   ├── types
│   │   │   │   └── global.d.ts
│   │   │   ├── utils
│   │   │   │   └── request.ts
│   │   │   └── views
│   │   │       ├── DataCenter.vue
│   │   │       ├── Home.vue
│   │   │       ├── Merchant.vue
│   │   │       └── login
│   │   │           └── index.vue
│   │   ├── tsconfig.json
│   │   └── vue.config.js
│   ├── data-center
│   │   ├── README.md
│   │   ├── auto-imports.d.ts
│   │   ├── babel.config.js
│   │   ├── components.d.ts
│   │   ├── package.json
│   │   ├── public
│   │   │   ├── favicon.ico
│   │   │   └── index.html
│   │   ├── src
│   │   │   ├── App.vue
│   │   │   ├── api
│   │   │   │   └── User
│   │   │   │       └── index.ts
│   │   │   ├── assets
│   │   │   │   ├── css
│   │   │   │   │   └── index.scss
│   │   │   │   └── logo.png
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── layout
│   │   │   │   ├── components
│   │   │   │   │   ├── Breadcrumb.vue
│   │   │   │   │   ├── Menubar.vue
│   │   │   │   │   ├── Sidebar.vue
│   │   │   │   │   └── index.ts
│   │   │   │   ├── empty.vue
│   │   │   │   └── index.vue
│   │   │   ├── main.ts
│   │   │   ├── models
│   │   │   │   ├── User.ts
│   │   │   │   └── store.d.ts
│   │   │   ├── publicPath.ts
│   │   │   ├── router
│   │   │   │   ├── children
│   │   │   │   │   ├── overview-page.ts
│   │   │   │   │   └── user-center.ts
│   │   │   │   └── index.ts
│   │   │   ├── shims-vue.d.ts
│   │   │   ├── store
│   │   │   │   └── index.ts
│   │   │   ├── types
│   │   │   │   └── global.d.ts
│   │   │   ├── utils
│   │   │   │   └── request.ts
│   │   │   └── views
│   │   ├── tsconfig.json
│   │   └── vue.config.js
│   ├── merchant
│   │   ├── README.md
│   │   ├── babel.config.js
│   │   ├── package.json
│   │   ├── public
│   │   │   ├── favicon.ico
│   │   │   └── index.html
│   │   ├── src
│   │   │   ├── App.vue
│   │   │   ├── assets
│   │   │   │   └── logo.png
│   │   │   ├── components
│   │   │   │   └── HelloWorld.vue
│   │   │   ├── main.ts
│   │   │   ├── publicPath.ts
│   │   │   ├── router
│   │   │   ├── shims-vue.d.ts
│   │   │   ├── types
│   │   │   └── views
│   │   │    
│   │   ├── tsconfig.json
│   │   └── vue.config.js
│   └── share
│       ├── build
│       │   └── plugins.js
│       ├── components
│       │   └── 404
│       │       └── index.vue
│       ├── package.json
│       ├── plugins
│       │   ├── http
│       │   │   ├── axios.ts
│       │   │   ├── interceptors.ts
│       │   │   └── type.ts
│       │   └── pinia.ts
│       ├── style
│       │   ├── iconfont.scss
│       │   ├── index.scss
│       │   ├── mixin.scss
│       │   ├── normalize.scss
│       │   └── transition.scss
│       └── utils
│           ├── crypto.ts
│           ├── eventBus.ts
│           └── router.ts
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── push.sh
├── readme.md
└── tsconfig.json
```
## 安装
```sh
# 克隆项目
git clone https://github.com/lrurif/micro-app-template.git

# 进入项目目录
cd micro-app-template

# 安装依赖（需安装pnpm）
pnpm i

# 本地开发 启动项目
npm run dev
```

启动完成后会自动打开浏览器并访问 http://localhost:9001

## 常用命令
```sh
# 项目开发
npm run dev
# 如果需要单独开发某一个项目，则运行 npm run build:子项目名称，示例：
npm run dev:base
# 项目打包（所有包）
npm run build
# 如果需要单独打某一个包，则运行 npm run build:子项目名称，示例：
npm run build:base
```