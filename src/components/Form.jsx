import React, { useState } from 'react';
import { useForm } from '@formcarry/react';

export default () => {
    const { state: formState, submit } = useForm({
        id: 'exvX0UnZu'
    });

    const [formData, setFormData] = useState({
        name: { value: '', error: ''},
        email: { value: '', error: ''},
        message: { value: '', error: ''}
    });


    const handleChange = (e) => {
        let { name, value } = e.target;

        setFormData((formData) => ({
            ...formData,
            [name]: { ...formData[name], value }
        }));
    }

    const validate = (e) => {
        e.preventDefault();
        let { name: { value: name }, email: { value: email }, message: { value: message }} = formData;
        
        let formDataWithErr = {
            name: {
                value: name,
                error: ''
            },
            email: {
                value: email,
                error: ''
            },
            message: {
                value: message,
                error: ''
            }
        };

        let valid = true;

        if (formData.name.value === '') {
            formDataWithErr.name = {
                value: '',
                error: 'This is a required field'
            };
            valid = false;
        };

        if (formData.email.value === '') {
            formDataWithErr.email = {
                value: '',
                error: 'This is a required field'
            };
            valid = false;
        }
        else if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/.test(formData.email)) {
            formDataWithErr.email = {
                value: formDataWithErr.email.value,
                error: 'Invalid email format'
            }
            valid = false;
        }

        if (formData.message.value === '') {
            formDataWithErr.message = {
                value: '',
                error: 'This is a required field'
            }
            valid = false;
        };

        setFormData(formDataWithErr);

        if (valid) {
            submit(e);
        }

    }

    return (
        <form className="app-contact" onSubmit={validate}>
            <h2 className="heading heading--lg heading--center">Found any bugs? Want new features? Send us an email!</h2>
            <div className="app-contact__input-wrapper">
                <label className="app-contact__label" htmlFor="name">Name</label>
                <input 
                className={`input ${formData.name.error ? 'input--error' : ''}`}
                id="name"
                type="text" 
                name="name"
                value={formData.name.value}
                onChange={handleChange} />
                {
                    formData.name.error && (
                        <p className="error app-contact__error-text">{formData.name.error}</p>
                    )
                }
            </div>
            <div className="app-contact__input-wrapper">
                <label className="app-contact__label" htmlFor="email">Email</label>
                <input 
                className={`input ${formData.email.error ? 'input--error' : ''}`}
                id="email"
                type="text" 
                name="email"
                value={formData.email.value}
                onChange={handleChange} />
                {
                    formData.email.error && (
                        <p className="error app-contact__error-text">{formData.email.error}</p>
                    )
                }
            </div>
            <div className="app-contact__input-wrapper">
                <label className="app-contact__label" htmlFor="message">Message</label>
                <textarea 
                className={`input ${formData.message.error ? 'input--error' : ''}`}
                name="message" 
                id="message" 
                cols="30" 
                rows="10"
                value={formData.message.value}
                onChange={handleChange} 
                placeholder="Enter your message" />
                {
                    formData.message.error && (
                        <p className="error app-contact__error-text">{formData.message.error}</p>
                    )
                }
            </div>
            {
                formState.submitted && (
                    <h3 className="heading heading--primary heading--lg heading--center">Your email has been sent!</h3>
                )
            }
            {
                !formState.submitted && (
                    <button className="app-submit">Send Email</button>
                )
            }
        </form>
    )
}
