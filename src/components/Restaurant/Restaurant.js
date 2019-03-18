
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from '../../tileData';



function Restaurant(props) {


    return ( 
        <GridListTile key={tileData[3].img}>
            <img src='/static/images/grid-list/bike.jpg' alt={tileData[3].title} />
            <GridListTileBar
                title={tileData[3].title}
                subtitle={<span>by: {tileData[3].author}</span>}
                actionIcon={
                <IconButton >
                    <InfoIcon />
                </IconButton>
                }
            />
        </GridListTile>
    );
}



export default Restaurant;