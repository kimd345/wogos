import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';
import { clearCart } from '../actions/cart';
import { clearCollection } from '../actions/collection';

function Logout() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user.id);

  const handleLogout = e => {
    dispatch(logout(userId));
    dispatch(clearCart())
    dispatch(clearCollection())
  };

  return (
    <div onClick={handleLogout}>LOG OUT</div>
  );
};

export default Logout;
