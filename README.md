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

| **Category**          | **Markdown Syntax**      | **HTML Output**                                                   | **Description**       |
| --------------------- | ------------------------ | ----------------------------------------------------------------- | --------------------- |
| **Text Formatting**   | `**bold**` or `__bold__` | `<strong>`                                                        | Bold text             |
|                       | `*italic*` or `_italic_` | `<em>`                                                            | Italic text           |
|                       | `~~strikethrough~~`      | `<del>`                                                           | Strikethrough text    |
|                       | `` `inline code` ``      | `<code>`                                                          | Inline code           |
|                       | `[text](url)`            | `<a href="url">text</a>`                                          | Hyperlink             |
|                       | `![alt text](image.jpg)` | `<img src="image.jpg" alt="alt text">`                            | Image                 |
|                       | `:emoji:`                | Unicode emoji (e.g., 😊)                                          | Emoji shorthand       |
| **Headings**          | `# Header 1`             | `<h1>`                                                            | Header level 1        |
|                       | `## Header 2`            | `<h2>`                                                            | Header level 2        |
|                       | `### Header 3`           | `<h3>`                                                            | Header level 3        |
|                       | `#### Header 4`          | `<h4>`                                                            | Header level 4        |
|                       | `##### Header 5`         | `<h5>`                                                            | Header level 5        |
|                       | `###### Header 6`        | `<h6>`                                                            | Header level 6        |
| **Lists**             | `- item` or `* item`     | `<ul><li>item</li></ul>`                                          | Unordered list        |
|                       | `1. item`                | `<ol><li>item</li></ol>`                                          | Ordered list          |
|                       | `- [ ] Task`             | `<ul><li><input type="checkbox">Task</li></ul>`                   | Task list (unchecked) |
|                       | `- [x] Completed Task`   | `<ul><li><input type="checkbox" checked>Completed Task</li></ul>` | Task list (checked)   |
| **Blocks**            | `> blockquote`           | `<blockquote>`                                                    | Blockquote            |
|                       | `---` or `***`           | `<hr>`                                                            | Horizontal rule       |
|                       | Fenced code block (```)  | `<pre><code>`                                                     | Code block            |
|                       | Fenced code block Syntax | `<pre><code>` with [Prism.js](https://prismjs.com/)               | Syntax Highlight      |
| **Advanced Features** | `[^1]: Footnote text`    | `<sup id="fn1">1</sup>`                                           | Footnotes             |
|                       | `{#id .class}`           | `<element id="id" class="class">`                                 | Custom attributes     |
| **Extensions**        | `$$math$$`               | `<math>` or rendered MathML                                       | LaTeX-style math      |

## Extra Tasks

- Additionally parse from markdown to JSON
- Syntax highlighting on given language for code blocks with [Prism.js](https://prismjs.com/)
- Parse LaTeX style notation to [MathML](https://developer.mozilla.org/en-US/docs/Web/MathML)

