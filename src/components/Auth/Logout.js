import React, {Component} from 'react';

export default class Logout extends Component {
    constructor(props) {
        super(props);

        sessionStorage.removeItem('token');
        props.history.push("/login");
    }

    render() {
        return null;
    }
}
