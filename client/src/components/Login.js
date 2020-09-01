import React, { useState } from 'react';

import { apiUrl } from '../config';

function Login() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = e => {
        async function postData(data) {
            const response = await fetch(`${apiUrl}/session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return response.json();
        }
        postData({ email, password });
        e.preventDefault();
    }

    return(
        <main>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder='Email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Log In</button>
            </form>
        </main>
    );
};

export default Login;