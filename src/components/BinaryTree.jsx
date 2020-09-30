import React, { useEffect } from 'react';
import * as d3 from 'd3';

export default ({ rootNode }) => {
    console.log(rootNode);
    const generateNodeData = (root) => {
        if (root === null) {
            return { name: null };
        }

        if (root.left === null && root.right === null) { // End case
            return { name: root.value };
        }



        let data = { name: root.value, children: [
            generateNodeData(root.left),
            generateNodeData(root.right)
        ] };
        
        return data;
    };

    useEffect(() => {
        if (rootNode) {
            d3.select('#tree-svg').remove(); // Remove previous tree if any. 
            const data = generateNodeData(rootNode);
            console.log(data);

            // Generate binary tree using d3.

            const hierarchyNode = d3.hierarchy((data));
            const width = hierarchyNode.height * 150;
            const height = hierarchyNode.height * 100;

            const tree = d3.tree().size([width, height])(d3.hierarchy(data));
            console.log(tree);
            const canvas = d3.select('#tree').append('svg')
                .attr('id', 'tree-svg')
                .attr('width', width)
                .attr('height', height + 50)
                .append('g')
                    .attr('transform', 'translate(10, 22)');

            const nodes = tree.descendants().filter((node) => node.data.name !== null);
            console.log(nodes);
            
            const links = tree.links();

            // Create individual nodes
            let node = canvas.selectAll('.node') 
                .data(nodes)
                .enter()
                .append('g')
                    .attr('class', 'node');

            // Style individual nodes (circle with text inside)
            node.append('circle')
                .attr('r', 20)
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .attr('stroke-width', '2');

            node.append('text')
                .text(function(d) { return d.data.name; })
                .attr('x', function(d) { return d.x; })
                .attr('y', function(d) { return d.y; })
                .attr('text-anchor', 'middle')
                .attr('dy', '6')
                .attr('font-family', '"Lora", serif');
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