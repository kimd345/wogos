import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './components/GameCard.css';
import './components/StorePage.css';
import './components/NavigationHeader.css';
import App from './App';
import configureStore from './store';
import { Provider } from 'react-redux';

const store = configureStore();
window.store = store;   // store.getState() in browser console -- remove before deployment

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
