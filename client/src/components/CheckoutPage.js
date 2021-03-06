import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { removeFromCart } from '../actions/cart';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import { formatter, apiUrl } from '../config';

function RemovedFromCartAlert ({ games }) {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div>
      <Alert
        dismissible
        variant="warning"
        onClose={() => setShow(false)}
        style={{ width: "600px"}}>
        <Alert.Heading>{games.length} item(s) removed from cart</Alert.Heading>
        <p>Removed the following items from your cart because they already exist in your collection.</p>
        <ul>
          {games.map(game => <li>{game}</li>)}
        </ul>
      </Alert>
    </div>
  )
}

function CartItem ({ item }) {
  const [hovered, setHovered] = useState(false);
  const { id, image_url, title, price, sale } = item;

  const dispatch = useDispatch();
  return (
    <div className="checkout__game-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <img src={image_url} width="100" height="60" alt="game" />
      <div className="checkout__game-card__info">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column"}}>
          <strong>{title}</strong>
          <div className="checkout__game-card__buttons">
            <Button
              onClick={() => dispatch(removeFromCart(id))}
              size="sm"
              variant="link"
              className={hovered ? "" : "hidden"}
              style={{ padding: "0", color: "gray" }}>
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
              <span>${price}</span>}
        </div>
      </div>
    </div>
  )
}

function CheckoutPage () {
  const dispatch = useDispatch();
  const cart = useSelector(state => Object.values(state.cart.items));
  const cartObj = useSelector(state => state.cart.items);
  const collectionIds = useSelector(state => Object.keys(state.collection));
  const user = useSelector(state => state.auth.user);
  const loggedIn = useSelector(state => state.auth.token !== undefined);

  const [redirect, setRedirect] = useState(false);
  const [removedFromCart, setRemovedFromCart] = useState([]);
  const [completeOrder, setCompleteOrder] = useState([]);
  const [completeOrderId, setCompleteOrderId] = useState();

  useEffect(() => {
    const itemsToRemove = [];
    collectionIds.forEach(item => {
      if (Object.keys(cartObj).includes(item)) {
        itemsToRemove.push(cartObj[item].title);
        dispatch(removeFromCart(item));
      }
    })
    setRemovedFromCart([...itemsToRemove]);
  }, [])

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

  if (redirect && !loggedIn) {
    return <Redirect to={{
      pathname: "/login",
      state: {
        message: "You need an account to checkout. Please sign in or sign up to proceed."
      }
    }}/>
  }

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
        <div className={cart.length > 0 ? "hidden" : ""}>
          <Alert
            variant="info"
            style={{ justifySelf: "center", width: "600px" }}>
              <Alert.Heading>Your cart is empty!</Alert.Heading>
              <p>Head to our <Link to="/games">store</Link> and add some great games to your cart!</p>
          </Alert>
        </div>
        {removedFromCart.length > 0 ? <RemovedFromCartAlert games={removedFromCart} /> : null}
        {cart.map(item => <CartItem key={item.id} item={item}/>)}
          <div className="checkout__game-card">
          <div className="checkout__order-total">
            <div className="checkout total">
              <strong>ORDER TOTAL: </strong>
              <span>
                {formatter.format(cartTotal)}
              </span>
            </div>
              <div style={{ color: "#80AC02", fontSize: "12px" }}>
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
            <div style={{ display: "flex"}}>
              <div style={{ fontSize: "25px", padding: "10px", fontWeight: "600"}}>
                {formatter.format(cartTotal)}
              </div>
              <Button
                block
                variant="success"
                onClick={checkout}
                style={{ margin: "10px"}}
                disabled={cart.length === 0}>
                PAY FOR YOUR ORDER NOW
              </Button>
            </div>
            
        </div>
      </div>
    </Container>
    </>
  )
}

export default CheckoutPage;
