import { useState } from 'react';

function Login({ handleSubmit }) {
    const [inputs, setInputs] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit}>
                <input
                    name='username'
                    value={inputs.usernane}
                    type='text'
                    onChange={handleChange}
                ></input>
                <input
                    name='password'
                    value={inputs.password}
                    type='password'
                    onChange={handleChange}
                ></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Login;
