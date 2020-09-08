import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

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
            <Form onSubmit={handleSubmit} style={{padding:'100px'}}>
                <Form.Group style={{width:'300px'}}>
                    <Form.Control 
                        placeholder='Email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <Button type='submit' style={{ backgroundColor: 'purple', border: '0px', margin: '5px' }}>Log In</Button>
                    <Button onClick={handleDemoLogin} style={{ backgroundColor: 'purple', border: '0px', margin: '5px' }}>Demo Login</Button>
                    <Link to='/signup' style={{ marginLeft: '20px'}}>Sign Up</Link>
                </Form.Group>
            </Form>
        </main>
    );
};

export default Login;