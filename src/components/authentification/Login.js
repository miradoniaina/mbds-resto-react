import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import ReactLoading from "react-loading";

import { Article } from "../loading/Generic";

import Fab from '@material-ui/core/Fab';
import { Redirect } from "react-router-dom";
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
    },
});


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            goInscription: false,
            isLoggedIn: false,
            lsLogginIn: false,
            email: '',
            password: '',
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sinscrire = this.sinscrire.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    sinscrire = () => {
        this.setState({
            goInscription: true
        });
    }

    login = (e) => {
        this.setState({
            lsLogginIn: true
        });

        base.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {

            this.setState({
                isLoggedIn: true
            });

            sessionStorage.setItem("_uid", u.uid);
            sessionStorage.setItem("email", u.email);

        }).catch((error) => {
            this.setState({
                lsLogginIn: false
            });

            switch (error.code) {
                case ("auth/invalid-email"):
                    // this.setState({
                    //     exception: "Taper une adresse valide"
                    // });
                    break;
                default:
            }

            alert("authentification échoué");
        });
        e.preventDefault();
    }
    renderRedirect = () => {
        if (this.state.isLoggedIn) {
            return <Redirect to='/restaurants' />
        }
    }



    renderLoading = () => {
        if (this.state.lsLogginIn) {
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
                {!this.state.goInscription ? (
                    <main className={classes.main}>
                        <CssBaseline />
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Authentification
                            </Typography>

                            {this.renderLoading()}

                            <form className={classes.form} noValidate autoComplete="off" onSubmit={this.login}>
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
                                        required
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
                                        name="password"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </FormControl>
                                {/* <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        /> */}
                                <Grid className={classes.submit}>
                                    <Fab size="large" variant="extended" type="submit" color="primary">
                                        Se connecter
                                            </Fab>
                                    <Button variant="text" onClick={this.sinscrire} color="primary">
                                        S'inscrire
                                    </Button>
                                </Grid>
                            </form>
                        </Paper>
                    </main>
                ) : (<Redirect to="/inscription" />)
                }
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
