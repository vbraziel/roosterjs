import HtmlSanitizer from '../sanitizer/HtmlSanitizer';

export default function convertInlineCss(html: string, additionalStyleNodes?: HTMLStyleElement[]) {
    let sanitizer = new HtmlSanitizer({
        additionalGlobalStyleNodes: additionalStyleNodes,
    });
    return sanitizer.exec(html, true /*convertCssOnly*/);
}
