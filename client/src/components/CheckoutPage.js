import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function CheckoutPage () {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  return (
    <div>
      {Object.values(cart).map(item => <div>{item.title}</div>)}
    </div>
  )
}

export default CheckoutPage;
