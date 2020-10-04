import React, { useState, useMemo } from 'react';
import useForm, { ValidationTypes } from '../../../hooks/useForm';

export default ({ activeNode, handleUpdateNode, handleDeleteNode, handleInit, bsString }) => {
    const [initialized, setInitialized] = useState(false);
    const initFormData = useMemo(() => {
        if (activeNode) {
            console.log(activeNode);
            let { current, left, right } = activeNode;

            return { 
                current, left, right
            };
        }
        else {
            return { root: '' };
        } 
    }, [activeNode]);

    const { formData, errorMapping, handleChange, handleSubmit } = useForm({
        initValues: initFormData,
        validationRules: !initialized ? { // No validate if already initialized
            root: [ValidationTypes.required]
        } : {}
    });

    const handleSubmitSuccess = () => {
        if (!initialized) {
            setInitialized(true);
            handleInit(formData.root);
        }
        else {
            handleUpdateNode(formData);
        }
    };

    const handleCopyClipboard = (e) => {
        /* write to the clipboard now */
        navigator.clipboard.writeText(bsString);
    }

    return (
        <section className="ct-actions">
            <h3 className="heading heading--reset ct__heading">Actions</h3>
            {
                initialized && (
                    <p className="ct-actions__helper-text">NOTE: Clearing any value (i.e. setting any value to empty) will collapse that part of the tree if it already exists.</p>
                )
            }
            <form className={initialized ? 'ct-actions__update-form' : 'ct-actions__init-form'} onSubmit={(e) => handleSubmit(e, handleSubmitSuccess)}>
            {
                !initialized 
                ?
                (
                    <>
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
                    </>
                )
                : 
                (
                    formData.left !== undefined && 
                    <>
                        <label className="label label--space-b label--lg" htmlFor="current">Current Value</label>
                        <input 
                        id="current"
                        className="input input--space-b" 
                        name="current"
                        type="number"
                        value={formData.current}
                        onChange={handleChange} />
                        <label className="label label--space-b label--lg" htmlFor="left">Left Value</label>
                        <input 
                        id="left"
                        className="input input--space-b" 
                        name="left"
                        type="number"
                        value={formData.left}
                        onChange={handleChange} />
                        <label className="label label--space-b label--lg" htmlFor="right">Right Value</label>
                        <input 
                        id="right"
                        className="input input--space-b" 
                        name="right"
                        type="number"
                        value={formData.right}
                        onChange={handleChange} />
                        <button className="button button--space-t-sm button--full">Update Node</button>
                        <button className="button button--space-t-sm button--space-b-sm button--full button--inverse button--warning" type="button">Delete Node</button>
                    </>
                )
            }
            </form>

            <section className="ct-actions__bs">
                <h4 className="heading heading--center heading--reset heading--sm">Binarysearch Representation</h4>
                <p className="ct-actions__bs-string">{bsString ? bsString : 'N/A'}</p>
                <button className={`button button--full ${!bsString ? 'button--disabled' : ''}`} type="button" disabled={!bsString} onClick={handleCopyClipboard}>Copy to clipboard</button>
            </section>
        </section>
    )
}