import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { removeFromCart } from '../actions/cart';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import { formatter, apiUrl } from '../config';

function CartItem ({ item }) {
  const { id, image_url, title, price, sale } = item;

  const dispatch = useDispatch();
  return (
    <div className="checkout__game-card">
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
              <>
              <div style={{ color: "gray" }}><strike>${price}</strike></div>
              <div>{formatter.format(price - price * (sale / 100))}</div>
              </>
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
  const user = useSelector(state => state.auth.user);
  const loggedIn = useSelector(state => state.auth.token !== undefined);

  const [redirect, setRedirect] = useState(false);
  const [completeOrder, setCompleteOrder] = useState([]);
  const [completeOrderId, setCompleteOrderId] = useState();

  const cartTotal = cart.reduce((total, ele) => {
    let price = parseFloat(ele.price);
    if (ele.sale) {
      return total + price - price * (ele.sale / 100)
    }
    return total + parseFloat(price)
  }, 0);

  const savingsTotal = cart.reduce((total, ele) => {
    let price = parseFloat(ele.price);
    if (ele.sale) {
      return total + (price * (ele.sale / 100))
    }
    return total;
  }, 0);

  const checkout = async () => {
    if (!loggedIn) {
      setRedirect(true);
      return;
    }

    const gameIds = cart.map(item => item.id)
    const response = await fetch(`${apiUrl}/orders`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "user_id": user.id,
        "game_ids": [...gameIds]})
    });
    
    if (response.ok) {
      const res = await response.json();
      setCompleteOrder([...res.order_items]);
      setCompleteOrderId(res.order_id);
      setRedirect(true);
    }
  }

  // if (redirect && !loggedIn) {
  //   return <Redirect to={{pathname: "/login"}}/>
  // }

  if (redirect && completeOrder) {
    return <Redirect to={{
      pathname: "/order-complete",
      state: {
        order_id: completeOrderId,
        order_items: completeOrder
      }
    }}/>
  }

  return (
    <>
    <div className="divider"/>
    <Container className="checkout__container">
      <div className="checkout__games">
        <span>YOUR ORDER</span>
        {cart.map(item => <CartItem key={item.id} item={item}/>)}
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
        <div>
            <Button onClick={checkout}>checkout</Button>
        </div>
      </div>
    </Container>
    </>
  )
}

export default CheckoutPage;
