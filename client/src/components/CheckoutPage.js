import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../actions/cart';

import Container from 'react-bootstrap/Container'

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
// formatter.format(2500); /* $2,500.00 */

function CartItem ({ item }) {
  const { id, image_url, title, price, sale } = item;

  const dispatch = useDispatch();
  return (
    <div className="checkout__game-card">
      <img src={image_url} width="100" height="60" alt="game" />
      <div className="checkout__game-card__info">
        <div>
          {title}
          <div>
            <button>move to wishlist</button>
            <button onClick={() => dispatch(removeFromCart(id))} >remove</button>
          </div>
        </div>
        <div className="checkout__game-card__price">
          {sale
            ?
            <div>
              <strike>${price}</strike><br/>
              <span>{formatter.format(price - price * (sale / 100))}</span>
            </div>
            :
              <span>${price}</span>
          }
        </div>
      </div>
    </div>
  )
}

function CheckoutPage () {
  const cart = useSelector(state => state.cart.items);


  return (
    <>
    <div className="divider"/>
    <Container className="checkout__container">
      <div className="checkout__games">
        <span>YOUR ORDER</span>
        {Object.values(cart).map(item => <CartItem item={item}/>)}
      </div>
      <div className="checkout__payment-sidebar">
        <span>YOUR PAYMENT DETAILS</span>
      </div>
    </Container>
    </>
  )
}

export default CheckoutPage;
