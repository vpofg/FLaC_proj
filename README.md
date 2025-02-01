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
|                       | `![alt text](image.jpg)` | `<img src="image.jpg" alt="alt text">`                            | Image                 |DONE ✅     |
|                       | `:emoji:`                | `Unicode emoji (e.g., 😊)`                                        | Emoji shorthand       |DONE ✅     |
|                       |``Use `code` in file.``   | `<code>Use `code` in file.</code>`                                | Escaping Backticks    |DONE ✅     |
|                       |                          |                                                                   | Tables                |DONE ✅     |
|                       |`==very important words==`| `<mark>very important words</mark>`                               | Highlight             |DONE ✅     |
|                       |`H~2~O`                   | `H<sub>2</sub>O`                                                  | Subscript             |DONE ✅     |
|                       |'X^2^`                    | `X<sup>2</sup>`                                                   | Superscript           |DONE ✅     |
| **Headings**          | `# Header 1`             | `<h1>`                                                            | Header level 1        |DONE ✅     |
|                       | `## Header 2`            | `<h2>`                                                            | Header level 2        |DONE ✅     |
|                       | `### Header 3`           | `<h3>`                                                            | Header level 3        |DONE ✅     |
|                       | `#### Header 4`          | `<h4>`                                                            | Header level 4        |DONE ✅     |
|                       | `##### Header 5`         | `<h5>`                                                            | Header level 5        |DONE ✅     |
|                       | `###### Header 6`        | `<h6>`                                                            | Header level 6        |DONE ✅     |
| **Lists**             | `- item`                 | `<ul><li>item</li></ul>`                                          | Unordered list        |DONE ✅     |
|                       | `1. item`                | `<ol><li>item</li></ol>`                                          | Ordered list          |DONE ✅     |
|                       | `- [ ] Task`             | `<ul><li><input type="checkbox">Task</li></ul>`                   | Task list (unchecked) |DONE ✅     |
|                       | `- [x] Completed Task`   | `<ul><li><input type="checkbox" checked>Completed Task</li></ul>` | Task list (checked)   |DONE ✅     |
| **Blocks**            | `> blockquote`           | `<blockquote>`                                                    | Blockquote            |DONE ✅     |     
|                       | `---`                    | `<hr>`                                                            | Horizontal rule       |DONE ✅     |
|                       | Fenced code block (```)  | `<pre><code>`                                                     | Code block            |DONE ✅     |
| **Advanced Features** | Fenced code block Syntax | `<pre><code>`                                                     | Syntax Highlight      |DONE ✅     |
|                       | `{#id .class}`           | `<element id="id" class="class">`                                 | Custom attributes     |DONE ✅     |
| **Extensions**        | `$$math$$`               | `<math>` or rendered MathML                                       | LaTeX-style math      |DONE ✅     |

## Extra Tasks

- Syntax highlighting on given language for code blocks with [Prism.js](https://prismjs.com/)
- Parse LaTeX style notation to [MathML](https://developer.mozilla.org/en-US/docs/Web/MathML)

## Running the Converter
1. Colne the repository (git clone) to compuetr or copy the code into your editor and save the files(markdown_converter and converter.html)
2. Double clilck the html file to open it in the browser
3. Ready to use converter

