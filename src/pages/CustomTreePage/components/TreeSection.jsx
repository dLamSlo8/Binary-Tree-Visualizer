import React, { useState, useCallback } from 'react';
import CustomizableBinaryTree from './CustomizableBinaryTree';

let TreeSection = ({ rootNode, activeUuid, handleActiveNodeChange }) => {
    console.log('rerender this');
    const [sectionWidth, setSectionWidth] = useState(0);

    const measuredRef = useCallback((node) => {
        if (node!== null) {
            setSectionWidth(node.clientWidth);
        }
    }, [rootNode]);

    return (
        <section className="ct-tree" ref={measuredRef}>
            <h3 className="heading heading--lg ct__heading heading--reset ct-tree__heading">Your Tree</h3>
            <p className="ct__helper-text">
                Select a node to edit its current value and add children if they don't already exist on the “Actions” tab. 
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

export default React.memo(TreeSection);