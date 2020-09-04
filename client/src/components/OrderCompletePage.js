import React, { useEffect } from 'react';
import { clearCart } from '../actions/cart'
import { useDispatch } from 'react-redux';

function OrderCompletePage (props) {
  const dispatch = useDispatch();
  const id = props.location.state.order_id;
  const items = props.location.state.order_items;
  console.log(props.location.state.order)

  useEffect(() => {
    dispatch(clearCart())
  }, [])

return (
  <>
    <h1>ORDER SUCCESS!</h1>
    <div>#{id}</div>
    <p>thank you for your purchase! the following items are now in your collection</p>
    <div>{items.map(item => <div>{item.title}</div>)}</div>
  </>
)
}

export default OrderCompletePage;
