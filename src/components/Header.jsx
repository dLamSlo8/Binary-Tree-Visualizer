import React from 'react';

export default () => {
    return (
        <header className="app-header">
            <h1 className="heading heading--xxl heading--center">Binary Tree Visualizer</h1>
            <p className="app-header__subheading">
                The <a className="app-header__subheading-strong" href="http://binarysearch.com"><strong>binarysearch</strong></a> website currently does not support a 
                binary tree visualization tool that exists in other sites like Leetcode. This tools helps to resolve that.
                Simply input the tree array and see the populated tree.
            </p>
        </header>
    )
}