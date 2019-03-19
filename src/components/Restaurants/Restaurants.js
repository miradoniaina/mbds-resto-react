import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';

import Typography from '@material-ui/core/Typography';

import base from '../../base';

import Restaurant from '../Restaurant/Restaurant.js';
import DetailRestaurant from '../detail_restaurant/DetailRestaurant.js';




const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
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
      }
    };

  }

  details(){
    console.log("details");
    ReactDOM.render(<DetailRestaurant />, document.getElementById('main'));
  }

  componentWillMount() {
    console.log("Will mount")
    this.ref = base.syncState("restaurants", {
      context: this,
      state: "restaurants"
    });

  }

  componentWillUnmount() {
    console.log("Will unmount")
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
          nom={el.nom}
          photo={el.photo}
          adresse={el.adresse}
          telephone={el.telephone}
          cuisine={el.type_cuisine}
          details={this.details.bind(this)}
        ></Restaurant>
      )
    });

    return (

      <div>
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

      </div>
    );
  }
}


Restaurants.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Restaurants);
