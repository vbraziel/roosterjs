import * as DomTestHelper from '../DomTestHelper';
import InlineElement from '../../inlineElements/InlineElement';
import Position from '../../selection/Position';
import getInlineElementAtNode from '../../inlineElements/getInlineElementAtNode';
import {
    getFirstInlineElement,
    getLastInlineElement,
} from '../../inlineElements/getFirstLastInlineElement';
import { getNextPreviousInlineElement } from '../../inlineElements/getNextPreviousInlineElement';
import { PositionType } from 'roosterjs-editor-types';
import {
    getInlineElementBefore,
    getInlineElementAfter,
} from '../../inlineElements/getInlineElementBeforeAfter';

let testID = 'getInlineElement';

describe('getInlineElement getInlineElementAtNode()', () => {
    afterEach(() => {
        DomTestHelper.removeElement(testID);
    });

    function runTest(
        rootNode: Node,
        node: Node,
        testNode: Node,
        startOffset: number,
        endOffset: number
    ) {
        // Arrange
        let start = new Position(testNode, startOffset);
        let end = new Position(testNode, endOffset);

        // Act
        let inlineElement = getInlineElementAtNode(rootNode, node);

        // Assert
        expect(
            DomTestHelper.isInlineElementEqual(
                inlineElement,
                start,
                end,
                testNode.textContent.substr(startOffset, endOffset)
            )
        ).toBe(true);
    }

    it('input = <div>www.example.com</div>, inlineElementAtNode = www.example.com', () => {
        let rootNode = DomTestHelper.createElementFromContent(testID, '<div>www.example.com</div>');
        runTest(
            rootNode,
            rootNode.firstChild,
            rootNode.firstChild.firstChild,
            PositionType.Begin,
            15
        );
    });

    it('input = <p><br></p>, inlineElementAtNode = <br>', () => {
        let rootNode = DomTestHelper.createElementFromContent(testID, '<p><br></p>');
        runTest(
            rootNode,
            rootNode.firstChild,
            rootNode.firstChild.firstChild,
            PositionType.Begin,
            PositionType.End
        );
    });

    it('input = <div>abc<br>123</div>, inlineElementAtNode = abc', () => {
        let rootNode = DomTestHelper.createElementFromContent(testID, '<div>abc<br>123</div>');
        runTest(
            rootNode,
            rootNode.firstChild.firstChild,
            rootNode.firstChild.firstChild,
            PositionType.Begin,
            3
        );
    });

    it('input = <div>abc<div>123</div></div>, inlineElementAtNode = abc', () => {
        let rootNode = DomTestHelper.createElementFromContent(
            testID,
            '<div>abc<div>123</div></div>'
        );
        runTest(
            rootNode,
            rootNode.firstChild.firstChild,
            rootNode.firstChild.firstChild,
            PositionType.Begin,
            3
        );
    });
});

describe('getInlineElement getFirstInlineElement()', () => {
    afterEach(() => {
        DomTestHelper.removeElement(testID);
    });

    function runTest(rootNode: Node, testNode: Node, startOffset: number, endOffset: number) {
        // Arrange
        let start = new Position(testNode, startOffset);
        let end = new Position(testNode, endOffset);

        // Act
        let inlineElement = getFirstInlineElement(rootNode);

        // Assert
        expect(
            DomTestHelper.isInlineElementEqual(
                inlineElement,
                start,
                end,
                testNode.textContent.substr(startOffset, endOffset)
            )
        ).toBe(true);
    }

    it('input = <div>www.example.com</div>, firstInlineElement = www.example.com', () => {
        let rootNode = DomTestHelper.createElementFromContent(testID, '<div>www.example.com</div>');
        runTest(rootNode, rootNode.firstChild.firstChild, PositionType.Begin, 15);
    });

    it('input = <p><br></p>, firstInlineElement = <br>', () => {
        let rootNode = DomTestHelper.createElementFromContent(testID, '<p><br></p>');
        runTest(rootNode, rootNode.firstChild.firstChild, PositionType.Begin, PositionType.End);
    });

    it('input = <div>abc<br>123</div>, firstInlineElement = abc', () => {
        let rootNode = DomTestHelper.createElementFromContent(testID, '<div>abc<br>123</div>');
        runTest(rootNode, rootNode.firstChild.firstChild, PositionType.Begin, 3);
    });

    it('input = <div>abc<div>123</div></div>, firstInlineElement = abc', () => {
        let rootNode = DomTestHelper.createElementFromContent(
            testID,
            '<div>abc<div>123</div></div>'
        );
        runTest(rootNode, rootNode.firstChild.firstChild, PositionType.Begin, 3);
    });
});

