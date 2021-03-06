import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom';

import UserList from './components/UsersList';

import NavigationHeader from './components/NavigationHeader'
import Main from './components/Main';
import StorePage from './components/StorePage';
import GamePage from './components/GamePage';
import CheckoutPage from './components/CheckoutPage';
import OrderCompletePage from './components/OrderCompletePage';
import CollectionPage from './components/CollectionPage';

import { loadCart } from './actions/cart'
import { loadCurrentUserCollection } from './actions/collection'
import { loadToken, loadUser } from './actions/auth';
import Footer from './components/Footer';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        rest.needLogin === true
            ? <Redirect to='/login' />
            : <Component {...props} />
    )} />
)

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scroll(0,0)
    }, [pathname]);

    return null;
}

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const needLogin = useSelector(state => !state.auth.token);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(loadToken());
        dispatch(loadUser());
        dispatch(loadCart())
        setLoaded(true);
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            dispatch(loadCurrentUserCollection(user.id))
        }
    }, [user, dispatch])

    if (!loaded) {
        return null;
    }

  return (
    <BrowserRouter>
        <ScrollToTop />
        <NavigationHeader />
        <Switch>
            <Route path="/game/:id">
                <GamePage />
            </Route>
            <Route path="/order-complete" render={(props) => <OrderCompletePage {...props} />}/>
            <Route path="/games">
                <StorePage />
            </Route>
            <Route path="/checkout">
                <CheckoutPage />
            </Route>
            <PrivateRoute path='/collection' needLogin={needLogin} component={CollectionPage} />
            <Route path="/users">
                <UserList />
            </Route>
            <Route path="/">
                <Main />
            </Route>
        </Switch>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
