import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Fab from '@material-ui/core/Fab';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import LocationSearchingSharp from '@material-ui/icons/LocationSearchingSharp';
import PropTypes from "prop-types";


import Menu from '../menu/Menu';
import Cartes from '../cartes/Cartes';

import base from '../../base';

import Url from '../../Url';

import './DetailRestaurant.css';
import MyDrawer from '../drawer/MyDrawer';
import RestoMap from '../../components/map/RestoMap';
import SousCommande from '../sous_commande/SousCommande';



// const TAX_RATE = 0.07;

const styles = theme => ({
    root: {
        flexGrow: 1,
        // backgroundImage: "url('/static/images/grid-list/bcg-resto.png')",
        backgroundRepeat: "no-repeat",
        height: 1000,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit,
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    paper: {
        position: "absolute",
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: "none"
    }
});

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function subtotal(items) {
    return items.map(({ prix, qte }) => prix * qte).reduce((sum, i) => sum + i, 0);
}

function lowerCase(str) {
    return (str + "").toLowerCase();
}

function isIn(commandes, oldElements) {
    for (let i = 0; i < oldElements.length; i++) {
        if (commandes._id === oldElements[i].cle) {
            return true
        }
    }
    return false;
}

class DetailRestaurant extends Component {


    constructor(props) {
        super(props);
        // déclarer un état...
        this.state = {
            restaurant: {},
            detail_restaurant: {},
            showMenu: true,
            showMap: false,
            macommande: [],
        };
    }

    componentWillMount() {
        this.restaurantRef = base.syncState('restaurants/restaurant-' + this.props.match.params.cle, {
            context: this,
            state: "restaurant"
        });


        this.detailRestaurantRef = base.syncState('detail-restaurants/detail-restaurants-' + this.props.match.params.cle, {
            context: this,
            state: "detail_restaurant"
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.restaurantRef);
        base.removeBinding(this.detailRestaurantRef);
    }

    showMap = () => {
        this.setState({ showMap: true });
    }

    showMenuCarte = () => {
        this.setState({ showMap: false });
    }

    switchMenuCarte = () => {
        this.setState({ showMenu: !this.state.showMenu });
    }

    modifierQteSousCommande(qte, index) {
        let commandeupdt = this.state.macommande;

        for (let i = 0; i < commandeupdt.length; i++) {
            if (i === index) {
                commandeupdt[i].qte = qte;
                break;
            }
        }

        this.setState({ macommande: commandeupdt });
    }

    ajouterCommande(commandes, quantite) {
        const oldElements = this.state.macommande;

        if (isIn(commandes, oldElements)) {
            return;
        }

        const newCommande = {
            cle: commandes._id,
            nom: commandes.nom,
            qte: quantite,
            prix: commandes.prix
        }

        this.setState({
            macommande: oldElements.concat(newCommande), // concat retourne un nouveau tableau, pas de push ici !!!
        });
    }

    supprimerCommande(commande) {

        const newmacommande = this.state.macommande.filter((el, index) => {
            return (el !== commande) ? el : null;
        });

        this.setState({
            macommande: newmacommande
        });
    };

    // méthodes
    render() {
        const { classes } = this.props;
        const { showMap, detail_restaurant } = this.state;

        let menus = detail_restaurant.menus;

        let mapOrMenu = "";
        if (showMap) {
            mapOrMenu = <React.Fragment>
                <RestoMap
                    latitude={detail_restaurant.latitude}
                    longitude={detail_restaurant.longitude}
                    adresse={this.state.restaurant.adresse}
                />
            </React.Fragment>;
        } else {
            let menus_v = "";

            if (menus != null) {
                menus_v = Object.keys(menus).map((key, index) => {
                    let el = menus[key];
                    return (
                        <Menu
                            menu={el.nom_menu}
                            key={key}
                            cle={key}
                            plats={el.plats}
                            ajouterCommande={this.ajouterCommande.bind(this)}
                        />
                    )
                });
            }

            let menuOuCarte = "cartes";
            let buttonMenuOuCarte = <Button onClick={this.switchMenuCarte} variant="outlined" color="secondary" className={classes.button}>
                Notre Carte
                                    </Button>;

            if (this.state.showMenu) {
                menuOuCarte = <div id="menu-carte">
                    <Typography variant="h2" gutterBottom>
                        Menu du jour
                    </Typography>
                    {menus_v}
                </div>;
            } else {
                buttonMenuOuCarte = <Button onClick={this.switchMenuCarte} variant="outlined" color="secondary" className={classes.button}>
                    Menu du jour
                </Button>;
                menuOuCarte = <Cartes
                    carte={detail_restaurant.carte}
                    ajouterCommande={this.ajouterCommande.bind(this)}
                />;
            };

            mapOrMenu =
                <React.Fragment>
                    <Typography variant="h2" gutterBottom>
                        Ma commande
                </Typography>
                    <div id="commande">
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Plat</TableCell>
                                    <TableCell align="right">Quantité</TableCell>
                                    {/* <TableCell align="right">@</TableCell> */}
                                    <TableCell align="right">Prix</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.macommande.map((row, index) => (
                                        <SousCommande
                                            key={index}
                                            index={index}
                                            sous_commandes={row}
                                            modifierQteSousCommande={this.modifierQteSousCommande.bind(this)}
                                            supprimerCommande={this.supprimerCommande.bind(this)}
                                        >{row}
                                        </SousCommande>
                                    ))
                                }
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell align="right">
                                        {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'MGA' }).format(ccyFormat(subtotal(this.state.macommande)))}

                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Grid container spacing={24}
                            justify="flex-end"
                        >
                            <Fab
                                id="btncommande"
                                size="large"
                                variant="extended"
                                color="primary"
                            >
                                Commander
                    </Fab>
                        </Grid>
                    </div>
                    <Grid container spacing={24}
                        justify="flex-end"
                        id="button-carte"
                    >
                        {buttonMenuOuCarte}
                    </Grid>
                    {menuOuCarte}
                </React.Fragment>
                ;
        }



        let main = <Grid
            className={classes.root}
        >
            <Grid container spacing={24}>
                <Grid item xs={4}
                >
                    <div className="left">
                        <Typography variant="h1" gutterBottom align="center">
                            {this.state.restaurant.nom}
                        </Typography>
                        <Typography variant="title" gutterBottom align="center">
                            Restaurant
                        </Typography>
                        <Grid container justify="center" alignItems="center">
                            <Link>
                                <img id="img" src={Url.imageUrl + "/restaurants/" + this.state.restaurant.photo} alt={this.state.restaurant.photo} />
                            </Link>
                        </Grid>

                        <Grid container spacing={24}
                            justify="center"
                            id="descr"
                        >

                            <Grid item xs={8}>
                                {/* <hr/> */}
                                <div
                                    className="">
                                    <Typography variant="subtitle1" gutterBottom align="center">
                                        {this.state.restaurant.description}
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}
                            justify="center"
                            id="menucarte"
                        >
                            <Grid
                                item xs={3}
                            >
                                <Button
                                    color="primary"
                                    onClick={this.showMenuCarte}
                                >
                                    Menu&Carte
                                    </Button>
                            </Grid>
                        </Grid>


                        <Grid container spacing={24}
                            id="resto"
                            justify="center"
                        >
                            <Grid
                                item xs={8}
                            >
                                <Typography variant="title" gutterBottom align="center">
                                    Restaurant {this.state.restaurant.nom}
                                </Typography>
                            </Grid>
                        </Grid>


                        <Grid container spacing={24}
                            justify="center"
                        >
                            <Grid
                                item xs={6}
                                id="adresse"
                            >
                                <hr />
                                <Typography variant="subtitle2" gutterBottom align="center">
                                    {this.state.restaurant.adresse}
                                </Typography>

                                <Grid container spacing={24}
                                    justify="center"
                                >
                                    <Button
                                        color="primary"
                                        onClick={this.showMap}
                                    >
                                        <LocationSearchingSharp
                                        
                                        />
                                        Voir sur carte
                                    </Button>
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid container spacing={24}
                            justify="center"
                        >
                            <Grid
                                item xs={3}
                            >

                            </Grid>
                        </Grid>

                        <Grid container spacing={24}
                            justify="center"
                            id="tel"
                        >
                            <Grid
                                item xs={6}
                            >
                                <Typography variant="subtitle2" gutterBottom align="center">
                                    {this.state.restaurant.telephone}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}
                            justify="center"
                            id="email"
                        >
                            <Grid
                                item xs={6}
                            >
                                <Typography variant="subtitle2" gutterBottom align="center">
                                    {lowerCase(this.state.restaurant.nom)}@restaurant.com
                                    </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    {mapOrMenu}
                </Grid>
            </Grid>
        </Grid>;

        return (
            <MyDrawer main={main} />
        );
    }
}

DetailRestaurant.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailRestaurant);
