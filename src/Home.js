import React, { Component } from 'react';
import base from './base';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        base.auth().signOut();
    }

    render() {
        return (
            <div>
                <h1>Welcome to Home</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
            );

    }

}

export default Home;