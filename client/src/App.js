import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import UserList from './components/UsersList';
import Login from './components/Login';

import { NavigationHeader } from './components/NavigationHeader'
import Main from './components/Main';
import StorePage from './components/StorePage';

function App() {

  return (
    <BrowserRouter>
        <NavigationHeader />
        <Switch>
            <Route path="/games">
                <StorePage />
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
