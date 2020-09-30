import React, { useState } from 'react';
import { parseTree } from '../functions';
import BinaryTree from './BinaryTree';

export default () => {

    const [treeString, setTreeString] = useState('');
    const [rootNode, setRootNode] = useState(null);
    console.log(treeString);
    const handleVisualize = (e) => {
        e.preventDefault();
        
        setRootNode(parseTree(JSON.parse(treeString)));
    }

    return (
        <main className="app-main">
            <form className="app-main__form" onSubmit={(e) => handleVisualize(e)}>
                <input 
                className="app-main__input"
                type="text"
                placeholder="Enter binary tree array" 
                value={treeString} 
                onChange={(e) => setTreeString(e.target.value)} />
                <button className="app-main__submit">Visualize</button>
            </form>
            <BinaryTree rootNode={rootNode} />
        </main>
    )
}