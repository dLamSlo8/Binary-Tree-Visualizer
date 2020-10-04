import React, { useState, useCallback, useEffect } from 'react';
import ActionSection from './components/ActionSection';
import TreeSection from './components/TreeSection';
import { Node, nodeToString } from '../../functions/tree';

/**
 * -- State --
 * @rootNode - root node of the tree structure
 * @activeNode - object representing currently selected node in tree structure
 *             - Properties: {
 *                  uuid, current (value), left (value), right (value)    
 *              }
 * @bsString - 
 */
export default () => {
    const [rootNode, setRootNode] = useState(null);
    const [activeNode, setActiveNode] = useState(null);
    const [bsString, setBsString] = useState(null);

    const handleInit = (value) => {
        let rootNode = new Node(parseInt(value));
        
        setRootNode(rootNode);
        // left and right should be '' instead of null so we have controlled inputs all the way for actions section
        setActiveNode({
            uuid: rootNode.uuid,
            current: value,
            left: '',
            right: ''
        });
        setBsString(`[${value}, null, null]`);
    }

    const handleActiveNodeChange = useCallback((node) => setActiveNode(node), []);

    const handleUpdateNode = useCallback(({ current, left, right }) => {
        console.table({ current, left, right });
        console.log(activeNode);
        let rootCopy = new Node(0, 0, rootNode);
        let dummyNode = new Node(0);
        dummyNode.right = rootCopy;
        console.log(dummyNode);
        // const newNode = replaceNodeValue(dummyNode, parseInt(current), parseInt(left), parseInt(right), activeNode.uuid);
        // console.log(newNode);
        // setRootNode(newNode);
    }, [rootNode, activeNode]);

    const handleDeleteNode = useCallback(() => {

    }, []);

    useEffect(() => { // useEffect to update bsString on update to tree
        if (rootNode) {
            setBsString(nodeToString(rootNode));
        }
    }, [rootNode]);

    return (
        <section className="ct">
            <ActionSection activeNode={activeNode} handleInit={handleInit} handleUpdateNode={handleUpdateNode} bsString={bsString}  />
            <TreeSection rootNode={rootNode} activeUuid={activeNode ? activeNode.uuid : null} handleActiveNodeChange={handleActiveNodeChange} />
        </section>
    );
}