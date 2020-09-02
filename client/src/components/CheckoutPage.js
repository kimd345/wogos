import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../actions/cart';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
// formatter.format(2500); /* $2,500.00 */

function CartItem ({ item }) {
  const [ hovered, setHovered ] = useState(false);
  const { id, image_url, title, price, sale } = item;

  const dispatch = useDispatch();
  return (
    <div className="checkout__game-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <img src={image_url} width="100" height="60" alt="game" />
      <div className="checkout__game-card__info">
        <div>
          <strong>{title}</strong>
          <div className="checkout__game-card__buttons">
            <Button
              onClick={() => dispatch(removeFromCart(id))}
              size="sm"
              variant="link">
              remove
            </Button>
          </div>
        </div>
        <div className="checkout__game-card__price">
          {sale
            ?
            <div>
              <span className="original-price"><strike>${price}</strike></span><br/>
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
  const cart = useSelector(state => Object.values(state.cart.items));

  const cartTotal = cart.reduce((total, ele) => {
    let price = parseFloat(ele.price);
    if (ele.sale) {
      return total + price - price * (ele.sale / 100)
    }
    return total + parseFloat(price)}, 0);

  const savingsTotal = cart.reduce((total, ele) => {
    let price = parseFloat(ele.price);
    if (ele.sale) {
      return total + price * (ele.sale / 100)
    }
  }, 0);

  return (
    <>
    <div className="divider"/>
    <Container className="checkout__container">
      <div className="checkout__games">
        <span>YOUR ORDER</span>
        {cart.map(item => <CartItem item={item}/>)}
        <div className="checkout__game-card">
          <div className="checkout__order-total">
            <div className="checkout total">
              <strong>ORDER TOTAL: </strong>
              <span>
                {formatter.format(cartTotal)}
              </span>
            </div>
            <div className="checkout savings">
              <strong>YOU SAVE: </strong>
              <span>
                {formatter.format(savingsTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="checkout__payment-sidebar">
        <span>YOUR PAYMENT DETAILS</span>
      </div>
    </Container>
    </>
  )
}

export default CheckoutPage;
