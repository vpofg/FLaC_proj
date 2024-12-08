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

    function validateMarkdown(md) {
        const errors = [];

        // Helper to check balanced and nested markers
        function isValidMarkdown(text) {
            const stack = [];
            const markers = ['*', '**', '~', '~~', '`'];

            for (let i = 0; i < text.length; i++) {
                for (let marker of markers) {
                    if (text.slice(i, i + marker.length) === marker) {
                        if (stack.length > 0 && stack[stack.length - 1] === marker) {
                            stack.pop(); // Closing marker
                        } else {
                            stack.push(marker); // Opening marker
                        }
                        i += marker.length - 1;
                        break;
                    }
                }
            }
            return stack.length === 0;
        }

        // Detect unbalanced markers
        if (!isValidMarkdown(md)) {
            errors.push("Unbalanced Markdown markers detected.");
        }

        return errors;
    }

    function isMarkdown(inputText) {
        const markdownPatterns = [
            /^#{1,6}\s+/m,
            /\*\*.*?\*\*/,
            /\*.*?\*/,
            /~~.*?~~/,
            /`.*?`/,
            /^(\-|\*|\+)\s+.+/m,
            /^\d+\.\s+.+/m,
            /\[.*?\]\(.*?\)/,
            /!\[.*?\]\(.*?\)/,
        ];

        return markdownPatterns.some((pattern) => pattern.test(inputText));
    }

    if (!isMarkdown(markdown)) {
        return { html: "", errors: ["The input does not contain valid Markdown syntax."] };
    }

    errors = validateMarkdown(markdown);

    if (errors.length > 0) {
        return { html: "", errors };
    }

    markdown = markdown.replace(/^#{6}\s(.*)$/gm, '<h6>$1</h6>');
    markdown = markdown.replace(/^#{5}\s(.*)$/gm, '<h5>$1</h5>');
    markdown = markdown.replace(/^#{4}\s(.*)$/gm, '<h4>$1</h4>');
    markdown = markdown.replace(/^#{3}\s(.*)$/gm, '<h3>$1</h3>');
    markdown = markdown.replace(/^#{2}\s(.*)$/gm, '<h2>$1</h2>');
    markdown = markdown.replace(/^#\s(.*)$/gm, '<h1>$1</h1>');

    markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
    markdown = markdown.replace(/~~(.*?)~~/g, '<del>$1</del>');

    markdown = markdown.replace(/^(>+)\s+(.*)$/gm, (_, level, content) => {
        return `<blockquote>${content}</blockquote>`.repeat(level.length);
    });

    markdown = markdown.replace(/^[\-\*]\s+(.*)$/gm, '<ul><li>$1</li></ul>');
    markdown = markdown.replace(/<\/ul>\s*<ul>/g, '');

    markdown = markdown.replace(/^\d+\.\s+(.*)$/gm, '<ol><li>$1</li></ol>');
    markdown = markdown.replace(/<\/ol>\s*<ol>/g, '');

    markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    markdown = markdown.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

    markdown = markdown.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
    markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>');

    markdown = markdown.replace(/^---$|^\*\*\*$|^___$/gm, '<hr>');

    markdown = markdown.replace(/^\|(.+)\|\n\|([-:\s]+)\|\n((\|.*\|\n)+)/gm, (match, header, align, rows) => {
        const headers = header.trim().split('|').map(h => `<th>${h.trim()}</th>`).join('');
        const body = rows.trim().split('\n').map(row => {
            return `<tr>${row.trim().split('|').map(cell => `<td>${cell.trim()}</td>`).join('')}</tr>`;
        }).join('');
        return `<table><thead><tr>${headers}</tr></thead><tbody>${body}</tbody></table>`;
    });

    markdown = markdown.replace(/<([^>]+)>/g, '<$1>');

    return { html: markdown, errors: [] };
}

document.getElementById('convertButton').addEventListener('click', () => {
    const markdownInput = document.getElementById('markdownInput').value;
    const { html, errors } = markdownToHtml(markdownInput);

    if (errors.length > 0) {
        document.getElementById('htmlPreview').innerHTML = "";
        document.getElementById('errorMessage').innerHTML = errors.join("<br>");
    } else {
        document.getElementById('htmlPreview').innerHTML = html;
        document.getElementById('errorMessage').innerHTML = "";
    }
});
