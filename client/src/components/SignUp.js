import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import { signup } from '../actions/auth';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signup(username, email, password));
  };

  return (
    <main>
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
    </main>
  );
};

export default SignUp;