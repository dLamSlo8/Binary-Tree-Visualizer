import React, { useEffect, useState } from 'react';
import useForm from '../../../hooks/useForm';

export default ({ activeNode, handleUpdateNode, handleDeleteNode, handleAddChildren }) => {
    const { formData: updateFormData, setFormData: updateSetFormData, handleChange: updateHandleChange, handleSubmit: updateHandleSubmit } = useForm({
        initValues: {
            current: activeNode.current
        },
        validationRules: {}
    });
    const { formData: leftFormData, setFormData: leftSetFormData, handleChange: leftHandleChange, handleSubmit: leftHandleSubmit } = useForm({
        initValues: {
            left: ''
        },
        validationRules: {}
    });

    const { formData: rightFormData, setFormData: rightSetFormData, handleChange: rightHandleChange, handleSubmit: rightHandleSubmit } = useForm({
        initValues: {
            right: ''
        },
        validationRules: {}
    });


    const handleSubmitLeft = () => {
        leftSetFormData({ left: '' });
        handleAddChildren({
            isLeft: true,
            value: leftFormData.left
        })
    };

    const handleSubmitRight = () => {
        rightSetFormData({ right: '' });
        handleAddChildren({
            isLeft: false,
            value: rightFormData.right
        })
    };
    
    useEffect(() => {
        updateSetFormData({ current: activeNode.current });
    }, [activeNode]);

    return (
        <div>
            <form className="ct-actions__update-form ct-actions__action-section" onSubmit={(e) => updateHandleSubmit(e, () => handleUpdateNode(updateFormData.current))}>
                <h4 className="heading heading--reset heading--center ct-actions__action-header">Update Current Node</h4>
                <label className="label label--space-b label--lg" htmlFor="current">Current Value</label>
                <input 
                id="current"
                className="input input--space-b" 
                name="current"
                type="number"
                value={updateFormData.current}
                onChange={updateHandleChange} />
                <button className="button button--space-t-sm button--full">Update Node Value</button>
                <button 
                className="button button--space-t-sm button--space-b-sm button--full button--inverse button--warning" 
                type="button"
                onClick={(e) => handleDeleteNode()}>Delete Subtree</button>
            </form>
            {
                (!activeNode.left || !activeNode.right) && (
                    <section className="ct-actions__action-section">
                        <h4 className="heading heading--reset heading--center ct-actions__action-header">Add Children Nodes</h4>
                        {
                            !activeNode.left && (
                            <form className="ct-actions__update-form" onSubmit={(e) => leftHandleSubmit(e, handleSubmitLeft)}>
                                <label className="label label--space-b label--lg" htmlFor="left">Left Value</label>
                                <input 
                                id="left"
                                className="input" 
                                name="left"
                                type="number"
                                value={leftFormData.left}
                                onChange={leftHandleChange} />
                                <button className={`button button--space-t-sm button--full ${!leftFormData.left ? 'button--disabled' : ''}`} disabled={!leftFormData.left}>Add Left Child</button>
                            </form>
                            )
                        }
                        {
                            !activeNode.right && (
                                <form className="ct-actions__update-form" onSubmit={(e) => rightHandleSubmit(e, handleSubmitRight)}>
                                    <label className="label label--space-b label--space-t label--lg" htmlFor="right">Right Value</label>
                                    <input 
                                    id="right"
                                    className="input" 
                                    name="right"
                                    type="number"
                                    value={rightFormData.right}
                                    onChange={rightHandleChange} />
                                    <button className={`button button--space-t-sm button--full ${!rightFormData.right ? 'button--disabled' : ''}`} disabled={!rightFormData.right}>Add Right Child</button>
                                </form>
                            )
                        }

                    </section> 
                )
            }
              
        </div>
    )
}