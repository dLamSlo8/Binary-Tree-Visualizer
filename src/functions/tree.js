import { v4 as uuidv4 } from 'uuid';
export class Node {
    constructor(value, uuid) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.uuid = uuid || uuidv4();
    }
}

/**
 * Converts string representation of binary tree to node
 * @param s - string representation of binary tree
 */
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

/**
 * Converts root node of tree to string representation
 * @param node - root node of tree structure
 */
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

/**
 * Creates new node to replace node
 * @param node - root node of tree structure
 * @param value - value to replace node value with
 * @param uuid - uuid of node we want to update value for
 */
export const replaceNodeValue = (node, value, uuid) => {
    if (node === null) {
        return;
    }

    // Create new node to replace left
    if (node.left !== null && node.left.uuid === uuid) {
        let nextNode = new Node(value, uuid);
        let prevNode = node.left;
        node.left = nextNode;
        nextNode.left = prevNode === null ? null : prevNode.left;
        nextNode.right = prevNode === null ? null : prevNode.right;
        return node.left;
    }

    // Create new node to replace right
    if (node.right !== null && node.right.uuid === uuid) {
        let nextNode = new Node(value, uuid);
        let prevNode = node.right;
        node.right = nextNode;
        nextNode.left = prevNode === null ? null : prevNode.left;
        nextNode.right = prevNode === null ? null : prevNode.right;
        return node.right;
    }

    replaceNodeValue(node.left, value, uuid);
    replaceNodeValue(node.right, value, uuid);

    return node.right;
}

/**
 * Updates the id of all nodes in subtree
 * @param node - root node of the tree structure
 * @param start = id to set the node to
 */
export const updateId = (node, start) => {
    if (node === null) {
        return start;
    }

    node.uuid = start;
    start = updateId(node.left, start + 1);
    start = updateId(node.right, start + 1);

    return start + 1;
}

/**
 * Returns the inorder traversal of a binary tree
 * @param node - root node of the tree structure
 * @param l - list that holds inorder traversal of binary tree
 */
export const inOrderTraversal = (node) => {
    function helper(node, l) {
        if (node === null) {
            return;
        }
    
        helper(node.left, l);
    
        l.push(node.value);
        helper(node.right, l);
    }
    var res = []
    helper(node, res);
    return JSON.stringify(res);
}

/**
 * Returns the preorder traversal of a binary tree
 * @param node - root node of the tree structure
 * @param l - list that holds preorder traversal of binary tree
 */
export const preOrderTraversal = (node, l) => {
    function helper(node, l) {
        if (node === null) {
            return;
        }
    
        l.push(node.value);
        helper(node.left, l);
        helper(node.right, l);
    }
    
    var res = []
    helper(node, res);
    return JSON.stringify(res);
}


/**
 * Returns the postorder traversal of a binary tree
 * @param node - root node of the tree structure
 * @param l - list that holds postorder traversal of binary tree
 */
export const postOrderTraversal = (node, l) => {
    function helper(node, l) {
        if (node === null) {
            return;
        }
    
        helper(node.left, l);
        helper(node.right, l);
        l.push(node.value);
    }

    var res = []
    helper(node, res);
    return JSON.stringify(res);
    
}


/**
 * Returns the level order traversal of a binary tree
 * @param node - root node of the tree structure
 */
export const levelOrderTraversal = (node) => {
    if (node === "null") {
        return [];
    }
    var q = [];
    var ans = [];
    q.push(node);
    while (q.length > 0) {
        var first = q.shift();
        ans.push(first.value);
        if (first.left !== null) {
            q.push(first.left);
        }

        if (first.right !== null) {
            q.push(first.right);
        }
    }

    return JSON.stringify(ans);
}

