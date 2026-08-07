# 净式引擎 — 设计文档

## 管线

```
1. 代码块保护（``` 内容原样）
2. 公式定界符完整解析：$$..$$ / \[..\] / $..$ / \(..\) → latexToText
3. 公式外轻量转换：裸命令（\alpha→α）+ _数字→下标 + ^数字→上标（化学式 H_2O→H₂O）
4. markdown 清理：标题→【】、列表→·/序号、任务→✅/⬜、表格→斜杠、链接/图片/粗斜体
5. 还原代码块 + 压缩空行
```

## 转换规则

### 公式命令（latexToText）
| 命令 | 输出 | 示例 |
|------|------|------|
| \frac{a}{b} / \dfrac | a/b | $\frac{1}{2}$ → 1/2 |
| \sqrt{x} | √(x) | |
| \sqrt[n]{x} | √ⁿ(x) | $\sqrt[3]{8}$ → √³(8) |
| \sum_{i=1}^{n} | Σ(i=1, n) | |
| \int_{0}^{1} | ∫(0..1) | |
| \lim_{x \to 0} | lim(x→0) | |
| \binom{n}{k} | C(n, k) | |
| \bar/\hat/\vec/\dot/\ddot/\tilde/\overline/\underline | 字符+组合重音 | $\bar{x}$ → x̄ |
| \begin{matrix/cases/aligned/align} | 分列/分行 | |
| \ce{...} | mhchem 化学式 | $\ce{SO4^2-}$ → SO₄²⁻ |
| \text/\mathrm/\mathbf/\mathbb/\boldsymbol/\operatorname | 按纯文本 | $\mathbb{R}$ → R |

### 上下标
- 纯数字/单字符 → Unicode 上下标（⁰¹²³ 等、₀₁₂ 等）
- 多字符字母 → 降级保留（`x^{abc}` 不变）
- 支持表：SUP（数字+运算符+字母ᵃ-ᶻ）、SUB（数字+运算符+常用字母）

### 符号表
- 希腊字母（含大写）：\alpha → α ... \Omega → Ω
- 运算符/关系：\times \cdot \div \pm \leq \geq \neq \approx \in \subset ...
- 箭头/逻辑：\rightarrow \Rightarrow \mapsto \land \lor \neg ...
- 自定义：setCustom([['\\cmd', '符号'], ...]) 优先于内置表

### markdown 清理
- 标题 # → 【标题】
- 列表 -/*/+ → · 项；有序 → 序号项；任务 - [x] → ✅
- 表格 → 单元格用 / 连接（分隔行忽略）
- 图片 ![alt](url) → [图片] alt；链接 [t](url) → t（url）
- 粗体/斜体/删除线/行内代码 → 去标记
- 引用 > → 去前缀
- 代码块（```）原样保留

## 纯文本检测（不误伤）
无任何转换特征（\\ $ # * ` [ ] | > ~ _数字 ^数字）→ 原样返回，只压缩多余空行。

## 测试
- engine/test.js：24 用例（公式/符号/矩阵/化学式/markdown/代码块/纯文本）
- 运行：node engine/test.js → ALL PASSED

## 移植记录
- 来源：鸿蒙版 MarkdownConverter.ets（2026-08-04 v2 引擎，17/17 测试通过）
- 本 JS 版：2026-08-07 移植，行为与 Python 验证版（jingshi_v2.py）一致
- 平台无关：Node / 浏览器 / HarmonyOS ArkTS 均可运行，零依赖