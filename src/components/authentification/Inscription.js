import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect } from "react-router-dom";

import { Article } from "../loading/Generic";
import ReactLoading from "react-loading";

import base from '../../base';


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
        marginLeft: 10,
    },
    error: {
        margin: 8,
        textAlign: "center",
        color: "red",
    }
});


class Inscription extends Component {

    constructor(props) {
        super(props);
        // déclarer un état...

        this.state = {
            goPageLogin: false,
            isLoggedIn: false,
            isSignin: false,
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sinscrire = this.sinscrire.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    validateForm() {
        const {
            email,
            password,
            confirmPassword
        } = this.state;
        let errors = {};
        let formIsValid = true;
        if (password !== confirmPassword) {
            formIsValid = false;
            errors["confirmPassword"] = "Les mot de passes ne correspondent pas";
        }
        if (password === '' || password.length < 6) {
            formIsValid = false;
            errors["password"] = "Mot de passe trop faible (Minimum 6 caractères)";
        }
        if (email === '') {
            formIsValid = false;
            errors["email"] = "Adresse mail non valide";
        }
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
            formIsValid = false;
            errors["email"] = "Adresse mail non valide";
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    sinscrire = (e) => {
        e.preventDefault();

        if (this.validateForm() === true) {
            this.setState({
                isSignin: true
            });
            base.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {

                this.setState({
                    isLoggedIn: true,
                    isSignin: false
                });

                sessionStorage.setItem("_uid", u.uid);
                sessionStorage.setItem("email", u.email);

            }).catch((error) => {
                this.setState({
                    isSignin: false
                });
                alert(error.message);
                console.log(error);
            })
        }
    }

    login = (e) => {
        this.setState({
            goPageLogin: true
        });
    }

    renderRedirect = () => {
        if (this.state.isLoggedIn) {
            return <Redirect to='/restaurants' />
        }
    }

    renderLoading = () => {
        if (this.state.isSignin) {
            return <Article key={'bars'}>
                <ReactLoading type={'bars'} color="#4E5340" />
            </Article>;
        }
    }

    // méthodes
    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.renderRedirect()}
                {
                    !this.state.goPageLogin ? (
                        <main className={classes.main}>
                            <CssBaseline />
                            <Paper className={classes.paper}>
                                <Typography component="h1" variant="h5">
                                    Inscription
                                </Typography>

                                {this.renderLoading()}

                                <form onSubmit={this.sinscrire} className={classes.form}>
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
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                        <div
                                            className={classes.error}
                                        >
                                            <span>{this.state.errors.email}</span>
                                        </div>

                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <TextField
                                            id="outlined-password-input"
                                            label="Mot de passe"
                                            className={classes.textField}
                                            type="password"
                                            style={{ margin: 8 }}
                                            name="password"
                                            fullWidth
                                            autoComplete="current-password"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />
                                        <div
                                            className={classes.error}
                                        >
                                            <span>{this.state.errors.password}</span>
                                        </div>

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
                                            name="confirmPassword"
                                            value={this.state.confirmPassword}
                                            onChange={this.handleChange}
                                        />
                                        <div
                                            className={classes.error}
                                        >
                                            <span>{this.state.errors.confirmPassword}</span>
                                        </div>
                                    </FormControl>

                                    <Grid className={classes.submit}>
                                        <Fab size="large" type="submit" variant="extended" color="secondary">
                                            S'inscrire
                                        </Fab>
                                        <Button onClick={this.login} variant="text" color="primary">
                                            Se connecter
                                        </Button>
                                    </Grid>
                                </form>
                            </Paper>
                        </main>
                    ) : (<Redirect to="/" />)
                }
            </div>
        );
    }
}

Inscription.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inscription);
