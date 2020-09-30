export class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

var test = "[1, [5, [3, null, null], null], [4, [7, [4, null, null], [8, null, null]], [12, null, null]]]";
export const parseTree = (s) => {
    if (s === null) {
        return null;
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
        console.log(first.value);
        if (first.left !== null) {
            q.push(first.left);
        }

        if (first.right !== null) {
            q.push(first.right);
        }
    }
}

var x = parseTree(JSON.parse(test));
printTree(x);
