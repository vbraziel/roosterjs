import Browser from '../utils/Browser';
import Position from './Position';
import createRange from './createRange';
import getElementOrParentElement from '../utils/getElementOrParentElement';
import { NodeType, Rect } from 'roosterjs-editor-types';

/**
 * Get bounding rect of this position
 * @param position The positioin to get rect from
 */
export default function getPositionRect(position: Position): Rect {
    if (!position) {
        return null;
    }

    let range = createRange(position);

    // 1) try to get rect using range.getBoundingClientRect()
    let rect = normalizeRect(range.getBoundingClientRect());

    if (!rect) {
        let normalizedPosition = position.normalize();

        // 2) if current cursor is inside text node, use range.getClientRects() for safari
        // or insert a SPAN and get the rect of SPAN for others
        if (Browser.isSafari) {
            let rects = range.getClientRects();
            if (rects && rects.length == 1) {
                rect = normalizeRect(rects[0]);
            }
        } else {
            if (normalizedPosition.node.nodeType == NodeType.Text) {
                let span = document.createElement('SPAN');
                span.innerHTML = '\u200b';
                range = createRange(normalizedPosition);
                range.insertNode(span);
                rect = normalizeRect(span.getBoundingClientRect());
                span.parentNode.removeChild(span);
            }
        }
        // 3) fallback to element.getBoundingClientRect()
        if (!rect) {
            let element = getElementOrParentElement(normalizedPosition.node);
            if (element) {
                rect = normalizeRect(element.getBoundingClientRect());
            }
        }
    }

    return rect;
}

function normalizeRect(clientRect: ClientRect): Rect {
    // A ClientRect of all 0 is possible. i.e. chrome returns a ClientRect of 0 when the cursor is on an empty p
    // We validate that and only return a rect when the passed in ClientRect is valid
    let { left, right, top, bottom } = clientRect || <ClientRect>{};
    return left + right + top + bottom > 0
        ? {
              left: Math.round(left),
              right: Math.round(right),
              top: Math.round(top),
              bottom: Math.round(bottom),
          }
        : null;
}
