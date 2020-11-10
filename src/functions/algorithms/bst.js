import { v4 as uuidv4 } from 'uuid';
import * as d3 from 'd3';

export class Node {
    constructor(value, uuid, node) {
        if (node) {
            this.value = node.value;
            this.left = node.left;
            this.right = node.right;
            this.uuid = node.uuid;
        }
        else {
            this.value = value;
            this.left = null;
            this.right = null;
            this.uuid = uuid || uuidv4();
        }
    }
}

/**
 * Returns array of steps that occur from inserting a node into the tree
 * as well as the new tree
 * @param node - root node of the tree
 * @param value - value of node to insert
 * @param uuid - uuid of node to create
 */
export const insertNode = (node, value, uuid = null) => {
    // need to discuss how to handle root node
    function helper(node, value, uuid, moves) {
        if (node == null) {
            var newNode = new Node(value, uuid);
            moves.push(newNode.uuid);
            return newNode;
        }
        moves.push(node.uuid);
        if (value <= node.value) {
            node.left = helper(node.left, value, uuid, moves);
        } 
        else {
            node.right = helper(node.right, value, uuid, moves)
        }

        return node;
    }

    var rootCopy = new Node(0, 1, node);
    var moves = [];

    helper(rootCopy, value, uuid, moves);
    return [moves, rootCopy];
}

/**
 * Returns array of steps that occur from deleting a node in the tree
 * as well as the new tree
 * @param node - root node of the tree
 * @param value - value of node to delete
 */
export const deleteNode = (node, value) => {
    function helper(node, value, rootCopy, moves) {
        if (node == null) {
            // treat as error if it doesn't exist for now, might change need to discuss
            throw "A node with this value does not exist in the tree";
        }
        moves.push(node.uuid);

        if (value === node.value) {
            if (node.left == null && node.right == null) {
                return null;
            }
            else if (node.left == null) {
                return node.right;
            }
            else if (node.right == null) {
                return node.left;
            }
            else {
                return inorderSuccessor(rootCopy, node);
            }
        }
        else if (value < node.value) {
            let left = helper(node.left, value, rootCopy, moves);
            node.left = left ? left : node.left;
        }
        else {
            let right = helper(node.right, value, rootCopy, moves);
            node.right = right ? right : node.right;
        }

        
    }

    /**
     * Returns node of inorder successor of node and removes that node from
     * tree
     * @param node - root node of the tree structure
     * @param nodeForSuccessor - node that we want to find succesor for
     */
    function inorderSuccessor(node, nodeForSuccessor) {
        function findMin(node, parent) {
            if (node.left == null) {
                if (parent) {
                    parent.right = null;
                }
                return node;
            }

            var left = findMin(node.left, null);

            if (left) {
                node.left = null;
                return left;
            }
        }

        if (nodeForSuccessor.right == null) {
            let curr = node.left;

            // keep going through right subtree to get largest possible value
            while (curr && curr.value < nodeForSuccessor.value) {
                curr = curr.right;
            }
            return curr;

        }

        let successor = findMin(nodeForSuccessor.right, nodeForSuccessor);
        return successor;
    }

    var rootCopy = new Node(0, 1, node);
    var moves = [];

    helper(rootCopy, uuid, rootCopy, moves);
    return [moves, rootCopy];
}

