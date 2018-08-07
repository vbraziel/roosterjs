import { ChangeSource, PositionType } from 'roosterjs-editor-types';
import { Editor } from 'roosterjs-editor-core';

/**
 * Apply inline style to current selection
 * @param callback The callback function to apply style
 */
export default function applyInlineStyle(editor: Editor, callback: (element: HTMLElement) => any) {
    editor.focus();
    let range = editor.getSelectionRange();

    if (range && range.collapsed) {
        // Create a new text node to hold the selection.
        // Some content is needed to position selection into the span
        // for here, we inject ZWS - zero width space
        let tempNode = editor.getDocument().createTextNode('\u200B');
        editor.addUndoSnapshot();
        range.insertNode(tempNode);
        editor.getInlineElementAtNode(tempNode, true /*forceAtNode*/).applyStyle(callback);
        editor.select(tempNode, PositionType.End);
    } else {
        // This is start and end node that get the style. The start and end needs to be recorded so that selection
        // can be re-applied post-applying style
        editor.addUndoSnapshot(() => {
            let firstNode: Node;
            let lastNode: Node;
            let contentTraverser = editor.getSelectionTraverser();
            let inlineElement = contentTraverser && contentTraverser.currentInlineElement;
            while (inlineElement) {
                let nextInlineElement = contentTraverser.getNextInlineElement();
                inlineElement.applyStyle(element => {
                    callback(element);
                    firstNode = firstNode || element;
                    lastNode = element;
                });
                inlineElement = nextInlineElement;
            }
            if (firstNode && lastNode) {
                editor.select(firstNode, PositionType.Before, lastNode, PositionType.After);
            }
        }, ChangeSource.Format);
    }
}
