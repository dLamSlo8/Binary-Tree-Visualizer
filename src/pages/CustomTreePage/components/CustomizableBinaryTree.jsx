import React, { useEffect } from 'react';
import { generateCustomizableD3Tree } from '../../../functions/tree';

export default ({ rootNode, sectionWidth, activeUuid, handleActiveNodeChange }) => {
    useEffect(() => {
        if (rootNode && sectionWidth) {
            console.log(sectionWidth);
            generateCustomizableD3Tree(rootNode, sectionWidth, activeUuid, handleActiveNodeChange);
        }
    }, [rootNode, sectionWidth, activeUuid]);

    return (
        rootNode ? 
        <section className="ct-tree__tree-wrapper">
            <div id="tree" className="ct-tree__tree">

            </div>
        </section>
        : null
    )
}