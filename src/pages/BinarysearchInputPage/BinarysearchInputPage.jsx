import React, { useEffect, useState, useContext } from 'react';
import { parseTree } from '../../functions/tree';
import BinaryTree from './components/BinaryTree';
import db from "../../database.js";
import firebase from 'firebase/app';
import 'firebase/firestore';

export default ({ treeString, setTreeString }) => {

    const [rootNode, setRootNode] = useState(null);
    const [parseErr, setParseErr] = useState('');
    const [inputErr, setInputErr] = useState(false);


    const handleVisualize = (e) => { // 
        e.preventDefault();

        if (process.env.NODE_ENV === "development") {
            let ref = db.collection("Uses").doc("Development");
            ref.update({
                TreeVisualizer: firebase.firestore.FieldValue.increment(1)
            })
        }

        if (process.env.NODE_ENV === "production") {
            let ref = db.collection("Uses").doc("Production");
            ref.update({
                TreeVisualizer: firebase.firestore.FieldValue.increment(1)
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
        <section className="bs">
            <form className="bs__form" onSubmit={(e) => handleVisualize(e)}>
                <div className="bs__input-wrapper">
                    <input 
                    className={`input ${inputErr ? 'input--error' : ''}`}
                    type="text"
                    aria-label="Binary Tree Array"
                    placeholder="Enter binary tree array" 
                    value={treeString} 
                    onChange={(e) => setTreeString(e.target.value)} />
                    {
                        inputErr && (
                            <p className="error bs__input-error">This is a required field</p>
                        )
                    }
                </div>
                <button className="button button--space-t">Visualize</button>
            </form>
            {
                parseErr && (
                    <p className="error error--center bs__parse-error">{parseErr}</p>
                )
            }
            <BinaryTree rootNode={rootNode} />
        </section>
    )
}