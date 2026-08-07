# 净式 JingShi — PC 端

> 专业符号(LaTeX/Markdown) → 聊天可读纯文本。桌面应用（Tauri），引擎平台无关。
> 鸿蒙版：HarmonyOS NEXT 应用。本仓库 = PC 端 + 共享净化引擎。

## 定位

把数学/物理/化学/统计等**专业符号**（LaTeX/类 LaTeX）转成微信/QQ 可显示的纯文本：
- 公式定界符完整解析：`$$..$$` / `\[..\]` / `$..$` / `\(..\)`
- 希腊字母、运算符、分数、根号、求和/积分、矩阵、重音、化学式(mhchem)
- markdown 清理：标题/列表/任务/表格/链接/粗斜体 → 纯文本
- 代码块保护：``` 内内容原样保留

## 架构

```
jingshi-pc/
├── engine/            # 净化引擎（平台无关，零依赖）
│   ├── jingshi.js     #   核心实现（Node/浏览器/ArkTS 通用）
│   ├── jingshi.d.ts   #   类型声明
│   └── test.js        #   24 用例（node engine/test.js）
├── src/               # Tauri 壳（待工具链就绪后搭建）
├── docs/ENGINE.md     # 引擎设计文档
└── package.json
```

技术栈：**Tauri 2.x**（Rust + WebView）+ 本仓库引擎。目标产物：Windows/macOS/Linux 桌面安装包。

## 当前进度

- [x] 净化引擎 JS 版（移植自鸿蒙 v2 引擎）— 24/24 测试通过
- [x] Tauri 2 壳 scaffold（前端 + Rust 编译验证通过）
- [ ] 桌面界面：输入/转换/复制
- [ ] 开源发布（GitHub + CI 三平台构建）

## 路线图

| 阶段 | 内容 |
|------|------|
| M1 | 引擎库完成（✅） |
| M2 | Tauri 壳 + 最小可用界面 |
| M3 | 功能补全 + 主题 + 历史记录 |
| M4 | 开源打磨：README + CI + release |

## 开源计划

- **净式 PC 端**（本仓库）：MIT，GitHub 发布
- **AI 桌宠**（姊妹项目）：Tauri + Live2D + LLM，复用本仓库引擎基建

## 运行测试

```
node engine/test.js
```