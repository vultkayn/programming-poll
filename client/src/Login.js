import React, {useState, useRef} from 'react';
import Form from './components/Form';


/**
 * This should be the /login page once the Router is set up.
 * 
 */

function LoginForm () {
    let invalids = {
        "univID": false,
        "password": false
    };

    const validator = (name, value) => {
        switch (name) {
            case "univID":
                value.length
                // use a Ref to modify the element
        }
    }

    return (<Form method="post" endpoint="/api/account/login" id="Login-form" validator={validator}>
        <label>
        UnivID: <input 
                name="univID" 
                type="text"
                className={invalids["univID"] ? 'invalid-input' : ''} 
                required={true} />
        </label>
        <label>
        Password: <input 
                name="password"
                type="password"
                required={true} />
        </label>
        <button type="submit">Submit</button>
    </Form>);
}

function SignupForm () {
    return (<Form method="post" endpoint="/api/account/" id="Signup-form">
        <label>
        UnivID: <input name="univID" type="text" required={true} />
        </label>
        <label>
        Password: <input name="password" type="password" required={true} />
        </label>
        <label>
        First Name: <input 
                name="firstName"
                type="text"
                required={true} />
        </label>
        <label>
        Last Name: <input 
                name="lastName"
                type="text"
                required={true} />
        </label>
        <label>
        Email: <input 
                name="email"
                type="email"
                required={true} />
        </label>
        <label>
        Promo: <input 
                name="promo"
                type="number"
                max="2100"
                min="1990"
                required={true} />
        </label>
        <button type="submit">Submit</button>
    </Form>);
}

/*

Top right corner: can switch between Signup and login.

Form change according to that.

*/

export default function LoginPage () {
    const [isSignup, setIsSignup] = useState(false);

    
    return ( <>
        <button onClick={() => setIsSignup(! isSignup)} className="btn login-swap-btn">{isSignup ? 'Login' : 'Signup'}</button>
        {(isSignup) ? <SignupForm /> : <LoginForm />}
        </>
    );
}