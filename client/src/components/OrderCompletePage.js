import React, { useEffect } from 'react';
import { clearCart } from '../actions/cart'
import { useDispatch } from 'react-redux';

function OrderCompletePage ({state}) {
  const dispatch = useDispatch();
  // const {order} = state;

  console.log(state)

  useEffect(() => {
    dispatch(clearCart())
  }, [])

  return <div>test</div>
}

export default OrderCompletePage;
