import React, { useEffect } from 'react';
import { generateCustomizableD3Tree } from '../../../functions/tree';

export default ({ rootNode, sectionWidth, activeUuid, handleActiveNodeChange }) => {
    useEffect(() => {
        if (rootNode) {
            generateCustomizableD3Tree(rootNode, sectionWidth, activeUuid, handleActiveNodeChange);
        }
    }, [rootNode, sectionWidth, activeUuid]);

    return (
        <div id="tree" className="ct-tree__tree">

        </div>
    )
}