describe('getInlineElement getLastInlineElement()', () => {
    afterEach(() => {
        DomTestHelper.removeElement(testID);
    });

    function runTest(rootNode: Node, testNode: Node, startOffset: number, endOffset: number) {
        // Arrange
        let start = new Position(testNode, startOffset);
        let end = new Position(testNode, endOffset);

        // Act
        let inlineElement = getLastInlineElement(rootNode);

        // Assert
        expect(
            DomTestHelper.isInlineElementEqual(
                inlineElement,
                start,
                end,
                testNode.textContent.substr(startOffset, endOffset)
            )
        ).toBe(true);
    }

    it('input = <div>www.example.com</div>, lastInlineElement = www.example.com', () => {
        let rootNode = DomTestHelper.createElementFromContent(testID, '<div>www.example.com</div>');
        runTest(rootNode, rootNode.firstChild.firstChild, PositionType.Begin, 15);
    });

    it('input = <p><br></p>, lastInlineElement = <br>', () => {
        let rootNode = DomTestHelper.createElementFromContent(testID, '<p><br></p>');
        runTest(rootNode, rootNode.firstChild.firstChild, PositionType.Begin, PositionType.End);
    });

    it('input = <div>abc<br>123</div>, lastInlineElement = 123', () => {
        let rootNode = DomTestHelper.createElementFromContent(testID, '<div>abc<br>123</div>');
        runTest(rootNode, rootNode.firstChild.lastChild, PositionType.Begin, 3);
    });

    it('input = <div>abc<div>123</div></div>, lastInlineElement = 123', () => {
        let rootNode = DomTestHelper.createElementFromContent(
            testID,
            '<div>abc<div>123</div></div>'
        );
        runTest(rootNode, rootNode.firstChild.lastChild.firstChild, PositionType.Begin, 3);
    });
});

describe('getInlineElement getNextInlineElement()', () => {
    afterEach(() => {
        DomTestHelper.removeElement(testID);
    });

    function runTest(
        rootNode: Node,
        currentInline: InlineElement,
        testNode: Node,
        startOffset: number,
        endOffset: number
    ) {
        // Arrange
        let start = new Position(testNode, startOffset);
        let end = new Position(testNode, endOffset);

        // Act
        let inlineElement = getNextPreviousInlineElement(rootNode, currentInline, true);

        // Assert
        expect(
            DomTestHelper.isInlineElementEqual(
                inlineElement,
                start,
                end,
                testNode.textContent.substr(startOffset, endOffset)
            )
        ).toBe(true);
    }

    it('input = <div>www.example.com</div>, nextInlineElement = null', () => {
        // Arrange
        let rootNode = DomTestHelper.createElementFromContent(testID, '<div>www.example.com</div>');
        let currentInline = DomTestHelper.createInlineElementFromNode(
            rootNode.firstChild,
            rootNode
        );

        // Act
        let nextInline = getNextPreviousInlineElement(rootNode, currentInline, true);

        // Assert
        expect(nextInline).toBe(null);
    });

    it('input = <p><br></p>, nextInlineElement = null', () => {
        // Arrange
        let rootNode = DomTestHelper.createElementFromContent(testID, '<p><br></p>');
        let currentInline = DomTestHelper.createInlineElementFromNode(
            rootNode.firstChild,
            rootNode
        );

        // Act
        let nextInline = getNextPreviousInlineElement(rootNode, currentInline, true);

        // Assert
        expect(nextInline).toBe(null);
    });

    it('input = <div>abc<br>123</div>, nextInlineElement = <br>', () => {
        let rootNode = DomTestHelper.createElementFromContent(testID, '<div>abc<br>123</div>');
        let currentInline = DomTestHelper.createInlineElementFromNode(
            rootNode.firstChild.firstChild,
            rootNode
        );
        runTest(
            rootNode,
            currentInline,
            rootNode.firstChild.firstChild.nextSibling,
            PositionType.Begin,
            PositionType.End
        );
    });

    it('input = <div>abc<div>123</div></div>, nextInlineElement = 123', () => {
        let rootNode = DomTestHelper.createElementFromContent(
            testID,
            '<div>abc<div>123</div></div>'
        );
        let currentInline = DomTestHelper.createInlineElementFromNode(
            rootNode.firstChild.firstChild,
            rootNode
        );
        runTest(
            rootNode,
            currentInline,
            rootNode.firstChild.lastChild.firstChild,
            PositionType.Begin,
            3
        );
    });
});

