import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Login from './Login';
import ReactDOM from 'react-dom';

const styles = theme => ({
    root: {
        marginTop: 100,
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },

    button: {
        marginTop: 30,
    }
});


class Inscription extends Component {

    constructor(props) {
        super(props);
        // déclarer un état...

        this.state = {
            //   restaurants: {
            //     'restaurants-0': {},
            //   }
        };
    }

    login = () => {
        ReactDOM.render(<Login />, document.getElementById('root'));
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
                <Grid
                    container
                    justify="center"
                >
                    <Typography variant="h1" gutterBottom align="center">
                        Inscription
                    </Typography>
                </Grid>

                <Grid
                    container
                    justify="center"
                >
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            className={classes.textField}
                            type="email"
                            placeholder="wyz@yahoo.fr"
                            style={{ margin: 8 }}
                            name="email"
                            fullWidth
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Mot de passe"
                            className={classes.textField}
                            style={{ margin: 8 }}
                            type="password"
                            autoComplete="current-password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-password-input-confirm"
                            label="Retaper votre mot de passe"
                            className={classes.textField}
                            style={{ margin: 8 }}
                            type="password"
                            autoComplete="current-password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />

                        <Grid className={classes.button}>
                            <Fab size="large" variant="extended" color="secondary">
                                Inscription
                            </Fab>
                            <Button onClick={this.login} variant="text" color="primary">
                                Se connecter
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </div>

        );
    }
}

Inscription.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inscription);
