import React, { Component } from 'react';
import './App.css';
import Login from './components/authentification/Login';
import Inscription from './components/authentification/Inscription';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DetailRestaurant from './components/detail_restaurant/DetailRestaurant';
import Restaurants from './components/restaurants/Restaurants';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/inscription" component={Inscription} />
          <Route path="/restaurants" component={Restaurants} exact />
          <Route path="/restaurants/:cle" render={(props) => <DetailRestaurant {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
