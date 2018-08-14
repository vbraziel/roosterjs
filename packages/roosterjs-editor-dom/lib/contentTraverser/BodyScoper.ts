import BlockElement from '../blockElements/BlockElement';
import InlineElement from '../inlineElements/InlineElement';
import TraversingScoper from './TraversingScoper';
import contains from '../utils/contains';
import getFirstLastBlockElement from '../blockElements/getFirstLastBlockElement';
import { getFirstInlineElement } from '../inlineElements/getFirstLastInlineElement';

/**
 * provides scoper for traversing the entire editor body starting from the beginning
 */
export default class BodyScoper implements TraversingScoper {
    /**
     * Construct a new instance of BodyScoper class
     * @param rootNode Root node of the body
     */
    constructor(public rootNode: Node) {}

    /**
     * Get the start block element
     */
    public getStartBlockElement(): BlockElement {
        return getFirstLastBlockElement(this.rootNode, true /*isFirst*/);
    }

    /**
     * Get the start inline element
     */
    public getStartInlineElement(): InlineElement {
        return getFirstInlineElement(this.rootNode);
    }

    /**
     * Since the scope is global, all blocks under the root node are in scope
     */
    public isBlockInScope(blockElement: BlockElement): boolean {
        return contains(this.rootNode, blockElement.getStartNode());
    }

    /**
     * Since we're at body scope, inline elements never need to be trimmed
     */
    public trimInlineElement(inlineElement: InlineElement): InlineElement {
        return inlineElement;
    }
}
