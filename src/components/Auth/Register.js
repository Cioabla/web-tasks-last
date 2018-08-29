import React, {Component} from 'react';
import axios from 'axios';
import {Button, FormGroup, Input, Label, Alert} from "reactstrap";
import {Link} from "react-router-dom";

export default class Register extends Component {
    state = {
        name: '',
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

    _register = async () => {
        const {name, email, password} = this.state;

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
            email, password, name
        });

        if (response && response.data && response.data.responseType === 'success') {
            this.props.history.push('/login');
        } else {
            this.setState({
                errorMessage: response.data.errorMessage
            });
        }
    };

    render() {
        const {name, email, password, errorMessage} = this.state;

        return (
            <div className={'card'}>
                <h1>Register</h1>
                {errorMessage !== '' && <Alert color="danger">{errorMessage}</Alert>}
                <FormGroup>
                    <Label for="exampleName">Name</Label>
                    <Input type="text" name="name" id="exampleName" value={name} onChange={this._onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" value={email} onChange={this._onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" value={password}
                           onChange={this._onChange}/>
                </FormGroup>
                <Button color="primary" onClick={this._register}>Register</Button>
                <Link to={'login'}>Login</Link>
            </div>
        )
    }
}
