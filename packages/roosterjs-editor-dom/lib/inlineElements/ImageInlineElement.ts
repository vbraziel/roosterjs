import BlockElement from '../blockElements/BlockElement';
import NodeInlineElement from './NodeInlineElement';

/**
 * This is an inline element representing an Html image
 */
export default class ImageInlineElement extends NodeInlineElement {
    constructor(containerNode: Node, parentBlock: BlockElement) {
        super(containerNode, parentBlock);
    }
}
