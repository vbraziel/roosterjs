import contains from '../utils/contains';
import getFirstLastBlockElement from '../blockElements/getFirstLastBlockElement';
import getInlineElementAtNode from '../inlineElements/getInlineElementAtNode';
import TraversingScoper from './TraversingScoper';
import { BlockElement, InlineElement } from 'roosterjs-editor-types';
import { getFirstLeafNode } from '../utils/getLeafNode';

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
        return getInlineElementAtNode(this.rootNode, getFirstLeafNode(this.rootNode));
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
