import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';

import Typography from '@material-ui/core/Typography';

import base from '../../base';

import Restaurant from '../restaurant/Restaurant.js';
import { Redirect } from "react-router-dom";
import MyDrawer from '../drawer/MyDrawer';



const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginLeft: 60,
  },
  gridList: {
    // justifyContent: 'center',
    // width: 2000,
    // height: 450,
  },
});


class Restaurants extends Component {
  constructor(props) {
    super(props);
    // déclarer un état...
    this.state = {
      restaurants: {
        'restaurants-0': {},
      },
      goToDetail: false,
      key : ""
    };

  }

  goToDetail = () => {
    this.setState({
      goToDetail: true
    });

  }

  isGoingToDetail = () => {
    
    if (this.state.goToDetail) {
      // this.handleDrawerClose();

      let redirect = "/restaurants/"+this.state.key.split('-')[1];

      return <Redirect to={redirect} />
    }
  }

  details(cle) {

    this.setState({
      goToDetail: true,
      key: cle
    });
  }

  componentWillMount() {
    
    this.ref = base.syncState("restaurants", {
      context: this,
      state: "restaurants"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }


  // méthodes
  render() {
    const { classes } = this.props;

    let restaurants = Object.keys(this.state.restaurants).map((key, index) => {
      let el = this.state.restaurants[key];
      return (
        <Restaurant
          key={key}
          cle={key}
          nom={el.nom}
          description={el.description}
          photo={el.photo}
          adresse={el.adresse}
          telephone={el.telephone}
          cuisine={el.type_cuisine}
          details={this.details.bind(this)}
        ></Restaurant>
      )
    });


    let main = <div>
      {this.isGoingToDetail()}
      <Typography variant="h2" gutterBottom align="center">
        Nos Restaurants
        </Typography>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={5}>
          <GridListTile key="Subheader" cols={5} style={{ height: 'auto' }}>
            <ListSubheader component="div"></ListSubheader>
          </GridListTile>
          {restaurants}
        </GridList>
      </div>
    </div>;


    return (
      <MyDrawer main={main} />
    );
  }
}


Restaurants.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Restaurants);
