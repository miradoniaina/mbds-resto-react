import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Restaurant from './components/Restaurants/Restaurants';
import MyDrawer from './components/drawer/MyDrawer';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MyDrawer />, document.getElementById('root'));
ReactDOM.render(<Restaurant />, document.getElementById('main'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
