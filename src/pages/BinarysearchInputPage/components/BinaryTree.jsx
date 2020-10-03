import React, { useEffect } from 'react';
import { nodeToD3, generateD3Tree } from '../../../functions/tree';
import * as d3 from 'd3';

export default ({ rootNode }) => {
    useEffect(() => {
        if (rootNode) {
            generateD3Tree(rootNode, document.documentElement.clientWidth);
        }
    }, [rootNode]);

    return (
        <section className="app-tree">
            {
                rootNode && (
                    <div id="tree" className="app-tree__content">

                    </div>
                )
            }

        </section>
    )
};