import MarkdownIt from 'markdown-it';

/**
 * Converts Markdown text to HTML.
 *
 * This function utilizes the MarkdownIt library to convert Markdown text into HTML. It allows for the inclusion of HTML tags within the Markdown text if specified. Additionally, it configures the MarkdownIt parser to output XHTML-compliant HTML, automatically linkify text URLs, apply typographic enhancements, and use specific quotation marks.
 *
 * @param markdown - The Markdown string to be converted.
 * @param html - A boolean flag indicating whether HTML tags should be allowed in the Markdown text. Defaults to false, disallowing HTML tags for safety.
 * @returns The converted HTML string.
 */
export default function md(markdown: string, html: boolean = true) {
  const md = new MarkdownIt({
    html,
    xhtmlOut: true,
    linkify: true,
    typographer: true,
    quotes: '“”‘’'
  });
  const result = md?.render(markdown);
  return result;
}
