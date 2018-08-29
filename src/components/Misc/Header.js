import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Nav, NavItem} from "reactstrap";

export default class Header extends Component {
    render() {
        const {user} = this.props;

        return (
            <div className={'header'}>
                <Nav className={'menu'}>
                    <NavItem className={'menu-item'}>
                        <Link to={"/"}>Home</Link>
                    </NavItem>
                    {user && user.role_id === 1 &&
                    <NavItem className={'menu-item'}>
                        <Link to={"users"}>Users</Link>
                    </NavItem>}
                    <NavItem className={'menu-item'}>
                        <Link to={"tasks"}>Tasks</Link>
                    </NavItem>
                    <NavItem className={'menu-item'}>
                        <Link to={"groups"}>Groups</Link>
                    </NavItem>
                    <NavItem className={'menu-item'}>
                        <Link to={"logout"}>Logout</Link>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}