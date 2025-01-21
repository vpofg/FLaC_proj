
document.body.innerHTML = `
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px;
        }

        h1 {
            text-align: center;
        }

        .container {
            display: flex;
            width: 80%;
            gap: 20px;
        }

        textarea {
            width: 50%;
            height: 300px;
            font-size: 16px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            resize: none;
        }

        .preview {
            width: 50%;
            height: 300px;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            background-color: #f9f9f9;
            overflow-y: auto;
        }

        button {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #0056b3;
        }

        .error {
            color: red;
            font-weight: bold;
            margin-top: 10px;
        }
    </style>
    <h1>Markdown to HTML Converter</h1>
    <div class="container">
        <textarea id="markdownInput" placeholder="Paste your Markdown code here..."></textarea>
        <div id="htmlPreview" class="preview">HTML Preview will appear here...</div>
    </div>
    <button id="convertButton">Convert</button>
    <div id="errorMessage" class="error"></div>
`;

function markdownToHtml(markdown) {
    let errors = [];

    function processEscapedCharacters(md) {
        const escapeMap = {
            '\\\\': '\\',  // backslash
            '\\`': '`',    // backtick
            '\\*': '*',    // asterisk
            '\\_': '_',    // underscore
            '\\{': '{',    // curly brace (open)
            '\\}': '}',    // curly brace (close)
            '\\[': '[',    // bracket (open)
            '\\]': ']',    // bracket (close)
            '\\(': '(',    // parenthesis (open)
            '\\)': ')',    // parenthesis (close)
            '\\<': '<',    // angle bracket (open)
            '\\>': '>',    // angle bracket (close)
            '\\#': '#',    // pound sign
            '\\+': '+',    // plus sign
            '\\-': '-',    // minus sign (hyphen)
            '\\.': '.',    // dot
            '\\!': '!',    // exclamation mark
            '\\|': '|',    // pipe
            '\\~': '~',    // Tilde
        };

        // Replace escaped characters
        return md.replace(/\\([\\`*_{}\[\]()<>#+\-.!|~])/g, (_, char) => escapeMap[`\\${char}`] || char);
    }

    function formatTables(md) {
        const tableRegex = /^\|[^\n]+\|\n\|[-:| ]+\|\n(?:\|[^\n]+\|\n?)+/gm;

        return md.replace(tableRegex, (table) => {
            const rows = table.trim().split("\n");
            const headers = rows[0]
                .split("|")
                .slice(1, -1)
                .map((h) => `<th>${h.trim()}</th>`)
                .join("");
            const body = rows
                .slice(2)
                .map((row) => {
                    const cells = row
                        .split("|")
                        .slice(1, -1)
                        .map((cell) => `<td>${cell.trim()}</td>`)
                        .join("");
                    return `<tr>${cells}</tr>`;
                })
                .join("");
            return `<table><thead><tr>${headers}</tr></thead><tbody>${body}</tbody></table>`;
        });
    }

    function formatBlockquotes(markdown) {
        return markdown.replace(/^((?:>+.*(?:\n|$))+)/gm, (block) => {
            const lines = block.split('\n').filter(line => line.trim() !== ''); // Remove empty lines
            const formattedBlock = lines.map(line => {
                const level = line.match(/^>+/)[0].length; // Count the number of '>' symbols
                const content = line.replace(/^>+/, '').trim(); // Remove '>' characters
                return { level, content };
            });

            // Generate HTML with nesting
            let html = '';
            let currentLevel = 0;

            formattedBlock.forEach(({ level, content }) => {
                if (level > currentLevel) {
                    html += '<blockquote>'.repeat(level - currentLevel);
                } else if (level < currentLevel) {
                    html += '</blockquote>'.repeat(currentLevel - level);
                }

                // Format the content
                const formattedContent = formatNestedContent(content);
                html += `<p>${formattedContent}</p>`;
                currentLevel = level;
            });

            // Close any remaining open blockquotes
            html += '</blockquote>'.repeat(currentLevel);

            return html;
        });
    }

    function formatNestedContent(content) {
        // Format headers
        content = content.replace(/^(#{1,6})\s*(.*)/, (_, hashes, text) => {
            const level = hashes.length;
            return `<h${level}>${text}</h${level}>`;
        });

        // Format lists
        content = content.replace(/^-\s+(.*)/, '<ul><li>$1</li></ul>');
        content = content.replace(/^\d+\.\s+(.*)/, '<ol><li>$1</li></ol>');

        // Merge adjacent list items
        content = content.replace(/<\/ul>\s*<ul>/g, '');
        content = content.replace(/<\/ol>\s*<ol>/g, '');

        // Format bold and italic
        content = content.replace(/\*\*\*(.*?)\*\*\*/g, '<b><i>$1</i></b>'); // Bold + italic
        content = content.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'); // Bold
        content = content.replace(/\*(.*?)\*/g, '<i>$1</i>'); // Italic

        return content;
    }

    function formatTaskLists(md) {
        return md.replace(/^\s*-\s+\[([ xX])\]\s+(.*)$/gm, (match, checked, item) => {
            const isChecked = checked.trim().toLowerCase() === 'x';
            return `<li><input type="checkbox" ${isChecked ? 'checked' : ''} disabled> ${item}</li>`;
        });
    }

    function formatFootnotes(md) {
        const footnotes = {}; // Store footnote definitions
        const usedFootnotes = new Set(); // Track used references
    
        // Extract footnote definitions
        md = md.replace(/\[\^(.*?)\]:(.*)/g, (_, label, definition) => {
            footnotes[label] = definition.trim();
            return ""; // Remove definitions from the main text
        });
    
        // Replace footnote references in the text
        md = md.replace(/\[\^(.*?)\]/g, (_, label) => {
            usedFootnotes.add(label);
            if (footnotes[label]) {
                return `<sup id="ref-${label}"><a href="#footnote-${label}" title="${footnotes[label]}">[${label}]</a></sup>`;
            } else {
                return `<sup id="ref-${label}" style="color: red;">[${label} - Undefined]</sup>`;
            }
        });
    
        // Generate footnote definitions section
        if (usedFootnotes.size > 0) {
            let footnoteSection = `<hr><h3>Footnotes</h3><ol>`;
            usedFootnotes.forEach((label) => {
                if (footnotes[label]) {
                    footnoteSection += `
                        <li id="footnote-${label}">
                            ${footnotes[label]} 
                            <a href="#ref-${label}" title="Back to reference">↩</a>
                        </li>`;
                }
            });
            footnoteSection += `</ol>`;
            md += footnoteSection;
        }
    
        return md;
    }

    function checkMarkers(lines) {
        const markers = ["*", "**", "_", "__", "~", "~~", "`"]; // Supported markers
        const errors = []; // To store lines with errors

        cleanedLines = lines.filter(line => !line.trim().startsWith("```"))
            .filter(line => !line.trim().startsWith("***"))
            .filter(line => !line.trim().startsWith("---"));
        console.log("Cleaned lines:", cleanedLines);

        for (let line of cleanedLines) {
            console.log("Line:", line);
            for (let marker of markers) {
                if ((line.split(marker).length - 1) % 2 == 1) {
                    console.log("Unmatched marker:", marker);
                    errors.push(`Unmatched marker "${marker}" in line: "${line}"`);
                }
            }
        }

        return errors;
    }

    function isMarkdown(inputText) {
        const markdownPatterns = [
            /^#{1,6}\s+/m,
            /\*\*(.*?)\*\*/,
            /\*([^*]+)\*/,
            /__(.*?)__/,
            /_([^_]+)_/,
            /~~.*?~~/,
            /`([^`]+)`/,
            /^(\-|\*|\+)\s+.+/m,
            /^\d+\.\s+.+/m,
            /\[.*?\]\(.*?\)/,
            /!\[.*?\]\(.*?\)/,
            /:\w+:/,
            /\$\$[\s\S]*?\$\$/g, // Display math
            /\$.*?\$/g, // Inline math
            /\[\^.*?\]/, // Footnotes
            /^((?:>+.*(?:\n|$))+)/gm, // Blockquotes
            /^\s*(\*\*\*|---|___)\s*$/gm, // Horizontal rules
            /\\(.+?)/gm, // Escaped characters
            /(.+?)(\n\s*\n|\n)/gs, // Paragraphs
        ];

        return markdownPatterns.some((pattern) => pattern.test(inputText));
    }

    if (!isMarkdown(markdown)) {
        return {
            html: "",
            errors: ["The input does not contain valid Markdown syntax."],
        };
    }

    const lines = markdown.split('\n');
    // if (lines.match(RegExp(/^(\* .*(?:\n\* .*)+)/gm))) {

    // }

    //errors = checkMarkers(lines);

    if (errors.length > 0) {
        return { html: "", errors };
    }

    markdown = processEscapedCharacters(markdown);
    markdown = formatTables(markdown);
    markdown = formatBlockquotes(markdown);
    markdown = formatTaskLists(markdown);
    markdown = formatFootnotes(markdown);

    const emojiMap = {
        smile: "😄",
        heart: "❤️",
        thumbs_up: "👍",
        wink: "😉",
        clap: "👏",
        star: "⭐",
        fire: "🔥",
        ok_hand: "👌",
        cry: "😢",
        laughing: "😂",
        sunglasses: "😎",
        thinking: "🤔",
        wave: "👋",
    };

    const pattern = /:([a-zA-Z0-9_]+):/g;
    markdown = markdown.replace(pattern, (match, code) => {
        return emojiMap[code] || match;
    });

    // Replace headers
    markdown = markdown.replace(/^#{6}\s(.*)$/gm, "<h6>$1</h6>");
    markdown = markdown.replace(/^#{5}\s(.*)$/gm, "<h5>$1</h5>");
    markdown = markdown.replace(/^#{4}\s(.*)$/gm, "<h4>$1</h4>");
    markdown = markdown.replace(/^#{3}\s(.*)$/gm, "<h3>$1</h3>");
    markdown = markdown.replace(/^#{2}\s(.*)$/gm, "<h2>$1</h2>");
    markdown = markdown.replace(/^#\s(.*)$/gm, "<h1>$1</h1>");

    // Replace bold and italic (both * and _ styles)
    markdown = markdown.replace(/\*\**([a-z\s\']+)*\*\*/g, '<em><strong>$1</strong></em>');
    markdown = markdown.replace(/\*\*_(.*?)_\*\*/g, '<strong><em>$1</em></strong>');
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    //markdown = markdown.replace(/(\*|\_)([a-z\s\']+)(\*|\_)/gm, "<em>$2</em>");
    markdown = markdown.replace(/__(.*?)__/g, "<strong>$1</strong>");

    markdown = markdown.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    markdown = markdown.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    markdown = markdown.replace(/_([^_]+)_/g, "<em>$1</em>");
    markdown = markdown.replace(/~~(.*?)~~/g, "<del>$1</del>");

    // Replace unordered lists
    markdown = markdown.replace(/^(\s*)[\-\*\+]\s+(.*)$/gm, (_, space, item) => {
        const indentLevel = space.length / 2;
        return `<ul>${"<ul>".repeat(indentLevel)}<li>${item}</li>${"</ul>".repeat(indentLevel)}</ul>`;
    });
    markdown = markdown.replace(/<\/ul>\s*<ul>/g, "");

    // Replace nested ordered lists
    markdown = markdown.replace(/^(\s*)(\d+)\.\s+(.*)$/gm, (_, space, number, item) => {
        const indentLevel = space.length / 2;
        return `<ol>${"<ol>".repeat(indentLevel)}<li>${item}</li>${"</ol>".repeat(indentLevel)}</ol>`;
    });
    markdown = markdown.replace(/<\/ol>\s*<ol>/g, "");

    // Replace links
    markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Replace images
    markdown = markdown.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

    // Replace footnotes
    //markdown = markdown.replace(/\[\^(.*?)\]:(.*)/g, '<sup id="footnote-$1">[$1]</sup>: $2');

    // Replace fenced code blocks
    markdown = markdown.replace(/```(\w+)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');

    // Replace inline code
    markdown = markdown.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Replace horizontal rules
    markdown = markdown.replace(/^\s*(\*\*\*|---|___)\s*$/gm, "<hr>");

    // Replace custom attributes
    markdown = markdown.replace(/\{#([\w\-]+)\s*(\.[\w\-]+)*\}/g, (_, id, classes) => {
        const classAttr = classes ? ` class="${classes.trim().replace(/\./g, " ")}"` : "";
        return `<div id="${id}"${classAttr}></div>`;
    });

    // Replace paragraphs (text blocks separated by 2 or more newlines)
    markdown = markdown.replace(/(.+?)(\n\s*\n|\n)/gs, (match, p1) => {
        if (!p1.trim()) return ''; // Ignore empty lines
        return `<p>${p1.trim()}</p>\n`;
    });

    // Replace highlights
    markdown = markdown.replace(/==(.+?)==/g, '<mark>$1</mark>');

    // Replace superscript
    markdown = markdown.replace(/~(.*?)~/g, '<sub>$1</sub>');

    // Replace subscript
    markdown = markdown.replace(/\^(.*?)\^/g, '<sup>$1</sup>');

    // Replace LaTeX-style math
    markdown = markdown.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => `\\[${math}\\]`); // Display math
    markdown = markdown.replace(/\$(.*?)\$/g, (_, math) => `\\(${math}\\)`); // Inline math


    return { html: markdown, errors: [] };
}

document.getElementById("convertButton").addEventListener("click", () => {
    const markdownInput = document.getElementById("markdownInput").value;
    const { html, errors } = markdownToHtml(markdownInput);

    if (errors.length > 0) {
        document.getElementById("htmlPreview").innerHTML = "";
        document.getElementById("errorMessage").innerHTML = errors.join("<br>");
    } else {
        document.getElementById("htmlPreview").innerHTML = html;
        document.getElementById("errorMessage").innerHTML = "";
    }
    Prism.highlightAll();
    MathJax.typeset();
});
