import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
      <form onSubmit={handleSubmit} style={{ padding: '100px' }}>
        <input
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <input
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Sign Up</button>
      </form>
    </main>
  );
};

export default SignUp;