import React from 'react';

import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/esm/Container';
import { useSelector } from 'react-redux';

export function NavigationHeader (props) {
    const cart = useSelector(state => state.cart)

    return (
        <>
        <div className="navbar__purple"></div>
        <div className="navbar">
            <Container className="navbar__container">
                <div className="navbar__left">
                    <Link to="/">
                        <div className="navbar__items">ICON</div>
                    </Link>
                    <Link to="/games">
                        <div className="navbar__items">STORE</div>
                    </Link>
                    <Link to="/about">
                        <div className="navbar__items">ABOUT</div>
                    </Link>
                    <> 
                        <div className="navbar__items">SIGN IN</div>
                    </>
                </div>
                <div className="navbar__right">
                    <Link to="/checkout">
                        <div className="navbar__items">
                            {Object.keys(cart.items).length}
                            {/* <div className={cart.length > 0 ? "navbar__cart green" : "navbar__cart"}> {cart.length}</div> */}
                        </div>
                    </Link>
                    <div className="navbar__items search">search icon</div>
                </div>
            </Container>
        </div>
        </>
    )
}
