import isBlockElement from '../utils/isBlockElement';

/**
 * Get the block DOM node from the give node, the result can be the node itself or its nearest block parent
 * @param node The node to get block context from
 */
export default function getBlockContext(node: Node): HTMLElement {
    while (node && !isBlockElement(node)) {
        node = node.parentNode;
    }
    return node as HTMLElement;
}
