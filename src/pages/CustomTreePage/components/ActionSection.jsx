import React, { useState } from 'react';
import useForm, { ValidationTypes } from '../../../hooks/useForm';

export default ({ hasInit, values = {}, handleUpdate, handleDelete, handleInit, bsString }) => {
    const { formData, handleChange, handleSubmit } = useForm({
        initValues: (() => {
            let { root, left, right } = values;

            if (hasInit) {
                return { root, left, right };
            }
            else {
                return { root: 0 };
            } 
        })(),
        validationRules: {}
    });

    return (
        <section className="ct-actions">
            <h3 className="heading ct__heading">Actions</h3>
            {
                !hasInit 
                ?
                (
                    <form className="ct-actions__init-form" onSubmit={(e) => handleSubmit(e, () => handleInit(formData.root))}>
                        <label className="label label--space-b label--lg" htmlFor="root">Enter the root value</label>
                        <input 
                        id="root"
                        className="input ct-actions__init-input"
                        name="root"
                        type="number"
                        value={formData.root}
                        onChange={handleChange} />
                        <button className="button" disabled={formData.root === ''}>Initialize tree</button>
                    </form>
                )
                : null
            }
            <section className="ct-actions__bs">
                <h4 className="heading heading--center heading--reset">Binarysearch Representation</h4>
                <p className="ct-actions__bs-string">{bsString ? bsString : 'N/A'}</p>
                <button className="button button--full" type="button">Copy to clipboard</button>
            </section>
        </section>
    )
}