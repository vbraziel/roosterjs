import getLeafSibling from '../utils/getLeafSibling';
import shouldSkipNode from './shouldSkipNode';

/**
 * Get first/last leaf node of the given root node.
 * @param rootNode Root node to get leaf node from
 * @param isFirst True to get first leaf node, false to get last leaf node
 */
export default function getLeafNode(rootNode: Node, isFirst: boolean): Node {
    let getChild = (node: Node): Node => (isFirst ? node.firstChild : node.lastChild);
    let result = getChild(rootNode);
    while (result && getChild(result)) {
        result = getChild(result);
    }

    if (result && shouldSkipNode(result)) {
        result = getLeafSibling(rootNode, result, isFirst);
    }

    return result;
}
