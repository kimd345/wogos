import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';

import { signup } from '../actions/auth';

function SignUp() {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCreateAccountClose = () => setShowCreateAccount(false);
  const handleCreateAccountShow = () => setShowCreateAccount(true);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signup(username, email, password));
    history.goForward();
  };

  return (
    <>
      <Button onClick={handleCreateAccountShow}>
        CREATE ACCOUNT
      </Button>

      <Modal show={showCreateAccount} onHide={handleCreateAccountClose}>
        <Modal.Header>
          SIGN-UP
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} style={{ padding: '100px' }}>
            <Form.Group style={{ width: '300px' }}>
              <Form.Control
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
              <Form.Control
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <Button type='submit' style={{backgroundColor: 'purple', border: '0px', margin: '5px'}}>Sign Up</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUp;