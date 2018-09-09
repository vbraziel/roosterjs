import InlineElement from '../inlineElements/InlineElement';
import PartialInlineElement from './PartialInlineElement';
import Position from '../selection/Position';
import getInlineElementAtNode from './getInlineElementAtNode';
import getLeafSibling from '../utils/getLeafSibling';
import shouldSkipNode from '../utils/shouldSkipNode';
import { NodeType } from 'roosterjs-editor-types';

/**
 * Get inline element before or after a position
 * When the given position is in middle of an inline element (i.e. mid of a text node), this will
 * a PartialInlineElement which contains the partial content before/after the given position
 * @param root Root node of current scope, use for create InlineElement
 * @param position The position to get InlineElement before
 * @param isAfter True to get InlineElement after the position, false to get InlineElement before the position
 */
export default function getInlineElementBeforeAfter(
    root: Node,
    position: Position,
    isAfter: boolean
): InlineElement {
    if (!root || !position || !position.node) {
        return null;
    }

    position = position.normalize();
    let { node, offset, isAtEnd } = position;
    let isPartial = false;

    if ((!isAfter && offset == 0 && !isAtEnd) || (isAfter && isAtEnd)) {
        node = getLeafSibling(root, node, isAfter);
    } else if (
        node.nodeType == NodeType.Text &&
        ((!isAfter && !isAtEnd) || (isAfter && offset > 0))
    ) {
        isPartial = true;
    }

    if (node && shouldSkipNode(node)) {
        node = getLeafSibling(root, node, isAfter);
    }

    let inlineElement = getInlineElementAtNode(root, node);

    if (inlineElement && (isPartial || inlineElement.contains(position))) {
        inlineElement = isAfter
            ? new PartialInlineElement(inlineElement, position, null)
            : new PartialInlineElement(inlineElement, null, position);
    }

    return inlineElement;
}
