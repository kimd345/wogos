import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../actions/auth';

function Login() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(login(email, password));
        history.goBack();
    };

    const handleDemoLogin = e => {
        e.preventDefault();
        dispatch(login('dean@aa.io', 'password'));
        history.goBack();
    };

    return (
        <main>
            <form onSubmit={handleSubmit} style={{padding:'100px'}}>
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
            <button onClick={handleDemoLogin}>Demo Login</button>
        </main>
    );
};

export default Login;