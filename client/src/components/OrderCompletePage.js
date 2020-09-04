import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import { clearCart } from '../actions/cart';
import { loadCurrentUserCollection } from '../actions/collection';

function OrderCompletePage (props) {
  const dispatch = useDispatch();
  const id = props.location.state.order_id;
  const items = props.location.state.order_items;
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    dispatch(clearCart());
    dispatch(loadCurrentUserCollection(user.id));
  }, [dispatch, user.id])

return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <div style={{ marginTop: "100px" }} />
        <h1><i className="fa fa-check-circle-o" style={{ color: "#80AC02"}}/> ORDER SUCCESS!</h1>
        <span style={{ fontSize: "12px", color: "gray" }}>#{id}</span>
        <p style={{ padding: "10px" }}>
          Thank you for your purchase, {user.username}.
          The following games are now in your&nbsp;
          <Link
            to=""
            style={{textDecoration: "underline"}}>
              collection
          </Link>!
        </p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent:"center" }}>
        {items.map(item =>
        <div className="game-card" style={{ width: "200px" }}>
          <div className="game-card__pic"
            style={{
              backgroundImage: `url(${item.image_url})`,
              height: "140px"}} />
          <div className="game-card__title"
            style={{ fontWeight: "600" }}>
            {item.title}
          </div>
        </div>)}
      </div>
    </Container>
)
}

export default OrderCompletePage;
