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
 * @param value - value of node to insert
 * @param node - root node of the tree
 * @param uuid - uuid of node to create
 */
export const insertNode = (value, node, uuid = null) => {
    function helper(value, node, uuid, moves) {
        if (node == null) {
            var newNode = new Node(value, uuid);
            moves.push(newNode.uuid);
            return newNode;
        }
        moves.push(node.uuid);
        if (value <= node.value) {
            node.left = helper(value, node.left, uuid, moves);
        } else {
            node.right = helper(value, node.right, uuid, moves)
        }

        return node;
    }

    var rootCopy = new Node(0, 1, node);
    var moves = [];

    helper(value, rootCopy, uuid, moves);
    return [moves, rootCopy];
}

