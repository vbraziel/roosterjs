import BlockElement from '../blockElements/BlockElement';
import NodeInlineElement from './NodeInlineElement';

// This refers to an inline element that represents a text node
export default class TextInlineElement extends NodeInlineElement {
    constructor(containerNode: Node, parentBlock: BlockElement) {
        super(containerNode, parentBlock);
    }
}
