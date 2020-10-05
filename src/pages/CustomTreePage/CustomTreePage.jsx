import React, { useState, useCallback, useEffect } from 'react';
import ActionSection from './components/ActionSection';
import TreeSection from './components/TreeSection';
import { addNode, deleteSubtree, Node, nodeToString, replaceNodeValue } from '../../functions/tree';

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
    }

    const handleActiveNodeChange = useCallback((node) => setActiveNode(node), []);

    const handleUpdateNode = useCallback((current) => {
        setRootNode(replaceNodeValue(rootNode, current, activeNode.uuid));
    }, [rootNode, activeNode]);

    const handleDeleteNode = useCallback(() => {
        let rootCopy = new Node(0, 0, rootNode);

        setActiveNode(null);
        setRootNode(deleteSubtree(rootCopy, activeNode.uuid));
    }, [rootNode, activeNode]);

    const handleAddChildren = useCallback(({ isLeft, value }) => {
        let childValue = parseInt(value);
        
        setRootNode(addNode(rootNode, childValue, isLeft, activeNode.uuid));
        setActiveNode((activeNode) => ({ ...activeNode, ...(isLeft ? { left: childValue } : { right: childValue })}));
    }, [rootNode, activeNode]);

    useEffect(() => { // useEffect to update bsString on update to tree
        if (rootNode) {
            setBsString(nodeToString(rootNode));
        }
    }, [rootNode]);

    return (
        <section className="ct">
            <ActionSection 
            initialized={!!rootNode}
            rootNode={rootNode}
            activeNode={activeNode} 
            handleInit={handleInit} 
            handleUpdateNode={handleUpdateNode} 
            handleDeleteNode={handleDeleteNode} 
            handleAddChildren={handleAddChildren}
            bsString={bsString}  />
            <TreeSection rootNode={rootNode} activeUuid={activeNode ? activeNode.uuid : null} handleActiveNodeChange={handleActiveNodeChange} />
        </section>
    );
}