import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';

import './DetailRestaurant.css';

const TAX_RATE = 0.07;

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundImage: "url('/static/images/grid-list/bcg-resto.png')",
        backgroundRepeat: "no-repeat",
        height: 1000,
        paddingTop: 20,
        paddingLeft: 20,
    },
    table: {
        minWidth: 700,
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
            <Grid
                className={classes.root}
            >
                <Grid container spacing={24}>
                    <Grid item xs={3}
                    >
                        <div className="left">
                            <Typography variant="h3" gutterBottom align="center">
                                Tend Em
                            </Typography>
                            <Typography variant="title" gutterBottom align="center">
                                Restaurant
                            </Typography>

                            <Grid container spacing={24}
                                justify="center"
                                id="descr"
                            >

                                <Grid item xs={8}>
                                    {/* <hr/> */}
                                    <div
                                        className="menu">
                                        <Typography variant="subtitle1" gutterBottom align="center">
                                            Cillum est minim fugiat adipisicing aliqua ad elit exercitation do.
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
                                    {/* <hr/> */}
                                    <Link className="menu"
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
                                        Restaurant Tend em
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
                                        Ap #294-956 Facilisis Rd.
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
                                        Tél: +1 (981) 474-3743
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
                                        contact@restauranttendem.com
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <div id="right">
                            <Typography variant="title" gutterBottom>
                                Panier
                            </Typography>
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
                        </div>

                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(DetailRestaurant);
