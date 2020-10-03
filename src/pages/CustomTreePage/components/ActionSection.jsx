import React, { useState, useMemo } from 'react';
import useForm, { ValidationTypes } from '../../../hooks/useForm';

export default ({ values, handleUpdate, handleDelete, handleInit, bsString }) => {
    const [initialized, setInitialized] = useState(false);
    const initFormData = useMemo(() => {
        if (values) {
            return {...values};
        }


        else {
            return { root: 0 };
        } 
    }, [values]);

    const { formData, handleChange, handleSubmit } = useForm({
        initValues: initFormData,
        validationRules: {
            root: [ValidationTypes.required]
        }
    });

    const handleSubmitSuccess = () => {
        setInitialized(true);
        handleInit(formData.root);
    }

    return (
        <section className="ct-actions">
            <h3 className="heading ct__heading">Actions</h3>
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
                        <button className={`button ${formData.root === '' ? 'button--disabled' : ''}`} disabled={formData.root === ''}>Initialize tree</button>
                    </>
                )
                : null
            }
            </form>

            <section className="ct-actions__bs">
                <h4 className="heading heading--center heading--reset">Binarysearch Representation</h4>
                <p className="ct-actions__bs-string">{bsString ? bsString : 'N/A'}</p>
                <button className={`button button--full ${!bsString ? 'button--disabled' : ''}`} type="button" disabled={!bsString}>Copy to clipboard</button>
            </section>
        </section>
    )
}