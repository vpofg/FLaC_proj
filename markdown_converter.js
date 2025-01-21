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
  markdown = markdown.replace(/^#{6}\s(.*)$/gm, "<h6>$1</h6>"); // Handle h6 headers
  markdown = markdown.replace(/^#{5}\s(.*)$/gm, "<h5>$1</h5>"); // Handle h5 headers
  markdown = markdown.replace(/^#{4}\s(.*)$/gm, "<h4>$1</h4>"); // Handle h4 headers
  markdown = markdown.replace(/^#{3}\s(.*)$/gm, "<h3>$1</h3>"); // Handle h3 headers
  markdown = markdown.replace(/^#{2}\s(.*)$/gm, "<h2>$1</h2>"); // Handle h2 headers
  markdown = markdown.replace(/^#\s(.*)$/gm, "<h1>$1</h1>"); // Handle h1 headers

  // Handle bold and italic text
  markdown = markdown.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); // Handle bold text
  markdown = markdown.replace(/__(.*?)__/g, "<strong>$1</strong>"); // Handle bold text
  markdown = markdown.replace(/\*(.*?)\*/g, "<em>$1</em>"); // Handle italic text
  markdown = markdown.replace(/_(.*?)_/g, "<em>$1</em>"); // Handle italic text 
  markdown = markdown.replace(/~~(.*?)~~/g, "<del>$1</del>"); // Handle strikethrough text

  // Handle blockquotes
  markdown = markdown.replace(/^(>+)\s(.*)$/gm, (match, level, content) => { 
    const depth = level.length;
    let blockquote = "<blockquote>".repeat(depth);
    blockquote += content.trim();
    blockquote += "</blockquote>".repeat(depth);
    return blockquote;
  });

  // Handle task lists
  markdown = markdown.replace(/- \[ \] (.*)/g, '<ul><li><input type="checkbox">$1</li></ul>');
  markdown = markdown.replace(/- \[x\] (.*)/g, '<ul><li><input type="checkbox" checked>$1</li></ul>');

  // Handle nested lists
  markdown = markdown.replace(/^\s*([\-\*])\s+(.*)$/gm, (match, bullet, content) => {
    return `<ul><li>${content}</li></ul>`;
  });
  markdown = markdown.replace(/<\/ul>\n<ul>/g, "");

  markdown = markdown.replace(/^\s*\d+\.\s+(.*)$/gm, (match, content) => {
    return `<ol><li>${content}</li></ol>`;
  });
  markdown = markdown.replace(/<\/ol>\n<ol>/g, "");

  markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Handle images
  markdown = markdown.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

  // Handle fenced code blocks with language specification for Prism.js
  markdown = markdown.replace(/```(\w+)\n([\s\S]*?)```/g, "<pre><code class=\"language-$1\">$2</code></pre>");
  markdown = markdown.replace(/`([^`]+)`/g, "<code>$1</code>");

  markdown = markdown.replace(/^---$|^\*\*\*$|^___$/gm, "<hr>");

  // Handle LaTeX-style math
  markdown = markdown.replace(/\$\$(.*?)\$\$/g, (_, math) => {
    return `\\[${math}\\]`;
  });
  markdown = markdown.replace(/\$(.*?)\$/g, (_, math) => {
    return `\\(${math}\\)`;
  });

  markdown = markdown.replace(/<([^>]+)>/g, "<$1>");

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
    Prism.highlightAll();
    MathJax.typeset();
  }
});