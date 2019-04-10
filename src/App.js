import React, { Component } from 'react';
import './App.css';
import Login from './components/authentification/Login';
import Inscription from './components/authentification/Inscription';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DetailRestaurant from './components/detail_restaurant/DetailRestaurant';
import Restaurants from './components/restaurants/Restaurants';
import base from './base';

import Home from './Home';

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    base.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  render() {
    return (
 /*  <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/inscription" component={Inscription} />
          <Route path="/restaurants" component={Restaurants} exact />
         <Route path="/restaurants/:cle" render={(props) => <DetailRestaurant {...props} />} />
        </Switch>
      </BrowserRouter>*/
    
    <div>
     {this.state.user ? (
       <Home />
     ) :
       (
        //<Login />
       <Inscription />
        

       )}
   </div>

    );
  }
}

export default App;
