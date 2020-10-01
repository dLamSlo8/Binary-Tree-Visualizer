import {nodeToString, parseTree} from "../functions/tree.js";
import {Node} from "../functions/tree.js"

describe("Test parseTree method", () => {
    it ("Should throw an error for non binary tree", () => {
        var input = JSON.parse("[1, [2, 3, 4], null]");
        expect(() => parseTree(input)).toThrow("A binary tree must have 2 children per node.");

        var input = JSON.parse("[1, [2], null]");
        expect(() => parseTree(input)).toThrow("A binary tree must have 2 children per node.");

        var input = JSON.parse("[]");
        expect(() => parseTree(input)).toThrow("A binary tree must have 2 children per node.");
    })

    it ("Should give tree when correct input", () => {
        var input = JSON.parse("[1, [5, null, null], [4, [7, [4, null, null], [8, null, null]], [12, null, null]]]");

        var expected = new Node(1);
        expected.left = new Node(5);
        expected.right = new Node(4);
        var right = expected.right;
        right.left = new Node(7);
        right.left.left = new Node(4);
        right.left.right = new Node(8);
        right.right = new Node(12);

        var result = parseTree(input);

        expect(result).toMatchObject(expected);

        var input = JSON.parse("[0, null, [5, [1, null, null], null]]");

        var expected = new Node(0);
        expected.right = new Node(5);
        expected.right.left = new Node(1);

        var result = parseTree(input);
        expect(result).toMatchObject(expected);

        var input = JSON.parse("[-1, [-2, [2, null, null], null], [0, null, [1, null, [-3, null, null]]]]");

        var expected = new Node(-1);
        expected.left = new Node(-2);
        expected.left.left = new Node(2);
        expected.right = new Node(0);
        expected.right.right = new Node(1);
        expected.right.right.right = new Node(-3);

        var result = parseTree(input);
        expect(result).toMatchObject(expected);
    })

    it ("Should give string when correct input", () => {
        var input = new Node(1);
        input.left = new Node(5);
        input.right = new Node(4);
        var right = input.right;
        right.left = new Node(7);
        right.left.left = new Node(4);
        right.left.right = new Node(8);
        right.right = new Node(12);
        
        var expected = "[1, [5, null, null], [4, [7, [4, null, null], [8, null, null]], [12, null, null]]]";

        var result = nodeToString(input);
        console.log(result);
        expect(result).toBe(expected);

        var input = new Node(0);
        input.right = new Node(5);
        input.right.left = new Node(1);

        var expected = "[0, null, [5, [1, null, null], null]]";
        var result = nodeToString(input);
        expect(result).toBe(expected);

        var input = new Node(-1);
        input.left = new Node(-2);
        input.left.left = new Node(2);
        input.right = new Node(0);
        input.right.right = new Node(1);
        input.right.right.right = new Node(-3);

        var expected = "[-1, [-2, [2, null, null], null], [0, null, [1, null, [-3, null, null]]]]";
        var result = nodeToString(input);
        expect(result).toBe(expected);
    })

})