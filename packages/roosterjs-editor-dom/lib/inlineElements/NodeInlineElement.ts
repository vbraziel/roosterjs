import BlockElement from '../blockElements/BlockElement';
import InlineElement from '../inlineElements/InlineElement';
import Position from '../selection/Position';
import applyTextStyle from '../utils/applyTextStyle';
import isEditorPointAfter from '../utils/isEditorPointAfter';
import isNodeAfter from '../utils/isNodeAfter';
import { EditorPoint, NodeType, PositionType } from 'roosterjs-editor-types';

/**
 * This presents an inline element that can be reprented by a single html node.
 * This serves as base for most inline element as it contains most implentation
 * of all operations that can happen on an inline element. Other sub inline elements mostly
 * just identify themself for a certain type
 */
class NodeInlineElement implements InlineElement {
    constructor(private containerNode: Node, private parentBlock: BlockElement) {}

    /**
     * The text content for this inline element
     */
    public getTextContent(): string {
        // nodeValue is better way to retrieve content for a text. Others, just use textContent
        return this.containerNode.nodeType == NodeType.Text
            ? this.containerNode.nodeValue
            : this.containerNode.textContent;
    }

    /**
     * Get the container node
     */
    public getContainerNode(): Node {
        return this.containerNode;
    }

    // Get the parent block
    public getParentBlock(): BlockElement {
        return this.parentBlock;
    }

    /**
     * Get the start point of the inline element
     */
    public getStartPoint(): EditorPoint {
        // For an editor point, we always want it to point to a leaf node
        // We should try to go get the lowest first child node from the container
        return new Position(this.containerNode, 0).normalize().toEditorPoint();
    }

    /**
     * Get the end point of the inline element
     */
    public getEndPoint(): EditorPoint {
        // For an editor point, we always want it to point to a leaf node
        // We should try to go get the lowest last child node from the container
        return new Position(this.containerNode, PositionType.End).normalize().toEditorPoint();
    }

    /**
     * Checks if this inline element is a textual inline element
     */
    public isTextualInlineElement(): boolean {
        return this.containerNode && this.containerNode.nodeType == NodeType.Text;
    }

    /**
     * Checks if an inline element is after the current inline element
     */
    public isAfter(inlineElement: InlineElement): boolean {
        return inlineElement && isNodeAfter(this.containerNode, inlineElement.getContainerNode());
    }

    /**
     * Checks if an editor point is contained in the inline element
     */
    public contains(editorPoint: EditorPoint): boolean {
        let startPoint = this.getStartPoint();
        let endPoint = this.getEndPoint();
        return (
            isEditorPointAfter(editorPoint, startPoint) && isEditorPointAfter(endPoint, editorPoint)
        );
    }

    /**
     * Apply inline style to an inline element
     */
    public applyStyle(styler: (element: HTMLElement) => any) {
        applyTextStyle(this.containerNode, styler);
    }
}

export default NodeInlineElement;
