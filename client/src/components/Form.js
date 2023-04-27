import {useState} from 'react';
import axios from 'axios';
import './styles/Form.css'

export default function Form({validator, method, endpoint, children}) {
    const [payload, setPayload] = useState({});

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
        e.preventDefault();
        console.log(e.target.name, "bubbled up onchange event with value", e.target.value);
        validator(e.target.name, e.target.value)
        setPayload({
            ...payload,
            [e.target.name]: e.target.value
        });
    }

    return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
        {children}
    </form>
    );
}

