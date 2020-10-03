import {nodeToString, parseTree, replaceNodeValue, updateId, inOrderTraversal, preOrderTraversal, postOrderTraversal, levelOrderTraversal} from "../functions/tree.js";
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
        updateId(result, 0);
        updateId(expected, 0);
        expect(result).toMatchObject(expected);

        var input = JSON.parse("[0, null, [5, [1, null, null], null]]");

        var expected = new Node(0);
        expected.right = new Node(5);
        expected.right.left = new Node(1);

        var result = parseTree(input);
        updateId(result, 0);
        updateId(expected, 0);
        expect(result).toMatchObject(expected);


        var input = JSON.parse("[-1, [-2, [2, null, null], null], [0, null, [1, null, [-3, null, null]]]]");

        var expected = new Node(-1);
        expected.left = new Node(-2);
        expected.left.left = new Node(2);
        expected.right = new Node(0);
        expected.right.right = new Node(1);
        expected.right.right.right = new Node(-3);

        var result = parseTree(input);
        updateId(result, 0);
        updateId(expected, 0);
        expect(result).toMatchObject(expected);
    })
})


describe ("Test nodeToString method", () => {
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

describe("Test replace node value", () => {
    it ("Should create new node to replace existing node", () => {
        var input = new Node(0, 0);
        var root = new Node(1, 123);
        input.right = root;

        var expected = new Node(5, 123);

        var result = replaceNodeValue(input, 5, 123);
        
        expect(result).toMatchObject(expected);

        var input = new Node(0, 0);
        var root = new Node(1, 123);
        input.right = root;
        root.right = new Node(4, 111);
        root.right.left = new Node(6, 964);
        root.right.right = new Node(7, 432);

        var expected = new Node(5, 123);
        expected.right = new Node(4, 111);
        expected.right.left = new Node(6, 964);
        expected.right.right = new Node(7, 432);

        var result = replaceNodeValue(input, 5, 123);
        
        expect(result).toMatchObject(expected);

        var input = new Node(0, 0);
        var root = new Node(-1, 123);
        input.right = root;
        root.left = new Node(-2, 111);
        root.left.left = new Node(2, 964);
        root.right = new Node(0, 432);
        root.right.right = new Node(-3, 231);
        root.right.right.right = new Node(-3, 777);

        var expected = new Node(-1, 123);
        expected.left = new Node(-2, 111);
        expected.left.left = new Node(2, 964);
        expected.right = new Node(0, 432);
        expected.right.right = new Node(-3, 231);
        expected.right.right.right = new Node(-2, 777);

        var result = replaceNodeValue(input, -2, 777);

        expect(result).toMatchObject(expected);

        var input = new Node(0, 0);
        var root = new Node(-1, 123);
        input.right = root;
        root.left = new Node(-2, 111);
        root.left.left = new Node(2, 964);
        root.right = new Node(0, 432);
        root.right.right = new Node(-3, 231);
        root.right.right.right = new Node(-3, 777);

        var expected = new Node(-1, 123);
        expected.left = new Node(-2, 111);
        expected.left.left = new Node(0, 964);
        expected.right = new Node(0, 432);
        expected.right.right = new Node(-3, 231);
        expected.right.right.right = new Node(-3, 777);

        var result = replaceNodeValue(input, 0, 964);

        expect(result).toMatchObject(expected);

    })
})

describe ("Test inorder traversal", () => {
    it ("Should give proper inorder traversal", () => {
        var input = new Node(1);
        input.right = new Node(2);
        input.right.left = new Node(3);

        var expected = "[1,3,2]"
        var result = inOrderTraversal(input);
        expect(result).toBe(expected);

        var input = new Node(1);
        input.left = new Node(9);
        input.left.left = new Node(3);
        input.left.left.left = new Node(1);
        input.left.right = new Node(6);
        input.right = new Node(2);
        input.right.right = new Node(3);


        var expected = "[1,3,9,6,1,2,3]"
        var result = inOrderTraversal(input);
        expect(result).toBe(expected);

    })
})

describe ("Test preorder traversal", () => {
    it ("Should give proper preorder traversal", () => {
        var input = new Node(1);
        input.right = new Node(2);
        input.right.left = new Node(3);

        var expected = "[1,2,3]"
        var result = preOrderTraversal(input);
        expect(result).toBe(expected);

        var input = new Node(1);
        input.left = new Node(9);
        input.left.left = new Node(3);
        input.left.left.left = new Node(1);
        input.left.right = new Node(6);
        input.right = new Node(2);
        input.right.right = new Node(3);


        var expected = "[1,9,3,1,6,2,3]"
        var result = preOrderTraversal(input);
        expect(result).toBe(expected);
    })
})

describe ("Test postorder traversal", () => {
    it ("Should give proper postorder traversal", () => {
        var input = new Node(1);
        input.right = new Node(2);
        input.right.left = new Node(3);

        var expected = "[3,2,1]"
        var result = postOrderTraversal(input);
        expect(result).toBe(expected);

        var input = new Node(1);
        input.left = new Node(9);
        input.left.left = new Node(3);
        input.left.left.left = new Node(1);
        input.left.right = new Node(6);
        input.right = new Node(2);
        input.right.right = new Node(3);


        var expected = "[1,3,6,9,3,2,1]"
        var result = postOrderTraversal(input);
        expect(result).toBe(expected);
    })
})

describe ("Test level order traversal", () => {
    it ("Should give proper level order traversal", () => {
        var input = new Node(1);
        input.right = new Node(2);
        input.right.left = new Node(3);

        var expected = "[1,2,3]"
        var result = levelOrderTraversal(input);
        expect(result).toBe(expected);

        var input = new Node(1);
        input.left = new Node(9);
        input.left.left = new Node(3);
        input.left.left.left = new Node(1);
        input.left.right = new Node(6);
        input.right = new Node(2);
        input.right.right = new Node(3);


        var expected = "[1,9,2,3,6,3,1]"
        var result = levelOrderTraversal(input);
        expect(result).toBe(expected);
    })
})