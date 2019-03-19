
import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import tileData from '../../tileData';

const styles = theme => ({
    listTitle: {
        width: "20%",
        height: 184,
        padding: 2
    },
    link: {
        margin: theme.spacing.unit,
    },
});


function Restaurant(props) {
    const { classes } = props;

    return (

        <GridListTile key={props.key} className={classes.listTitle}>
            <Link onClick={() => props.details()} >
                <img src={props.photo} alt={props.nom} />
                {/* <img src={tileData[4].img} alt={tileData[4].img} /> */}
            </Link>
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
                actionIcon={
                    <IconButton >
                        <InfoIcon />
                    </IconButton>
                }
            />
        </GridListTile>
    );
}

export default withStyles(styles)(Restaurant);