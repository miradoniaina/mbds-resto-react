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

import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import CssBaseline from '@material-ui/core/CssBaseline';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
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
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Inscription
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
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
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
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
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
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
                        </FormControl>

                        <Grid className={classes.submit}>
                            <Fab size="large" variant="extended" color="secondary">
                                S'inscrire
                            </Fab>
                            <Button  onClick={this.login} variant="text" color="primary">
                                Se connecter
                            </Button>
                        </Grid>
                    </form>
                </Paper>
            </main>
        );
    }
}

Inscription.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inscription);
