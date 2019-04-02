import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Plat from '../plat/Plat';





class Cartes extends Component {

    constructor(props) {
        super(props);
        // déclarer un état...
        // this.state = {
        //   restaurants: {
        //     'restaurants-0': {},
        //   }
        // };

    }

    details() {
        console.log("details");
        // ReactDOM.render(<DetailRestaurant />, document.getElementById('main'));
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

        // const { classes } = this.props;

        return (
            <div>
                {/* <div>
                    <Typography variant="title" gutterBottom>
                        Notre carte
                    </Typography>
                    <div id="menu-resto">
                        <Grid container spacing={24}
                            justify="center"
                        >
                            <Grid
                                item xs={12}
                            >
                                <Typography
                                    variant="h3"
                                    gutterBottom
                                    align="center"
                                >
                                    All Day breakfast
                                </Typography>
                                <hr />
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}
                            justify="flex-start"
                        >
                            <Grid
                                item xs={3}
                            >
                                <Plat />
                            </Grid>
                            <Grid
                                item xs={3}
                            >
                                <Plat />
                            </Grid>
                            <Grid
                                item xs={3}
                            >
                                <Plat />
                            </Grid>
                            <Grid
                                item xs={3}
                            >
                                <Plat />
                            </Grid>
                            <Grid
                                item xs={3}
                            >
                                <Plat />
                            </Grid>
                        </Grid>


                        <Grid container spacing={24}
                            justify="center"
                        >
                            <Grid
                                item xs={12}
                            >
                                <Typography
                                    variant="h3"
                                    gutterBottom
                                    align="center"
                                >
                                    Salads
                                </Typography>
                                <hr />
                            </Grid>

                           

                        </Grid>
                        <Grid container spacing={24}
                            justify="center"
                        >
                            <Grid
                                item xs={12}
                            >
                                <Typography
                                    variant="h3"
                                    gutterBottom
                                    align="center"
                                >
                                    Sandwich
                    </Typography>
                                <hr />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}
                            justify="center"
                        >
                            <Grid
                                item xs={12}
                            >
                                <Typography
                                    variant="h3"
                                    gutterBottom
                                    align="center"
                                >
                                    Hot drink
                    </Typography>
                                <hr />
                            </Grid>
                        </Grid>
                    </div>
                
                </div> */}
            </div>
        );
    }
}

export default (Cartes);
