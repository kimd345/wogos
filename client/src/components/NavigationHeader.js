import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/esm/Container';
import Logout from './Logout';

function NavigationHeader (props) {
    const cartAmount = useSelector(state => Object.keys(state.cart.items).length)
    const loggedIn = useSelector(state => Object.keys(state.auth).length !== 0);

    return (
        <>
        <div className="navbar__purple"></div>
        <div className="navbar">
            <Container className="navbar__container">
                <div className="navbar__left">
                    <Link to="/">
                        <div className="navbar__items">ICON</div>
                    </Link>
                    <Link to="/games" activeClassName="selected">
                        <div className="navbar__items">STORE</div>
                    </Link>
                    <Link to="/about">
                        <div className="navbar__items">ABOUT</div>
                    </Link>
                    <Link to="/login">
                        <div className="navbar__items">SIGN IN</div>
                    </Link>
                    {loggedIn ? <Logout/> : null}
                </div>
                <div className="navbar__right">
                    <Link to="/checkout">
                        <div className="navbar__items">
                            cart
                            <div className={cartAmount > 0 ? "navbar__cart green" : "navbar__cart"}> {cartAmount}</div>
                        </div>
                    </Link>
                    <div className="navbar__items search">search icon</div>
                </div>
            </Container>
        </div>
        </>
    )
}

export default NavigationHeader;
