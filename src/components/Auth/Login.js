import React, {Component} from 'react';
import axios from 'axios';
import {FormGroup, Label, Input, Button, Alert} from "reactstrap";
import {Link} from "react-router-dom";

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: ''
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _login = async () => {
        const {email, password} = this.state;

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
            email, password
        });

        if (response && response.data && response.data.responseType === 'success') {
            sessionStorage.setItem('token', response.data.data.jwt);
            this.props.history.push('/users');
        } else {
            this.setState({
                errorMessage: response.data.errorMessage
            });
        }
    };

    render() {
        const {email, password, errorMessage} = this.state;

        return (
            <div className={'card'}>
                <h1>Login</h1>
                {errorMessage !== '' && <Alert color="danger">{errorMessage}</Alert>}
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" value={email} onChange={this._onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" value={password}
                           onChange={this._onChange}/>value={email} onChange={this._onChange}
                </FormGroup>
                <Button color="primary" onClick={this._login}>Login</Button>
                <Link to={'register'}>Register</Link>
                <Link to={'forgot-password'}>Forgot Password</Link>
            </div>
        )
    }
}
