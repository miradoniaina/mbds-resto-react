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
import FavoriteIcon from '@material-ui/icons/PaymentRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import red from '@material-ui/core/colors/red';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import CardActionArea from '@material-ui/core/CardActionArea';


import Url from "../../Url";

import './Plat.css';


// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//     const top = 50 + rand();
//     const left = 50 + rand();

//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

const styles = theme => ({
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

    onClickPlat = () => {
        console.log("onClickPlat");
        // ReactDOM.render(<DetailRestaurant />, document.getElementById('main'));
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    componentWillMount() {
        console.log("Will mount");
        // this.setState({
        //     labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        //   });
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

        const { classes, nom, type, description, prix, photo } = this.props;

        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={nom}
                        subheader={type}
                    />
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={Url.imageUrl+"/plats/entree-10.jpg"}
                            title="Paella dish"
                        // onClick={this.onClickPlat}
                        />
                        <CardContent
                        //   onClick={this.onClickPlat}
                        >
                            <Typography component="p">
                                {description}
                            </Typography>
                        </CardContent>

                    </CardActionArea>

                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        {/* <IconButton aria-label="Share">
                            <ShareIcon />
                        </IconButton> */}

                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel
                                    ref={ref => {
                                        this.InputLabelRef = ref;
                                    }}
                                    htmlFor="outlined-age-simple"
                                >
                                    Qte
                              </InputLabel>
                                <Select
                                    value={this.state.qte}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={this.state.labelWidth}
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
                                </Select>
                            </FormControl>

                            <Typography
                                component="title"
                                id="prix"
                            >
                                {prix} AR
                            </Typography>
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
