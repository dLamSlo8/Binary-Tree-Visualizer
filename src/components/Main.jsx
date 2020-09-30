import React, { useState } from 'react';
import { parseTree } from '../functions';
import BinaryTree from './BinaryTree';
import db from "../database.js";
import firebase from "firebase";

export default () => {

    const [treeString, setTreeString] = useState('');
    const [rootNode, setRootNode] = useState(null);
    const [parseErr, setParseErr] = useState(false);
    const [inputErr, setInputErr] = useState(false);


    const handleVisualize = (e) => { // 
        e.preventDefault();
        // db.doc("Uses/5WPHzCgbQL7TKudM6Hdy").get().then((doc) => {
        //     if (doc && doc.exists) {
        //         console.log(doc.data())
        //     }
        // })

        let ref = db.collection("Uses").doc("5WPHzCgbQL7TKudM6Hdy");

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

        setInputErr(!treeString);

        if (!treeString) {
            return ;
        }
        
        try {
            let parsedStr = JSON.parse(treeString);
            setParseErr(false);
            setRootNode(parseTree(parsedStr));
        }
        catch (err) {
            setParseErr(true);
        }
    }

    return (
        <main className="app-main">
            <form className="app-main__form" onSubmit={(e) => handleVisualize(e)}>
                <div className="app-main__input-wrapper">
                    <input 
                    className={`app-main__input ${inputErr ? 'app-main__input--error' : ''}`}
                    type="text"
                    aria-label="Binary Tree Array"
                    placeholder="Enter binary tree array" 
                    value={treeString} 
                    onChange={(e) => setTreeString(e.target.value)} />
                    {
                        inputErr && (
                            <p className="error app-main__input-error">This is a required field</p>
                        )
                    }
                </div>
                <button className="app-main__submit">Visualize</button>
            </form>
            {
                parseErr && (
                    <p className="error error--center app-main__parse-error">There was an error when parsing your string. Please check that it is formatted correctly!</p>
                )
            }
            <BinaryTree rootNode={rootNode} />
        </main>
    )
}