
import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Url from '../../Url';

import './Restaurant.css';

import tileData from '../../tileData';

const styles = theme => ({
    listTitle: {
        width: "100%",
        height: 184,
        padding: 2
    },
    link: {
        margin: theme.spacing.unit,
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});


function Restaurant(props) {
    const { classes } = props;
    
    return (
            <Card className={classes.card}>
            <CardActionArea
                onClick={() => props.details(props.cle)}
            >
                <GridListTile key={props.key} className={classes.listTitle}>
                    <img src={Url.imageUrl +"/restaurants/"+ props.photo} alt={props.photo} />
                    {/* <img className="img" src={Url.imageUrl+"/restaurants/abi-ismail-462665-unsplash.jpg"} alt={tileData[4].img} /> */}
                    <GridListTileBar
                        title={props.nom}
                        subtitle={
                            <div>
                                <span>{props.adresse}</span><Divider />

                                <Grid container>
                                    <Grid
                                        container
                                        justify="flex-start"
                                    >
                                        <span>{props.telephone}</span>
                                    </Grid>
                                    <Grid
                                        container
                                        justify="flex-end"
                                    >
                                        <span>{props.cuisine}</span>
                                    </Grid>
                                </Grid>
                            </div>
                        }
                    />
                </GridListTile>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.nom} <br />
                        ({props.cuisine})
                    </Typography>
                    <br />
                    <Typography component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => props.details(props.cle)}>
                    Voir
                </Button>
            </CardActions>
        </Card>
    
        );
}

Restaurant.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Restaurant);