import React, { useEffect, useState } from 'react';
import { parseTree } from '../functions';
import BinaryTree from './BinaryTree';
import Form from './Form';
import db from "../database.js";
import firebase from "firebase";

export default () => {

    const [treeString, setTreeString] = useState('[1, [2, [4, null, null], null], [3, null, [5, null, null]]]');
    const [rootNode, setRootNode] = useState(null);
    const [parseErr, setParseErr] = useState('');
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
            
            try {
                setRootNode(parseTree(parsedStr));
                setParseErr('');
            }
            catch (err) {
                setParseErr(err);
            }
        }
        catch (err) {
            setParseErr('There was an error when parsing your string. Please check that it is formatted correctly!');
        }
    }

    useEffect(() => {
        setRootNode(parseTree(JSON.parse(treeString)));
    }, []);

    return (
        <main className="app-main">
            <form className="app-main__form" onSubmit={(e) => handleVisualize(e)}>
                <div className="app-main__input-wrapper">
                    <input 
                    className={`input ${inputErr ? 'input--error' : ''}`}
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
                <button className="app-submit">Visualize</button>
            </form>
            {
                parseErr && (
                    <p className="error error--center app-main__parse-error">{parseErr}</p>
                )
            }
            <BinaryTree rootNode={rootNode} />
            <Form />
        </main>
    )
}