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
      <a onMouseEnter={handleSignInShow} style={styles.text}>
        SIGN IN
      </a>

      <Modal show={showSignIn} onHide={handleSignInClose} style={styles.modal}>
        <Modal.Header>
          <SignUp />
          <Login />
        </Modal.Header>
        <Modal.Body>
          WOGOS.com is an e-commerce app inspired by GOG.com for Windows-Only Gamers.
        </Modal.Body>
      </Modal>
    </>
  );
};

const styles = {
  text: {
    color: '#de8ae5',
  }
};

export default SignInModal;