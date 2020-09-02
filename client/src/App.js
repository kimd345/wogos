import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserList from './components/UsersList';
import Login from './components/Login';

import { NavigationHeader } from './components/NavigationHeader'
import Main from './components/Main';
import StorePage from './components/StorePage';
import GamePage from './components/GamePage';
import CheckoutPage from './components/CheckoutPage';

function App() {

  return (
    <BrowserRouter>
        <NavigationHeader />
        <Switch>
            <Route path="/game/:id">
                <GamePage />
            </Route>
            <Route path="/games">
                <StorePage />
            </Route>
            <Route path="/checkout">
                <CheckoutPage />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/users">
                <UserList />
            </Route>
            <Route path="/">
                <Main />
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
