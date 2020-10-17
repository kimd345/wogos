import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import logo from '../logo.png';

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
      <Button 
        style={styles.button}
        block
        onClick={handleCreateAccountShow}
      >
        CREATE ACCOUNT
      </Button>

      <Modal 
        show={showCreateAccount}
        onHide={handleCreateAccountClose}
      >
        <Modal.Header style={styles.header}>
          <div style={styles.headerContainer}>
            <img style={styles.logo} src={logo} />
            <h3>SIGN-UP</h3>
          </div>
        </Modal.Header>
        <Modal.Body style={styles.body}>
          <Form onSubmit={handleSubmit}>
            <Form.Group style={styles.form}>
              <Form.Control
                style={styles.formField}
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
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
              <Button block type='submit' style={styles.submitButton}>
                Sign Up
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const styles = {
  button: {
    backgroundColor: '#d9d9d9',
    color: '#4c4c4c',
    borderColor: 'grey',
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
    width: '180px',
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

export default SignUp;