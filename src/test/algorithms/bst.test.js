import { insertNode } from "../../functions/algorithms/bst.js";
import { Node } from "../../functions/algorithms/bst.js";

describe("Test insertNode function", () => {
    it ("Should give proper moves array", () => {
        var input = new Node(5, 1);
        input.left = new Node(5, 2);
        input.right = new Node(7, 3);

        var expectedTree = new Node(5, 1);
        expectedTree.left = new Node(5, 2);
        expectedTree.left.left = new Node(5, 4);
        expectedTree.right = new Node(7, 3);

        var expectedMoves = [1, 2, 4]

        var result = insertNode(5, input, 4);
        
        expect(result[0]).toEqual(expectedMoves);
        expect(result[1]).toMatchObject(expectedTree);

        var input = new Node(5, 1);
        input.left = new Node(5, 2);
        input.left.left = new Node(4, 4);
        input.right = new Node(7, 3);

        var expectedTree = new Node(5, 1);
        expectedTree.left = new Node(5, 2);
        expectedTree.left.left = new Node(4, 4);
        expectedTree.left.left.right = new Node(5, 5);
        expectedTree.right = new Node(7, 3);

        var expectedMoves = [1, 2, 4, 5]

        var result = insertNode(5, input, 5);
        expect(result[0]).toEqual(expectedMoves);
        expect(result[1]).toMatchObject(expectedTree);

        var input = new Node(5, 1);
        input.left = new Node(5, 2);
        input.left.left = new Node(4, 4);
        input.right = new Node(7, 3);
        input.right.right = new Node(10, 5);

        var expectedTree = new Node(5, 1);
        expectedTree.left = new Node(5, 2);
        expectedTree.left.left = new Node(4, 4);
        expectedTree.right = new Node(7, 3);
        expectedTree.right.right = new Node(10, 5);
        expectedTree.right.right.left = new Node(9, 6);

        var expectedMoves = [1, 3, 5, 6]

        var result = insertNode(9, input, 6);

        expect(result[0]).toEqual(expectedMoves);
        expect(result[1]).toMatchObject(expectedTree);

        var input = new Node(5, 1);
        input.left = new Node(5, 2);
        input.left.left = new Node(4, 4);
        input.right = new Node(7, 3);
        input.right.right = new Node(10, 5);

        var expectedTree = new Node(5, 1);
        expectedTree.left = new Node(5, 2);
        expectedTree.left.left = new Node(4, 4);
        expectedTree.right = new Node(7, 3);
        expectedTree.right.left = new Node(6, 6);
        expectedTree.right.right = new Node(10, 5);

        var expectedMoves = [1, 3, 6]

        var result = insertNode(6, input, 6);

        expect(result[0]).toEqual(expectedMoves);
        expect(result[1]).toMatchObject(expectedTree);

    })

    
})