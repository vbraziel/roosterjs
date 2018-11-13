import * as DomTestHelper from '../DomTestHelper';
import Position from '../../selection/Position';
import getInlineElementBeforeAfter from '../../inlineElements/getInlineElementBeforeAfter';
import { NodePosition, PositionType } from 'roosterjs-editor-types';

let testID = 'getInlineElementBeforeAfter';

describe('getInlineElement getInlineElementBeforeAfter(), isAfter=false', () => {
    afterEach(() => {
        DomTestHelper.removeElement(testID);
    });

    function runTest(
        rootNode: Node,
        position: NodePosition,
        startOffset: number,
        endOffset: number,
        node: Node
    ) {
        // Arrange
        let start = new Position(node, startOffset);
        let end = new Position(node, endOffset);

        // Act
        let inlineElementBeforePoint = getInlineElementBeforeAfter(rootNode, position, false);

        // Assert
        expect(
            DomTestHelper.isInlineElementEqual(
                inlineElementBeforePoint,
                start,
                end,
                node.textContent.substr(startOffset, endOffset)
            )
        ).toBe(true);
    }

    it('input = <span>abc</span><span>123</span>, position at beginning, inlineElementBeforePoint = null', () => {
        // Arrange
        let rootNode = DomTestHelper.createElementFromContent(
            testID,
            '<span>abc</span><span>123</span>'
        );
        let position = new Position(rootNode.firstChild, 0);

        // Act
        let inlineElementBeforePoint = getInlineElementBeforeAfter(rootNode, position, false);

        // Assert
        expect(inlineElementBeforePoint).toBe(null);
    });

    it('input = <span>abc</span><span>123</span>, inlineElementBeforePoint = abc', () => {
        let rootNode = DomTestHelper.createElementFromContent(
            testID,
            '<span>abc</span><span>123</span>'
        );
        let position = new Position(rootNode.lastChild, 0);
        runTest(rootNode, position, PositionType.Begin, 3, rootNode.firstChild.firstChild);
    });

    it('input = <span>www.example.com</span>, partial inlineElement before selection, inlineElementBeforePoint = www', () => {
        let rootNode = DomTestHelper.createElementFromContent(
            testID,
            '<span>www.example.com</span>'
        );
        let position = new Position(rootNode.firstChild.firstChild, 3);
        runTest(rootNode, position, PositionType.Begin, 3, rootNode.firstChild.firstChild);
    });
});

describe('getInlineElement getInlineElementBeforeAfter(), isAfter=true', () => {
    afterEach(() => {
        DomTestHelper.removeElement(testID);
    });

    function runTest(
        rootNode: Node,
        position: NodePosition,
        startOffset: number,
        endOffset: number,
        node: Node
    ) {
        // Arrange
        let start = new Position(node, startOffset);
        let end = new Position(node, endOffset);

        // Act
        let inlineElementAfterPoint = getInlineElementBeforeAfter(rootNode, position, true);

        // Assert
        expect(
            DomTestHelper.isInlineElementEqual(
                inlineElementAfterPoint,
                start,
                end,
                node.textContent.substr(startOffset, endOffset)
            )
        ).toBe(true);
    }

    it('input = <span>abc</span><span>123</span>, position at end, inlineElementAfterPoint = null', () => {
        // Arrange
        let rootNode = DomTestHelper.createElementFromContent(
            testID,
            '<span>abc</span><span>123</span>'
        );
        let position = new Position(rootNode.lastChild, PositionType.End);

        // Act
        let inlineElementAfterPoint = getInlineElementBeforeAfter(rootNode, position, true);

        // Assert
        expect(inlineElementAfterPoint).toBe(null);
    });

    it('input = <span>abc</span><span>123</span>, inlineElementAfterPoint = 123', () => {
        let rootNode = DomTestHelper.createElementFromContent(
            testID,
            '<span>abc</span><span>123</span>'
        );
        let position = new Position(rootNode.firstChild, PositionType.End);
        runTest(rootNode, position, PositionType.Begin, 3, rootNode.lastChild.firstChild);
    });

    it('input = <span>www.example.com</span>, partial inlineElement after position, inlineElementAfterPoint = com', () => {
        let rootNode = DomTestHelper.createElementFromContent(
            testID,
            '<span>www.example.com</span>'
        );
        let position = new Position(rootNode.firstChild.firstChild, 12);
        runTest(rootNode, position, 12, 15, rootNode.firstChild.firstChild);
    });
});
