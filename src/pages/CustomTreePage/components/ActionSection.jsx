import React from 'react';
import useForm, { ValidationTypes } from '../../../hooks/useForm';
import ActionUpdateForm from './ActionUpdateForm';
import StringRepresentations from './StringRepresentations';
import db from "../../../database.js";
import firebase from 'firebase/app';
import 'firebase/firestore';

export default ({ initialized, activeNode, rootNode, handleInit, handleUpdateNode, handleAddChildren, handleDeleteNode, selectedType, setSelectedType }) => {

    const { formData, setFormData, errorMapping, handleChange, handleSubmit } = useForm({
        initValues: {
            root: ''
        },
        validationRules: {
            root: [ValidationTypes.required]
        }
    });

    const handleSubmitInit = () => {
        if (process.env.NODE_ENV === "development") {
            let ref = db.collection("Uses").doc("Development");
            ref.update({
                CustomTreeInput: firebase.firestore.FieldValue.increment(1)
            })
        }
        if (process.env.NODE_ENV === "production") {
          let ref = db.collection("Uses").doc("Production");
          ref.update({
              CustomTreeInput: firebase.firestore.FieldValue.increment(1)
          })
      }
        setFormData({ root: '' });
        handleInit(formData.root);    
    };



    return (
        <section className="ct-actions">
            <h3 className="heading heading--lg heading--reset ct__heading">Actions</h3>
            {
                !initialized 
                ?
                (
                    <>
                        <form className="ct-actions__init-form" onSubmit={(e) => handleSubmit(e, handleSubmitInit)}>
                            <label className="label label--space-b label--lg" htmlFor="root">Enter the root value</label>
                            <input 
                            id="root"
                            className="input ct-actions__init-input"
                            name="root"
                            type="number"
                            value={formData.root}
                            onChange={handleChange} />
                            { // Should basically never happen unless there's some exploit b/c submit is disabled until root value has an actual value
                                errorMapping.root && (
                                    <p className="error error--input">{errorMapping.root}</p>
                                )
                            }
                            <button className={`button ${formData.root === '' ? 'button--disabled' : ''}`} disabled={formData.root === ''}>Initialize tree</button>
                        </form>
                    </>
                )
                : 
                (
                    activeNode 
                    ? 
                    (
                        <ActionUpdateForm 
                        activeNode={activeNode}
                        handleUpdateNode={handleUpdateNode}
                        handleDeleteNode={handleDeleteNode} 
                        handleAddChildren={handleAddChildren} />
                    ) 
                    :
                    (
                        <section className="ct-actions__no-active">
                            <h4 className="heading heading--no-space-b">No active node!</h4>
                            <p className="ct__helper-text">Select a node on the tree to edit.</p>
                        </section>
                    )
                )
            }
            <StringRepresentations rootNode={rootNode} selectedType={selectedType} setSelectedType={setSelectedType} />
        </section>
    )
}