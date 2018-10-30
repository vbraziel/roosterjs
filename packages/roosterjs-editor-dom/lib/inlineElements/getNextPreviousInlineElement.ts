import InlineElement from './InlineElement';
import PartialInlineElement from './PartialInlineElement';
import getInlineElementAtNode from './getInlineElementAtNode';
import { getLeafSibling } from '../utils/getLeafSibling';

export function getNextPreviousInlineElement(
    rootNode: Node,
    current: InlineElement,
    isNext: boolean
): InlineElement {
    if (!current) {
        return null;
    }
    if (current instanceof PartialInlineElement) {
        // if current is partial, get the the othe half of the inline unless it is no more
        let nextOrPrevious = isNext
            ? current.getNextInlineElement()
            : current.getPreviousInlineElement();
        if (nextOrPrevious) {
            return nextOrPrevious;
        }
    }

    // Get a leaf node after startNode and use that base to find next inline
    let startNode = current.getContainerNode();
    startNode = getLeafSibling(rootNode, startNode, isNext);
    return getInlineElementAtNode(rootNode, startNode);
}
