import BlockElement from '../blockElements/BlockElement';
import { EditorPoint } from 'roosterjs-editor-types';

/**
 * This refers to an inline element (as opposed to block) in editor
 * Inline and block makes the "type" system in editor.
 * An inline element is a maximum resolvable "entity" within the boundary of a block
 * At minimum and also most commonly, it represents a text node.
 * It can represent broader "content" depending on the resolvers that are available, i.e.
 * it can be anchor link, image, emoji, ...
 * Two rules:
 * 1) every inline element must have a container node (text or span, a etc.)
 * 2) inline element cannot be nested
 */
interface InlineElement {
    /**
     * Get the text content of this inline element
     */
    getTextContent(): string;

    /**
     * Get the container node of this inline element
     */
    getContainerNode(): Node;

    /**
     * Get the parent block element of this inline element
     */
    getParentBlock(): BlockElement;

    /**
     * Get the start position of this inline element
     */
    getStartPoint(): EditorPoint;

    /**
     * Get the end position of this inline element
     */
    getEndPoint(): EditorPoint;

    /**
     * Checks if the given inline element is after this inline element
     */
    isAfter(inlineElement: InlineElement): boolean;

    /**
     * Checks if this inline element is a textual inline element
     */
    isTextualInlineElement(): boolean;

    /**
     * Checks if the given editor position is contained in this inline element
     */
    contains(position: EditorPoint): boolean;

    /**
     * Apply inline style to a region of an inline element. The region is identified thorugh the from and to point
     */
    applyStyle(styler: (element: HTMLElement) => any): void;
}

export default InlineElement;
