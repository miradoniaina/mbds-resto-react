import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';

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
  },
  gridList: {
    // justifyContent: 'left',
  },
});


class Restaurants extends Component {
  constructor(props) {
    super(props);
    // déclarer un état...
    this.state = {
      restaurants: {
      },
      goToDetail: false,
      key: "",
      search: ""
    };

  }

  goToDetail = () => {
    this.setState({
      goToDetail: true
    });

  }

  isGoingToDetail = () => {

    if (this.state.goToDetail) {
      let redirect = "/restaurants/" + this.state.key;
      return <Redirect to={redirect} />
    }
  }

  details(cle) {

    this.setState({
      goToDetail: true,
      key: cle
    });
  }

  filterResto = (event) => {
    this.setState({ search: event.target.value });
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
    const { restaurants } = this.state;

    let restoFiltered = Object.keys(restaurants).map((key, index) => {
      return (
        restaurants[key]
      )
    }).filter((restoTab) => {
      return restoTab.nom.toLowerCase().search(this.state.search.toLowerCase()) !== -1;
    });

    let restaurants_v = Object.keys(restoFiltered).map((key, index) => {
      let el = restoFiltered[key];

      return (
        <Restaurant
          key={key}
          cle={el._id}
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
        Choisissez un restaurant.
      </Typography>

      <TextField
        id="outlined-full-width"
        label="Recherche"
        style={{ margin: 85, width: 500 }}
        placeholder="Taper (ex: Aquacine)"
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={this.filterResto}
        value={this.state.search}
        InputLabelProps={{
          shrink: true,
        }}
         />

      <div className={classes.root} style={{marginLeft: 85}}>
        <GridList className={classes.gridList} cols={5}>
          <GridListTile key="Subheader" cols={5} style={{ height: 'auto' }}>
            <ListSubheader component="div"></ListSubheader>
          </GridListTile>
          {restaurants_v}
        </GridList>
      </div>
    </div >;
    return (
      <MyDrawer main={main} />
    );
  }
}


Restaurants.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Restaurants);
