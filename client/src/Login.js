import {useState, useRef} from 'react';
import Form from './components/Form';


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
        Password: <input name="password" type="password" required={true} />
        </label>
        <button type="submit">Submit</button>
    </Form>);
}

function SignupForm () {
    return (<Form endpoint="/api/account/signup" id="Signup-form">
        <label>
        UnivID: <input name="univID" type="text" required={true} />
        </label>
        <label>
        Password: <input name="password" type="password" required={true} />
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