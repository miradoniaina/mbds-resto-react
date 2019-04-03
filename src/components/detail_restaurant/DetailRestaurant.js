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

import Menu from '../menu/Menu';
import Cartes from '../cartes/Cartes';

import base from '../../base';

import Url from '../../Url';

import './DetailRestaurant.css';
import MyDrawer from '../drawer/MyDrawer';

const TAX_RATE = 0.07;

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
});

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(id, desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { id, desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function lowerCase(str) {
    return (str + "").toLowerCase();
}

const rows = [
    ['Paperclips (Box)', 100, 1.15],
    ['Paper (Case)', 10, 45.99],
    ['Waste Basket', 2, 17.99],
].map((row, id) => createRow(id, ...row));

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;


class DetailRestaurant extends Component {


    constructor(props) {
        super(props);
        // déclarer un état...
        this.state = {
            restaurant: {},
            menus: {},
            carte: {},
            showMenu: true
        };
    }

    componentWillMount() {
        this.restaurantRef = base.syncState('restaurants/restaurant-' + this.props.match.params.cle, {
            context: this,
            state: "restaurant"
        });

        this.detailRestaurantRef = base.syncState('detail-restaurants/detail-restaurants-' + this.props.match.params.cle + "/menus", {
            context: this,
            state: "menus"
        });

        this.detailCarteRef = base.syncState('detail-restaurants/detail-restaurants-' + this.props.match.params.cle + "/carte", {
            context: this,
            state: "carte"
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.restaurantRef);
        base.removeBinding(this.detailRestaurantRef);
        base.removeBinding(this.detailCarteRef);
    }


    switchMenuCarte = () => {
        this.setState({ showMenu: !this.state.showMenu });
    }


    // méthodes
    render() {
        const { classes } = this.props;
        const { menus } = this.state;

        let menus_v = Object.keys(menus).map((key, index) => {
            let el = menus[key];
            return (
                <Menu
                    menu={el.nom_menu}
                    key={key}
                    cle={key}
                    plats={el.plats}
                />
            )
        });

        

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
        }else{
            buttonMenuOuCarte=<Button onClick={this.switchMenuCarte} variant="outlined" color="secondary" className={classes.button}>
                Menu du jour
            </Button>;
            menuOuCarte = <Cartes carte={this.state.carte}/>;
        }


        let main = <Grid
            className={classes.root}
        >
            <Grid container spacing={24}>
                <Grid item xs={3}
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
                                <Link className=""
                                >
                                    Menus&cartes
                            </Link>
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
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}
                            justify="center"
                        >
                            <Grid
                                item xs={3}
                            >
                                <Link
                                >
                                    Google Map
                             </Link>
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
                <Grid item xs={9}>
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
                                {rows.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.desc}</TableCell>
                                        <TableCell align="right">{row.qty}</TableCell>
                                        {/* <TableCell align="right">{row.unit}</TableCell> */}
                                        <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
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
                                color="secondary"
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

                </Grid>
            </Grid>
        </Grid>;

        return (
            <MyDrawer main={main} />
        );
    }
}

export default withStyles(styles)(DetailRestaurant);
