import React, { useState }from 'react';

import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/esm/Container';

function NavbarCart (props) {

}

export function NavigationHeader (props) {
    const [cart, setCart] = useState(["dsfa"]);

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
                    <div className="navbar__items">
                        🛒
                        <div className={cart.length > 0 ? "navbar__cart green" : "navbar__cart"}> {cart.length}</div>
                    </div>
                    <div className="navbar__items search">🔍</div>
                </div>
            </Container>
        </div>
        </>
    )
}
