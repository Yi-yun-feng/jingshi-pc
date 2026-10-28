# 净式 JingShi — PC 端

> 把 LaTeX / Markdown 专业符号转成**聊天软件能正常显示**的纯文本。
> 桌面应用（Tauri 2），引擎平台无关。

**解决的问题：** 把公式粘到微信 / QQ 里，对方看到的是一堆 `\frac{a}{b}`、`\mathbb{R}`、`\sum_{i=1}^{n}`。

```
$\sigma_{\text{max}}=\sqrt{\frac{1}{n}\sum_{i=1}^{n}(x_i-\bar{x})^2}$
        ↓
σₘₐₓ=√(1/n∑(i=1..n)(xᵢ-x̄)²)
```

---

## 功能

- **公式定界符完整解析**：`$$..$$` / `\[..\]` / `$..$` / `\(..\)`
- **结构解析**（非字符串替换）：分数、根号、上下限、矩阵、cases、aligned
- **符号覆盖**：希腊字母、运算符、箭头、集合、重音
- **矩阵环境**：`matrix` / `pmatrix` / `bmatrix` / `Bmatrix` / `vmatrix` / `Vmatrix`
- **化学式**：`$\ce{H2O}$` → `H₂O`
- **上下标**：能转 Unicode 就转（`xᵢ²`），否则降级为 `^(...)`
- **Markdown 清理**：标题 / 列表 / 表格 / 链接 / 粗斜体 → 纯文本
- **代码块保护**：``` 与 `` ` `` 内的内容原样保留

---

## 架构

```
jingshi-pc/
├── engine/              # 净化引擎（平台无关，零依赖）
│   ├── jingshi.js       #   核心实现，690 行
│   ├── jingshi.d.ts     #   类型声明
│   └── test.js          #   28 用例
├── src/                 # 前端（Vite + TypeScript）
│   ├── main.ts          #   界面逻辑
│   └── styles.css
├── src-tauri/           # Tauri 2 壳（Rust）
├── docs/ENGINE.md       # 引擎设计文档
└── package.json
```

技术栈：**Tauri 2.x**（Rust + WebView）+ 零依赖引擎。产物：Windows / macOS / Linux 桌面安装包。

---

## 当前进度

- [x] 净化引擎（28/28 测试通过）
- [x] Tauri 2 壳（前端 + Rust 编译验证通过）
- [x] **桌面界面**：双栏输入、实时转换、复制、清空
- [x] CI：三平台构建验证 + release workflow
- [ ] 发布首个版本

## 路线图

| 阶段 | 内容 | 状态 |
|------|------|------|
| M1 | 引擎库完成 | ✅ |
| M2 | Tauri 壳 + 最小可用界面 | ✅ |
| M3 | 功能补全 + 主题 + 历史记录 | 待做 |
| M4 | 开源打磨：文档 + release | 进行中 |

---

## 测试

```bash
npm test           # = node engine/test.js
```

当前 **28 / 28 通过**。

---

## 开发

```bash
npm install
npm run dev        # 浏览器预览前端
npm run tauri dev  # Tauri 桌面窗口
npm run build      # 构建
npm run tauri build # 打包安装包
```

---

## 相关项目

- **鸿蒙版**：HarmonyOS NEXT 应用（ArkTS），独立的引擎实现
- **AI 桌宠**：Tauri + Live2D + LLM，复用本仓库引擎

---

## 许可证

MIT
