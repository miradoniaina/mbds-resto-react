import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Plat from '../plat/Plat';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    root: {
        marginTop: 15,
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: "#E2E8DD",
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class Menu extends Component {

    constructor(props) {
        super(props);
        // déclarer un état...
        this.state = {
            expanded: false,
            name: 'hai',
            qte: ''
        };
    }

    componentDidMount() {
        this.setState({
            // labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };


    // méthodes
    render() {
        const { classes, plats, menu } = this.props;

        let plats_v = Object.keys(plats).map((key, index) => {
            let el = plats[key];
            return (
                <Grid
                    item xs={3}
                    key={key}
                >
                    <Plat
                        cle={key}
                        plat={el}
                        ajouterCommande = {this.props.ajouterCommande.bind(this.props.ajouterCommande)}
                    />
                </Grid>
            )
        });

        return (
            <div>
                <div>
                    <div className="menu-resto">
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
                                    {menu.nom_menu}
                                </Typography>
                                <hr />
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}
                            justify="flex-start"
                        >
                            {plats_v}
                        </Grid>
                        <form className={classes.root} autoComplete="off">
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel htmlFor="age-simple">Quantité(s)</InputLabel>
                                <Select
                                    value={this.state.qte}
                                    onChange={this.handleChange}
                                    variant="filled"
                                    inputProps={{
                                        name: 'qte',
                                        id: 'age-simple',
                                    }}
                                >
                                    <MenuItem selected value="0">
                                        <em></em>
                                    </MenuItem>
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
                            </FormControl>
                            <Button variant="contained" fullWidth color="primary" className={classes.button} onClick={() => this.props.ajouterCommandeMenu(menu, this.state.qte)}>
                                Ajouter au panier
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);
