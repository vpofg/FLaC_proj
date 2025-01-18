# FLaC_proj
A project for Formal Languages and Compilers classes at my uni

# Compiler Project

## Markdown-to-HTML Compiler
Wojciech Bronisz, Jan Gwara

## Project Goals
Parse and tokenize Markdown syntax.

Generate HTML output for various Markdown elements.

### Live Preview
- Allow users to see the Markdown and resulting HTML/JSON side by side in JavaScript.
---
### **Markdown Syntax and HTML Conversion Table**

| **Category**          | **Markdown Syntax**      | **HTML Output**                                                   | **Description**       | **Status** |
| --------------------- | ------------------------ | ----------------------------------------------------------------- | --------------------- |------------|
| **Text Formatting**   | `**bold**` or `__bold__` | `<strong>`                                                        | Bold text             |DONE ✅     |
|                       | `*italic*` or `_italic_` | `<em>`                                                            | Italic text           |DONE ✅     |
|                       | `~~strikethrough~~`      | `<del>`                                                           | Strikethrough text    |DONE ✅     |
|                       | `` `inline code` ``      | `<code>`                                                          | Inline code           |DONE ✅     |
|                       | `[text](url)`            | `<a href="url">text</a>`                                          | Hyperlink             |DONE ✅     |
|                       | `![alt text](image.jpg)` | `<img src="image.jpg" alt="alt text">`                            | Image                 |TODO 🟠     |
|                       | `:emoji:`                | `Unicode emoji (e.g., 😊)`                                        | Emoji shorthand       |DONE ✅     |
| **Headings**          | `# Header 1`             | `<h1>`                                                            | Header level 1        |DONE ✅     |
|                       | `## Header 2`            | `<h2>`                                                            | Header level 2        |DONE ✅     |
|                       | `### Header 3`           | `<h3>`                                                            | Header level 3        |DONE ✅     |
|                       | `#### Header 4`          | `<h4>`                                                            | Header level 4        |DONE ✅     |
|                       | `##### Header 5`         | `<h5>`                                                            | Header level 5        |DONE ✅     |
|                       | `###### Header 6`        | `<h6>`                                                            | Header level 6        |DONE ✅     |
| **Lists**             | `- item` or `* item`     | `<ul><li>item</li></ul>`                                          | Unordered list        |DONE ✅     |
|                       | `1. item`                | `<ol><li>item</li></ol>`                                          | Ordered list          |DONE ✅     |
|                       | `- [ ] Task`             | `<ul><li><input type="checkbox">Task</li></ul>`                   | Task list (unchecked) |DONE ✅     |
|                       | `- [x] Completed Task`   | `<ul><li><input type="checkbox" checked>Completed Task</li></ul>` | Task list (checked)   |DONE ✅     |
| **Blocks**            | `> blockquote`           | `<blockquote>`                                                    | Blockquote            |DONE ✅     |     
|                       | `---` or `***`           | `<hr>`                                                            | Horizontal rule       |DONE ✅     |
|                       | Fenced code block (```)  | `<pre><code>`                                                     | Code block            |DONE ✅     |
|                       | Fenced code block Syntax | `<pre><code>` with [Prism.js](https://prismjs.com/)               | Syntax Highlight      |DONE ✅     |
| **Advanced Features** | `[^1]: Footnote text`    | `<sup id="fn1">1</sup>`                                           | Footnotes             |TODO 🟠     |
|                       | `{#id .class}`           | `<element id="id" class="class">`                                 | Custom attributes     |TODO 🟠     |
| **Extensions**        | `$$math$$`               | `<math>` or rendered MathML                                       | LaTeX-style math      |DONE ✅     |

## Extra Tasks

- Additionally parse from markdown to JSON
- Syntax highlighting on given language for code blocks with [Prism.js](https://prismjs.com/)
- Parse LaTeX style notation to [MathML](https://developer.mozilla.org/en-US/docs/Web/MathML)

### Test Input Markdown String

**bold**
<br/>
<br/>
*italic*
<br/>
<br/>
~~Strikethrough~~
<br/>
<br/>
This is an example of an inline code block `def function`
<br/>
<br/>
[Hyperlink](https://github.com/vpofg/FLaC_proj)
<br/>
# Title
## Subtitle
### Header 3
#### Header 4
##### Header 5
###### Header 6
- item
1. item
1.item
<br/>
<br/>
Horizontal rule:
---

Here is some inline math: $E = mc^2$
</br>
Here is a block of code:
</br>
```javascript
function helloWorld() {
    console.log("Hello, world!");
}
```

Here is a display math block:

$$\int_{a}^{b} x^2 dx$$