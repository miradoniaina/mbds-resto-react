import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import Typography from '@material-ui/core/Typography';

import base from '../../base';

import tileData from '../../tileData';
import Restaurant from '../Restaurant/Restaurant.js';




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

      return <Restaurant key={index}
        cle={key}
        name={el.nom}
        photo={el.photo}
        classes={classes}
      />
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

            {/* {tileData.map(tile => ( */}
              <GridListTile key={tileData[3].img}>
                <img src='/static/images/grid-list/bike.jpg' alt={tileData[3].title} />
                <GridListTileBar
                  title={tileData[3].title}
                  subtitle={<span>by: {tileData[3].author}</span>}
                  actionIcon={
                    <IconButton className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            {/* ))} */}
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
