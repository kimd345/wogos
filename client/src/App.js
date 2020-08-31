import React from 'react';
import { BrowserRouter, Switch, Route, NavLink, Link } from 'react-router-dom';

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
            <Route path="/">
                <Main />
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
