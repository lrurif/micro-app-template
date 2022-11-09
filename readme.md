## MICRO-APP-TEMPLATE
## 项目介绍
此项目为一个微前端架构的项目，代码管理方式为Monorepo，包管理器为pnpm，微前端框架[micro-app](https://cangdu.org/micro-app/)。  
基座使用技术栈：webpack + typescript + vue3 +  + vue-router + pinia
## 项目结构
```
.
├── package.json                        # 项目描述文件
├── packages                            # 子包      
│   ├── base                            # 基座项目
│   │   ├── public                      # 公共资源
│   │   ├── src
│   │   │   ├── App.vue                 # 根组件
│   │   │   ├── api                     # Api请求统一管理
│   │   │   ├── assets                  # 静态资源文件
│   │   │   ├── components              # 全局组件
│   │   │   ├── eventCenter             # 事件中心（处理基座与子应用通信）
│   │   │   ├── layout                  # 公共布局组件
│   │   │   ├── main.ts                 # 入口文件
│   │   │   ├── models                  # ts类型
│   │   │   ├── router                  # 路由配置文件
│   │   │   ├── store                   # pinia 状态管理文件
│   │   │   ├── types                   # ts全局类型
│   │   │   ├── utils                   # 通用工具函数
│   │   │   └── views                   # 业务视图组件
│   │   ├── tsconfig.json               # ts配置文件
│   │   └── vue.config.js               # vue-cli打包配置文件
│   ├── data-center                     # 子应用项目
│   └── share                           # 应用共享包
│       ├── build                       # 打包公用配置
│       ├── components                  # 应用通用组件
│       ├── plugins
│       │   ├── http                    # axios通用封装
│       │   │   ├── axios.ts
│       │   │   ├── interceptors.ts
│       │   │   └── type.ts
│       │   └── pinia.ts                # pinia全局安装函数
│       ├── style                       # 通用样式
│       └── utils
│           ├── crypto.ts               # 加密工具
│           ├── eventBus.ts             # 事件中心工具
│           └── router.ts               # 路由处理工具函数
├── pnpm-lock.yaml                      # pnpm依赖锁版本文件
├── pnpm-workspace.yaml                 # 定义工作空间文件       
└── tsconfig.json                       # ts配置文件
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

## 代码提交规范
```
示例：
/**
 * feat：新增功能
 * fix：bug 修复
 * docs：文档更新
 * style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
 * refactor：重构代码(既没有新增功能，也没有修复 bug)
 * perf：性能, 体验优化
 * merge：分支合并
 * test：新增测试用例或是更新现有测试
 * build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
 * ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
 * chore：不属于以上类型的其他类型，比如构建流程, 依赖管理
 * revert：回滚某个更早之前的提交
 */
```