describe('getInlineElement getPreviousInlineElement()', () => {
    afterEach(() => {
        DomTestHelper.removeElement(testID);
    });

    function runTest(
        rootNode: Node,
        currentInline: InlineElement,
        testNode: Node,
        startOffset: number,
        endOffset: number
    ) {
        // Arrange
        let start = new Position(testNode, startOffset);
        let end = new Position(testNode, endOffset);

        // Act
        let inlineElement = getNextPreviousInlineElement(rootNode, currentInline, false);

        // Assert
        expect(
            DomTestHelper.isInlineElementEqual(
                inlineElement,
                start,
                end,
                testNode.textContent.substr(startOffset, endOffset)
            )
        ).toBe(true);
    }

    it('input = <div>www.example.com</div>, previousInlineElement = null', () => {
        // Arrange
        let rootNode = DomTestHelper.createElementFromContent(testID, '<div>www.example.com</div>');
        let currentInline = DomTestHelper.createInlineElementFromNode(
            rootNode.firstChild,
            rootNode
        );

        // Act
        let previousInline = getNextPreviousInlineElement(rootNode, currentInline, false);

        // Assert
        expect(previousInline).toBe(null);
    });

    it('input = <p><br></p>, previousInlineElement = null', () => {
        // Arrange
        let rootNode = DomTestHelper.createElementFromContent(testID, '<p><br></p>');
        let currentInline = DomTestHelper.createInlineElementFromNode(
            rootNode.firstChild,
            rootNode
        );

        // Act
        let previousInline = getNextPreviousInlineElement(rootNode, currentInline, false);

        // Assert
        expect(previousInline).toBe(null);
    });

    it('input = <div>abc<br>123</div>, previousInlineElement = abc', () => {
        let rootNode = DomTestHelper.createElementFromContent(testID, '<div>abc<br>123</div>');
        let currentInline = DomTestHelper.createInlineElementFromNode(
            rootNode.firstChild.lastChild,
            rootNode
        );
        runTest(
            rootNode,
            currentInline,
            rootNode.firstChild.firstChild.nextSibling,
            PositionType.Begin,
            PositionType.End
        );
    });

    it('input = <div>abc<div>123</div></div>, previousInlineElement = abc', () => {
        let rootNode = DomTestHelper.createElementFromContent(
            testID,
            '<div>abc<div>123</div></div>'
        );
        let currentInline = DomTestHelper.createInlineElementFromNode(
            rootNode.firstChild.lastChild,
            rootNode
        );
        runTest(rootNode, currentInline, rootNode.firstChild.firstChild, PositionType.Begin, 3);
    });
});

describe('getInlineElement getInlineElementBeforePoint()', () => {
    afterEach(() => {
        DomTestHelper.removeElement(testID);
    });

    function runTest(
        rootNode: Node,
        position: Position,
        startOffset: number,
        endOffset: number,
        node: Node
    ) {
        // Arrange
        let start = new Position(node, startOffset);
        let end = new Position(node, endOffset);

        // Act
        let inlineElementBeforePoint = getInlineElementBefore(rootNode, position);

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
        let inlineElementBeforePoint = getInlineElementBefore(rootNode, position);

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

describe('getInlineElement getInlineElementAfterPoint()', () => {
    afterEach(() => {
        DomTestHelper.removeElement(testID);
    });

    function runTest(
        rootNode: Node,
        position: Position,
        startOffset: number,
        endOffset: number,
        node: Node
    ) {
        // Arrange
        let start = new Position(node, startOffset);
        let end = new Position(node, endOffset);

        // Act
        let inlineElementAfterPoint = getInlineElementAfter(rootNode, position);

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
        let inlineElementAfterPoint = getInlineElementAfter(rootNode, position);

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
