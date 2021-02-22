import React from 'react';

export default () => {
    return (
        <header className="app-header">
            <h1 className="heading heading--xxl heading--center">Binary Tree Visualizer</h1>
            <p className="app-header__subheading">
                The <a className="app-header__subheading-strong" href="http://binarysearch.com"><strong>binarysearch</strong></a> website currently does not support a 
                binary tree visualization tool that exists in other sites like LeetCode. This tool helps to resolve that. You can either input the tree array given by binarysearch,
                or create your own tree and copy it to binarysearch as a test case. The resulting tree is both pannable and zoomable.
            </p>
            <p className="app-header__subheading app-header__subheading--edit">
                NOTE: The binarysearch website has since implemented a visualization for binary trees. Though this means this web app is no longer necessary, the team
                behind this is now working on something bigger, and we can't wait to share in the coming months.
            </p>
        </header>
    )
}