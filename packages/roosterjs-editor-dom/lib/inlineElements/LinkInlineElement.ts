import BlockElement from '../blockElements/BlockElement';
import NodeInlineElement from './NodeInlineElement';

/**
 * This is inline element presenting an html hyperlink
 */
export default class LinkInlineElement extends NodeInlineElement {
    constructor(containerNode: Node, parentBlock: BlockElement) {
        super(containerNode, parentBlock);
    }
}
