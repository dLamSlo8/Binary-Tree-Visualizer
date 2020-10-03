import React, { useEffect, useState } from 'react';
import { parseTree } from '../../functions/tree';
import BinaryTree from './components/BinaryTree';
import db from "../../database.js";
import firebase from 'firebase/app';
import 'firebase/firestore';

export default () => {

    const [treeString, setTreeString] = useState('[1, [2, [4, null, null], null], [3, null, [5, null, null]]]');
    const [rootNode, setRootNode] = useState(null);
    const [parseErr, setParseErr] = useState('');
    const [inputErr, setInputErr] = useState(false);


    const handleVisualize = (e) => { // 
        e.preventDefault();

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
        <section className="bs">
            <table className="bs__controls">
                <thead>
                    <tr>
                        <th className="heading heading--lg bs__control-header" colSpan="3">Controls</th>
                    </tr>
                    <tr>
                        <th className="bs__control-cell"></th>
                        <th className="bs__control-cell">Desktop</th>
                        <th className="bs__control-cell">Mobile</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="bs__control-cell"><strong>Pan</strong></td>
                        <td className="bs__control-cell">Shift + Click</td>
                        <td className="bs__control-cell">Drag</td>
                    </tr>
                    <tr>
                        <td className="bs__control-cell"><strong>Zoom</strong></td>
                        <td className="bs__control-cell">Shift + Scroll</td>
                        <td className="bs__control-cell">Pinch/Spread</td>
                    </tr>
                </tbody>
            </table>
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