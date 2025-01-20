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

# Markdown-to-HTML Converter Test

## Text Formatting

**Bold text using double asterisks**<br/>
__Bold text using double underscores__<br/>
<br/>
*Italic text using single asterisks*<br/>
_Italic text using single underscores_<br/>
<br/>
~~Strikethrough text~~<br/>
<br/>
Inline code: `inline code`<br/>
<br/>
[Hyperlink to GitHub](https://github.com/vpofg/FLaC_proj)<br/>
<br/>
![Alt text for image](https://via.placeholder.com/150)<br/>
<br/>
😊 Unicode emoji<br/>
<br/>

## Headings

# Header 1<br/>
## Header 2<br/>
### Header 3<br/>
#### Header 4<br/>
##### Header 5<br/>
###### Header 6<br/>
<br/>

## Lists

### Unordered List

- Item 1<br/>
- Item 2<br/>
  - Subitem 2.1<br/>
  - Subitem 2.2<br/>
<br/>

### Ordered List

1. Item 1<br/>
2. Item 2<br/>
   1. Subitem 2.1<br/>
   2. Subitem 2.2<br/>
<br/>

### Task Lists

- [ ] Task 1<br/>
- [x] Completed Task<br/>
<br/>

## Blocks

> This is a blockquote<br/>
<br/>
---
<br/>

### Fenced Code Block with Syntax Highlights

```javascript
function helloWorld() {
    console.log("Hello, world!");
}
``` 
</br>
## Advanced Features
### LaTeX-style Math
Inline math: $E = mc^2$
<br/><br/> 
Display math:
<br/> 
$$\int_{a}^{b} x^2 dx$$