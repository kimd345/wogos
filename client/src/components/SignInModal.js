import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Login from './Login';
import SignUp from './SignUp';

const SignInModal = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  
  const handleSignInClose = () => setShowSignIn(false);
  const handleSignInShow = () => setShowSignIn(true);

  return (
    <>
      <a onMouseEnter={handleSignInShow} style={styles.navBarText}>
        SIGN IN
      </a>

      <Modal show={showSignIn} onHide={handleSignInClose}>
        <Modal.Header style={styles.header}>
          <div style={styles.buttonsContainer}>
            <SignUp />
            <Login />
          </div>
        </Modal.Header>
        <Modal.Body style={styles.body}>
          WOGOS.com is an e-commerce app inspired by GOG.com for Windows-Only Gamers.
        </Modal.Body>
      </Modal>
    </>
  );
};

const styles = {
  navBarText: {
    color: '#de8ae5',
  },
  header: {
    backgroundColor: '#dedede',
  },
  body: {
    backgroundColor: '#dedede',
  },
  buttonsContainer: {
    display: 'flex',
    width: '100%',
  },
};

export default SignInModal;