import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';


import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';


import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';



function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

class SousCommandes extends Component {

    constructor(props) {
        super(props);
        // déclarer un état...
        this.state = {
            qte: this.props.sous_commandes.qte
        };
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.modifierQteSousCommande(event.target.value, this.props.index);
    };


    // méthodes
    render() {
        const { sous_commandes, classes } = this.props;
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell>
                        {sous_commandes.nom}
                    </TableCell>
                    <TableCell align="right">
                        <Select
                            value={this.state.qte}
                            onChange={this.handleChange}
                            input={
                                <OutlinedInput
                                    labelWidth={0}
                                    name="qte"
                                    id="outlined-age-simple"
                                />
                            }
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell align="right">
                        {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'MGA' }).format(ccyFormat(sous_commandes.prix) * this.state.qte)}
                    </TableCell>
                    <TableCell align="left">
                        <Fab
                            aria-label="Delete"
                            color="secondary"
                            className={classes.fab}
                            onClick={() => this.props.supprimerCommande(sous_commandes)}
                        >
                            <DeleteIcon />
                        </Fab>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}

SousCommandes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SousCommandes);;
