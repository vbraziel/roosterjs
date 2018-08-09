import BlockElement from '../blockElements/BlockElement';
import InlineElement from '../inlineElements/InlineElement';
import Position from '../selection/Position';
import applyTextStyle from '../utils/applyTextStyle';
import createRange from '../selection/createRange';
import { PositionType } from 'roosterjs-editor-types';
import { getNextLeafSibling, getPreviousLeafSibling } from '../domWalker/getLeafSibling';

/**
 * This is a special version of inline element that identifies a section of an inline element
 * We often have the need to cut an inline element in half and perform some operation only on half of an inline element
 * i.e. users select only some text of a text node and apply format, in that case, format has to happen on partial of an inline element
 * PartialInlineElement is implemented in a way that decorate another full inline element with its own override on methods like isAfter
 * It also offers some special methods that others don't have, i.e. nextInlineElement etc.
 */
class PartialInlineElement implements InlineElement {
    constructor(
        private inlineElement: InlineElement,
        private start: Position = null,
        private end: Position = null
    ) {}

    /**
     * Get the full inline element that this partial inline decorates
     */
    public getDecoratedInline(): InlineElement {
        return this.inlineElement;
    }

    /**
     * Gets the container node
     */
    public getContainerNode(): Node {
        return this.inlineElement.getContainerNode();
    }

    /**
     * Gets the parent block
     */
    public getParentBlock(): BlockElement {
        return this.inlineElement.getParentBlock();
    }

    /**
     * Gets the text content
     */
    public getTextContent(): string {
        let range = createRange(this.getStartPosition(), this.getEndPosition());
        return range.toString();
    }

    /**
     * Gets the start position
     */
    public getStartPosition(): Position {
        return this.start || this.inlineElement.getStartPosition();
    }

    /**
     * Gets the end position
     */
    public getEndPosition(): Position {
        return this.end || this.inlineElement.getEndPosition();
    }

    /**
     * Get next partial inline element if it is not at the end boundary yet
     */
    public getNextInlineElement(): PartialInlineElement {
        return this.end && new PartialInlineElement(this.inlineElement, this.end, null);
    }

    /**
     * Get previous partial inline element if it is not at the begin boundary yet
     */
    public getPreviousInlineElement(): PartialInlineElement {
        return this.start && new PartialInlineElement(this.inlineElement, null, this.start);
    }

    /**
     * Checks if this inline element contains the given position
     */
    public contains(position: Position): boolean {
        return (
            position &&
            position.isAfter(this.getStartPosition()) &&
            this.getEndPosition().isAfter(position)
        );
    }

    /**
     * Checks if this inline element is a textual inline element
     */
    public isTextualInlineElement(): boolean {
        return this.inlineElement && this.inlineElement.isTextualInlineElement();
    }

    /**
     * Check if this inline element is after the other inline element
     */
    public isAfter(inlineElement: InlineElement): boolean {
        let thisStart = this.getStartPosition();
        let otherEnd = inlineElement && inlineElement.getEndPosition();
        return otherEnd && (thisStart.isAfter(otherEnd) || thisStart.equalTo(otherEnd));
    }

    /**
     * apply style
     */
    public applyStyle(styler: (element: HTMLElement) => any) {
        let from = this.getStartPosition().normalize();
        let to = this.getEndPosition().normalize();
        let container = this.getContainerNode();

        if (from.isAtEnd) {
            let nextNode = getNextLeafSibling(container, from.node);
            from = nextNode ? new Position(nextNode, PositionType.Begin) : null;
        }
        if (to.offset == 0) {
            let previousNode = getPreviousLeafSibling(container, to.node);
            to = previousNode ? new Position(previousNode, PositionType.End) : null;
        }

        applyTextStyle(container, styler, from, to);
    }
}

export default PartialInlineElement;
