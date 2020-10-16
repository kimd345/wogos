import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';

import { login } from '../actions/auth';

function Login() {
    const [ showLogIn, setShowLogIn ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogInClose = () => setShowLogIn(false);
    const handleLogInShow = () => setShowLogIn(true);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(login(email, password));
        history.goForward();
    };

    const handleDemoLogin = e => {
        e.preventDefault();
        dispatch(login('dean@aa.io', 'password'));
        history.goForward();
    };

    return (
        <>
            <Button onClick={handleLogInShow}>
                SIGN IN
            </Button>

            <Modal show={showLogIn} onHide={handleLogInClose}>
                <Modal.Header>
                    LOG IN
                </Modal.Header>
                <Modal.Body>
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
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Login;