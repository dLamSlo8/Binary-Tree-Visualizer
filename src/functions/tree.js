export class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export const parseTree = (s) => {
    if (s === null) {
        return null;
    }

    if (s.length !== 3) {
        throw "A binary tree must have 2 children per node."
    }

    var node = new Node(s[0])

    node.left = parseTree(s[1]);
    node.right = parseTree(s[2]);
    return node;
}

export const printTree = (node) => {
    var q = [];

    q.push(node);
    while (q.length > 0) {
        var first = q.shift();
        if (first.left !== null) {
            q.push(first.left);
        }

        if (first.right !== null) {
            q.push(first.right);
        }
    }
}

export const nodeToString = (node) => {
    if (node === null) {
        return ("null");
    }

    var s = "[";
    s += node.value + ", ";

    s += nodeToString(node.left) + ", ";
    s += nodeToString(node.right);

    s += "]";

    return s;
}