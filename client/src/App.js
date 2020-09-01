import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserList from './components/UsersList';
import Login from './components/Login';
import SignUp from './components/SignUp';

import { NavigationHeader } from './components/NavigationHeader'
import Main from './components/Main';
import StorePage from './components/StorePage';
import GamePage from './components/GamePage';

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
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/signup">
                <SignUp />
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
