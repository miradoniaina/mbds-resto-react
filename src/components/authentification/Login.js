import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Inscription from './Inscription';
import MyDrawer from '../drawer/MyDrawer';


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


class Login extends Component {

    constructor(props) {
        super(props);
        // déclarer un état...

        this.state = {
            //   restaurants: {
            //     'restaurants-0': {},
            //   }
        };
    }


    sinscrire = () => {
        ReactDOM.render(<Inscription />, document.getElementById('root'));
    }

    login = () => {
        ReactDOM.render(<MyDrawer />, document.getElementById('root'));
        // ReactDOM.render(<Restaurants />, document.getElementById('main'));
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
                        Login
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
                            label="Password"
                            className={classes.textField}
                            style={{ margin: 8 }}
                            type="password"
                            autoComplete="current-password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />

                        <Grid className={classes.button}>
                            <Fab size="large" onClick={this.login} variant="extended" color="primary">
                                Se connecter
                            </Fab>
                            <Button onClick={this.sinscrire} variant="text" color="primary">
                                S'inscrire
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </div>

        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
