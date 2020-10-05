import React from 'react';

export default ({ name, options, optionTitleEq, valueRef, handleChange, rootClass }) => {

    return (
        <select name={name} id={name} value={valueRef} onChange={handleChange} className={`dropdown ${rootClass ? rootClass : ''}`}>
        {
            options.map((option) => (
                <option value={optionTitleEq ? option : option.value}>{optionTitleEq ? option : option.title}</option>
            ))
        }
        </select>
    )
}