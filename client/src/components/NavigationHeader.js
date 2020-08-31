import React, { useState }from 'react';

import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/esm/Container';

function NavbarCart (props) {

    return (
        <div className="navbar__cart-dropdown">
            ITEMS IN CART
        </div>
    )
}

export function NavigationHeader (props) {
    const [cartDisplay, setCartDisplay] = useState(false);


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
                    <div className="navbar__items">🛒 <span>0</span></div>
                    <div className="navbar__items search">🔍</div>
                </div>
            </Container>
        </div>
        </>
    )
}
