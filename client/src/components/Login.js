import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import logo from '../assets/logo.png';

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
            <Button
                block
                style={styles.button}
                onClick={handleLogInShow}
            >
                SIGN IN
            </Button>

            <Modal 
                show={showLogIn} 
                onHide={handleLogInClose}
            >
                <Modal.Header style={styles.header}>
                    <div style={styles.headerContainer}>
                        <img style={styles.logo} src={logo} />
                        <h3>LOG IN</h3>
                    </div>
                </Modal.Header>
                <Modal.Body style={styles.body}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group style={styles.form}>
                            <Form.Control
                                style={styles.formField}
                                placeholder='Email' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <Form.Control
                                style={styles.formField}
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <Button block type='submit' style={styles.submitButton}>Log In</Button>
                            <Button block onClick={handleDemoLogin} style={styles.submitButton}>Demo Login</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

const styles = {
    button: {
        backgroundColor: '#713b8d',
        margin: '10px',
    },
    header: {
        backgroundColor: '#dedede',
        fontSize: '30px',
        color: '#4c4c4c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        display: 'flex',
        width: '160px',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: '50px',
    },
    body: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dedede',
    },
    form: { 
        width: '300px',
    },
    formField: {
        margin: '5px',
    },
    submitButton: {
        backgroundColor: 'purple', 
        border: '0px',
        margin: '5px',
        marginTop: '20px',
    },
};

export default Login;