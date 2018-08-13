import HtmlSanitizer from '../sanitizer/HtmlSanitizer';
import SanitizeHtmlOptions from '../types/SanitizeHtmlOptions';
import getInheritableStyles from '../utils/getInheritableStyles';

export default function sanitizeHtml(html: string, options?: SanitizeHtmlOptions) {
    options = options || {};
    let sanitizer = new HtmlSanitizer(options);
    let currentStyles = getInheritableStyles(options.currentElement);
    return sanitizer.exec(
        html,
        options.convertCssOnly,
        options.preserveFragmentOnly,
        currentStyles
    );
}
