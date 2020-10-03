import React, { useState, useCallback } from 'react';
import ActionSection from './components/ActionSection';
import TreeSection from './components/TreeSection';
import { Node } from '../../functions/tree';

export default () => {
    const [rootNode, setRootNode] = useState(null);
    const [activeUuid, setActiveUuid] = useState(null);

    const handleInit = (value) => {
        let rootNode = new Node(parseInt(value));
        
        setRootNode(rootNode);
        setActiveUuid(rootNode.uuid);
    }

    const handleActiveNodeChange = useCallback((uuid) => setActiveUuid(uuid), []);

    return (
        <section className="ct">
            <ActionSection handleInit={handleInit} />
            <TreeSection rootNode={rootNode} activeUuid={activeUuid} handleActiveNodeChange={handleActiveNodeChange} />
        </section>
    );
}