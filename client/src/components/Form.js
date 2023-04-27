import React, {useState} from 'react';
import axios from 'axios';
import './styles/Form.css'


export function Input({
    name,
    className,
    label = "",
    validator = (name, value) => {},
    type = "text",
    bubbleUp = false,
    required = false,
    onFocus = (e) => {}}) {
    function handleChange (e) {
        e.preventDefault();
        if (! bubbleUp) e.stopPropagation();
        validator(e.target.name, e.target.value);
    }

    let input = <input
        className={`input ${className}`}
        name={name} 
        type={type} 
        onChange={handleChange}
        onFocus={onFocus}
        required={required} />

    return (
        <>
<<<<<<< Updated upstream
        {label ? <label htmlFor={name}>input</label> : input}
=======
        {label ? <label for={name}>input</label> : input}
>>>>>>> Stashed changes
        </>
    );
}

<<<<<<< Updated upstream
export default function Form({method, endpoint, children}) {
=======
export default function Form({, method, endpoint, children}) {
>>>>>>> Stashed changes
    // const [payload, setPayload] = useState({});

    axios.defaults.headers.post['Content-Type'] = 'application/json';

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form); 

        // FIXME edit API to receive FormData as well.
        let object = {};
        formData.forEach((value, key) => object[key] = value);
        let json = JSON.stringify(object);

        console.log("Form submitted to", endpoint);
        
        axios({
            method: method,
            url: endpoint,
            data: json
        })
        .then((res) => console.log(res))
        .catch((err) => console.log("err:", err));
        
    }
    
    function handleChange(e) {

     }

    return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
        {children}
    </form>
    );
}

