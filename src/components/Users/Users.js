import React, {Component} from 'react';
import axios from 'axios';
import UserRow from "./UserRow";
import Layout from '../Misc/Layout';
import '../../css/Users.css';

import {ModalFooter, Button, Modal, ModalHeader, ModalBody, FormGroup, Form, Label, Input, Col, Row} from 'reactstrap';

export default class Users extends Component {
    state = {
        users: [],
        open: false,
        id: false,
        name: '',
        email: '',
        password: '',
        role: '',
        shouldRerender: false
    };

    async componentDidMount() {
        let users = await axios.get(`${process.env.REACT_APP_API_URL}/admin/users`);

        this.setState({users: users.data.data});
    }

    async componentDidUpdate() {
        if (this.state.shouldRerender) {
            let users = await axios.get(`${process.env.REACT_APP_API_URL}/admin/users`);

            this.setState({users: users.data.data, shouldRerender: false});
        }
    }

    _toggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _userAction = async () => {
        const {name, email, password, role, id} = this.state;

        const data = {
            name, email
        };

        if (role !== '') {
            data.role = role;
        }

        let res;

        if (id) {
            res = await axios.patch(`${process.env.REACT_APP_API_URL}/admin/user/${id}`, data);
        } else {
            data.password = password;

            res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/user`, data);
        }

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                open: false
            });
        }
    };

    _add = () => {
        this.setState({
            id: false,
            name: '',
            email: '',
            role: '',
            open: true
        });
    };

    _edit = (user) => {
        this.setState({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role_id,
            open: true
        });
    };

    _delete = async id => {
        let res = await axios.delete(`${process.env.REACT_APP_API_URL}/admin/user/${id}`);

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true
            });
        }
    };

    render() {
        const {user} = this.props;
        const {users, id} = this.state;

        return (
            <Layout user={user}>
                <h1>Users</h1>
                <Button className={'add-new'} color="primary" onClick={this._add}>Add user</Button>
                <Modal isOpen={this.state.open} toggle={this._toggle}>
                    <ModalHeader toggle={this._toggle}>{id ? 'Edit user' : 'Add user'}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text"
                                       name="name"
                                       id="name"
                                       placeholder="Name"
                                       value={this.state.name}
                                       onChange={this._onChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email"
                                       name="email"
                                       id="email"
                                       placeholder="Email"
                                       value={this.state.email}
                                       onChange={this._onChange}/>
                            </FormGroup>
                            {!id && <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password"
                                       name="password"
                                       id="password"
                                       placeholder="Password"
                                       value={this.state.password}
                                       onChange={this._onChange}/>
                            </FormGroup>}
                            <FormGroup>
                                <Label for="role">Select</Label>
                                <Input type="select"
                                       name="role"
                                       id="role"
                                       onChange={this._onChange}
                                       value={this.state.role}>
                                    <option value={''}>Select</option>
                                    <option value={1}>Admin</option>
                                    <option value={2}>User</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this._userAction}>{id ? 'Edit user' : 'Add user'}</Button>
                        <Button color="secondary" onClick={this._toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <div className={'users-list'}>
                    <Row className={'table-header'}>
                        <Col xs={1}>ID</Col>
                        <Col xs={3}>Name</Col>
                        <Col xs={4}>Email</Col>
                        <Col xs={2}>Role</Col>
                        <Col xs={2}>Actions</Col>
                    </Row>
                    {users.length > 1 && users.map((u, key) => {
                        return <UserRow key={key} user={u} edit={this._edit} onDelete={this._delete}
                                        className={`${key % 2 === 0 ? 'odd' : ''}`}/>
                    })}
                </div>
            </Layout>
        )
    }
}
