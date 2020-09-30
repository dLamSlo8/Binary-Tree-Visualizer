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
            <table className="app-header__controls">
                <thead>
                    <tr>
                        <th className="heading app-header__control-header" colSpan="2">Controls</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="app-header__control-cell"><strong>Pan</strong></td>
                        <td className="app-header__control-cell">Shift + Click</td>
                    </tr>
                    <tr>
                        <td className="app-header__control-cell"><strong>Zoom</strong></td>
                        <td className="app-header__control-cell">Shift + Scroll</td>
                    </tr>
                </tbody>
            </table>
        </header>
    )
}