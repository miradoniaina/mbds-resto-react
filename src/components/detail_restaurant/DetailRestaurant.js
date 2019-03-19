import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
  });

class DetailRestaurant extends Component {

    constructor(props) {
        super(props);
        // déclarer un état...

        this.state = {
            //   restaurants: {
            //     'restaurants-0': {},
            //   }
        };

    }


    componentWillMount() {
        console.log("Will mount")
        // this.ref = base.syncState("restaurants", {
        //   context: this,
        //   state: "restaurants"
        // });

    }

    componentWillUnmount() {
        console.log("Will unmount")
        // base.removeBinding(this.ref);
    }


    // méthodes
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}> 

                <Typography variant="h1" gutterBottom align="center">
                        Tend em
                </Typography>
                <div >

                </div>
            </div>
        );
    }
}

export default withStyles(styles)(DetailRestaurant);
