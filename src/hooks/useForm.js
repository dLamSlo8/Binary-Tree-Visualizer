import { useState, useEffect } from 'react';

export const ValidationTypes = {
    required: {
        test: (value) => value !== undefined,
        errorMsg: 'This is a required field'
    },
    emailFormat: {
        test: (value) => /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value),
        errorMsg: 'Invalid email format'
    }
};

export default ({ initValues, validationRules }) => {
    const [formData, setFormData] = useState(initValues);
    const [errorMapping, setErrorMapping] = useState({});

    const validate = () => {
        let hasError = false;
        let newErrorMapping = {};

        Object.keys(validationRules).forEach((name) => {
            let inputRules = validationRules[name];

            for (let rule of inputRules) {
                if (!rule.test(formData[name], formData)) {
                    newErrorMapping[name] = rule.errorMsg;
                    hasError = true;
                    break;
                }
            }

        })

        setErrorMapping(newErrorMapping);
        return !hasError;
    };

    const handleSubmit = (e, handleSubmitSuccess) => {
        e.preventDefault();
        
        if (Object.keys(validationRules).length) { // If no rules, no validate.
            if (validate()) {
                handleSubmitSuccess();
            }
        }
        else {
            handleSubmitSuccess();
        }

    }

    const handleChange = (e) => {
        let { name, value, checked, type } = e.target;

        setFormData((formData) => ({
            ...formData,
            [name]: (type === 'checkbox' ? checked : value)
        }));
    };


    return { formData, setFormData, errorMapping, handleChange, handleSubmit };
}