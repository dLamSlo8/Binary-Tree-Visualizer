import React, { useState } from 'react';
import { parseTree } from '../functions';
import BinaryTree from './BinaryTree';
import db from "../database.js";
import firebase from "firebase";

export default () => {

    const [treeString, setTreeString] = useState('');
    const [rootNode, setRootNode] = useState(null);
    console.log(treeString);
    const handleVisualize = (e) => {
        e.preventDefault();
        // db.doc("Uses/5WPHzCgbQL7TKudM6Hdy").get().then((doc) => {
        //     if (doc && doc.exists) {
        //         console.log(doc.data())
        //     }
        // })

        var ref = db.collection("Uses").doc("5WPHzCgbQL7TKudM6Hdy");

        if (process.env.NODE_ENV === "development") {
            ref.update({
                development: firebase.firestore.FieldValue.increment(1)
            })
        }

        if (process.env.NODE_ENV === "production") {
            ref.update({
                production: firebase.firestore.FieldValue.increment(1)
            })
        }

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