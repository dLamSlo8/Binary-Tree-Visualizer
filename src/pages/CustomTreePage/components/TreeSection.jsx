import React, { useState, useCallback } from 'react';
import CustomizableBinaryTree from './CustomizableBinaryTree';

export default ({ rootNode, activeUuid, handleActiveNodeChange }) => {
    const [sectionWidth, setSectionWidth] = useState(0);

    const measuredRef = useCallback((node) => {
        if (node!== null) {
            setSectionWidth(node.clientWidth);
        }
    }, []);

    return (
        <section className="ct-tree" ref={measuredRef}>
            <h3 className="heading ct__heading heading--reset">Your Tree</h3>
            <p className="ct-tree__helper-text">
                Select a node to edit its current, left, and right values on the “Actions” tab. 
                The selected node is highlighted blue. 
            </p>
            <CustomizableBinaryTree 
            rootNode={rootNode}
            sectionWidth={sectionWidth} 
            activeUuid={activeUuid} 
            handleActiveNodeChange={handleActiveNodeChange} />
        </section>
    )
}