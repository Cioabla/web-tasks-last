import React, {Component} from 'react';
import {Row, Col, Button} from 'reactstrap';
import PropTypes from 'prop-types';

export default class UserRow extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        edit: PropTypes.func.isRequired
    };

    _showRole = role => {
        switch (role) {
            case 1:
                return 'Admin';
            case 2:
                return 'User';
            default:
                return 'Unknown'
        }
    };

    _edit = (user) => {
        const {edit} = this.props;

        edit && edit(user);
    };

    _delete = (user_id) => {
        const {onDelete} = this.props;

        onDelete && onDelete(user_id);
    };

    render() {
        const {user, className} = this.props;

        return (
            <Row className={`table-column ${className}`}>
                <Col xs={1}>{user.id}</Col>
                <Col xs={3}>{user.name}</Col>
                <Col xs={4}>{user.email}</Col>
                <Col xs={2}>{this._showRole(user.role_id)}</Col>
                <Col xs={2}>
                    <Button color="secondary" size="sm" onClick={() => this._edit(user)}>Edit</Button>
                    <Button color="danger" size="sm" onClick={() => this._delete(user.id)}
                            style={{marginLeft: '5px'}}>Delete</Button>
                </Col>
            </Row>
        );
    }
}