import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function CheckoutPage () {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  return (
    <div>
      checkout page
    </div>
  )
}

export default CheckoutPage;
