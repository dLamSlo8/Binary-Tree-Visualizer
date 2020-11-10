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
 * @param value - value of node to insert
 * @param node - root node of the tree
 */
export const insertNode = (value, node) => {
    function helper(value, node) {
        if (node == null) {
            var newNode = new Node(value);
            moves.append(newNode.value);
            return newNode;
        }
        moves.append(node.value);
        if (node.value <= value) {
            node.left = helper(node.left, value);
        } else {
            node.right = helper(node.right, value)
        }
    }

    var rootCopy = new Node(0, 0, node);
    var moves = [];
    helper(value, rootCopy, moves);
    return moves;
}