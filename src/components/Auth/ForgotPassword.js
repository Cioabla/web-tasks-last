import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Button, FormGroup, Input, Label, Alert} from "reactstrap";
import {Link} from "react-router-dom";

export default class Register extends Component {
    state = {
        showCode: false,
        email: '',
        code: '',
        password: '',
        errorMessage: ''
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _changeRender = showCode => {
        this.setState({
            showCode
        })
    };

    _forgot = async () => {
        const {email} = this.state;

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/forgot-password`, {
            email
        });

        if (response && response.data && response.data.responseType === 'success') {
            this.setState({
                showCode: true,
                errorMessage: ''
            });
        } else {
            this.setState({
                errorMessage: response.data.errorMessage
            });
        }
    };

    _change = async () => {
        const {email, code, password} = this.state;

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/change-password`, {
            email, code, password
        });

        if (response && response.data && response.data.responseType === 'success') {
            this.props.history.push('/login');
        } else {
            this.setState({
                errorMessage: response.data.errorMessage
            });
        }
    };

    _renderMain() {
        const {email, errorMessage} = this.state;

        return (
            <Fragment>
                <h1>Forgot password</h1>
                {errorMessage !== '' && <Alert color="danger">{errorMessage}</Alert>}
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" value={email} onChange={this._onChange}/>
                </FormGroup>
                <Button color="primary" onClick={this._forgot}>Reset Password</Button>
                <Link to={'login'}>Login</Link>
                <span onClick={() => this._changeRender(true)}>Have a code?</span>
            </Fragment>
        );
    }

    _renderCode() {
        const {code, password, errorMessage} = this.state;

        return (
            <Fragment>
                <h1>Change password</h1>
                {errorMessage !== '' && <Alert color="danger">{errorMessage}</Alert>}
                <FormGroup>
                    <Label for="exampleCode">Code</Label>
                    <Input type="text" name="code" id="exampleCode" value={code} onChange={this._onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" value={password}
                           onChange={this._onChange}/>
                </FormGroup>
                <Button color="primary" onClick={this._change}>Change Password</Button>
                <Link to={'login'}>Login</Link>
            </Fragment>
        );
    }

    render() {
        const {showCode} = this.state;

        return (
            <div className={'card'}>
                {!showCode && this._renderMain()}
                {showCode && this._renderCode()}
            </div>
        )
    }
}
