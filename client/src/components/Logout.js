import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';

function Logout() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user.id);

  const handleLogout = e => {
    dispatch(logout(userId));
  };

  return (
    <div onClick={handleLogout} className="navbar__items">LOG OUT</div>
  );
};

export default Logout;