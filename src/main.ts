import { MarkdownConverter } from "../engine/jingshi.js";

const conv = new MarkdownConverter();

const inputEl = document.querySelector<HTMLTextAreaElement>("#input")!;
const outputEl = document.querySelector<HTMLTextAreaElement>("#output")!;
const copyBtn = document.querySelector<HTMLButtonElement>("#copy")!;
const clearBtn = document.querySelector<HTMLButtonElement>("#clear")!;

function convert() {
  outputEl.value = conv.convert(inputEl.value);
}

function copy() {
  void navigator.clipboard.writeText(outputEl.value);
  const original = copyBtn.textContent;
  copyBtn.textContent = "已复制";
  window.setTimeout(() => {
    copyBtn.textContent = original;
  }, 1200);
}

inputEl.addEventListener("input", convert);
copyBtn.addEventListener("click", copy);
clearBtn.addEventListener("click", () => {
  inputEl.value = "";
  convert();
});
