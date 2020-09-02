import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';

function Logout(props) {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user.id);

  const handleLogout = userId => {
    dispatch(logout(userId));
  };

  return (
    <button onClick={handleLogout(userId)}>Log Out</button>
  );
};

export default Logout;