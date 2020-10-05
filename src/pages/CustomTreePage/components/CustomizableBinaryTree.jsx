import React, { useEffect, useLayoutEffect } from 'react';
import { generateCustomizableD3Tree } from '../../../functions/tree';
import * as d3 from 'd3';

export default ({ rootNode, sectionWidth, activeUuid, handleActiveNodeChange }) => {
    useEffect(() => {
        if (rootNode && sectionWidth) {
            generateCustomizableD3Tree(rootNode, sectionWidth, activeUuid, handleActiveNodeChange);
        }

    }, [rootNode, sectionWidth, activeUuid]);

    useLayoutEffect(() => {
        if (!rootNode) {
            d3.select('#tree-svg').remove(0);
        }   
    }, [rootNode]);

    return (
        <section className="ct-tree__tree-wrapper">
            {
                rootNode ? 
                (
                    <div id="tree" className="ct-tree__tree">

                    </div>
                )
                :
                (
                    <div className="ct-tree__helper-wrapper">
                        <h4 className="heading heading--lg heading--reset">Your tree is empty!</h4>
                        <p className="ct__helper-text">Add a root value in the "Actions" tab to begin.</p>
                    </div>
                )
            }
        </section>
    )
}