import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import red from '@material-ui/core/colors/red';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import TextField from '@material-ui/core/TextField';


import Url from "../../Url";

import './Plat.css';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
});


class Plat extends Component {

    constructor(props) {
        super(props);
        // déclarer un état...
        this.state = {
            qte: 1,
            name: 'hai',
            labelWidth: 0,
        };
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    // méthodes
    render() {

        const { classes, plat } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={plat.nom}
                        subheader={plat.type}
                    />
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={Url.imageUrl + "plats/" + plat.photo}
                            title="Paella dish"
                        />
                        <CardContent
                        >
                            <Typography component="p">
                                {plat.description}
                            </Typography>
                            <br />
                            <Typography
                                variant="h5" component="h2"
                                align="center"
                            >
                                {bull}{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'MGA' }).format(plat.prix)}{bull}
                            </Typography>
                            <br />
                        </CardContent>
                    </CardActionArea>


                    <CardActions
                        className={classes.actions}
                        disableActionSpacing
                    >
                        <IconButton
                            color="primary"
                            aria-label="Add to favorites"
                            onClick={() => this.props.ajouterCommande(plat, this.state.qte)}
                        >
                            <AddShoppingCart />
                        </IconButton>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Quantité(s)"
                                className={classes.textField}
                                value={this.state.qte}
                                onChange={this.handleChange('qte')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                helperText="Choisissez la quantité à acheter"
                                margin="normal"
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
                            </TextField>
                        </FormControl>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

Plat.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Plat);
