import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Plat from '../plat/Plat';





class Cartes extends Component {
    
    // méthodes
    render() {

        const { carte } = this.props;

        let cartes_v = Object.keys(carte).map((key, index) => {
            let el = carte[key];

            let sous_carte_v = Object.keys(el).map((key1, index) => {
                let plat = el[key1];

                return (
                    <React.Fragment
                        key={key1}
                    >
                        <Grid
                            item xs={3}
                        >
                            <Plat
                                cle={key}
                                plat={plat}
                                ajouterCommande = {this.props.ajouterCommande.bind(this.props.ajouterCommande)}
                            />
                        </Grid>
                    </React.Fragment>
                )
            });


            return (
                <React.Fragment
                    key={key}
                >
                    <Grid className="menu-resto"
                    >
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
                                    {key}
                                </Typography>
                                <hr />
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}
                            justify="flex-start"
                        >
                            {sous_carte_v}
                        </Grid>
                    </Grid>
                </React.Fragment>
            )
        });


        return (
            <div>
                <div>
                    <Typography variant="h2" gutterBottom>
                        Notre carte
                    </Typography>
                    <div id="menu-resto">
                        {cartes_v}
                    </div>
                </div>
            </div>
        );
    }
}

export default (Cartes);
