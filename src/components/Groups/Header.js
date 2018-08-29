import React, {Component} from 'react';
import {Nav,NavItem} from 'reactstrap';
import '../../css/GroupsHeader.css';

export default class Header extends Component {

    render() {


        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        {/*<NavLink href="#" active>Owned groups</NavLink>*/}
                        <button className={'nav-link active'} type={'button'}>Owned groups</button>
                    </NavItem>
                    <NavItem>
                        <button className={'nav-link'} type={'button'}>Groups member</button>
                    </NavItem>
                </Nav>
                <Nav tabs>
                    <NavItem>
                        Link
                    </NavItem>
                    <NavItem>
                        Link
                    </NavItem>
                    <NavItem>
                        Link
                    </NavItem>
                    <NavItem>
                        Link
                    </NavItem>
                </Nav>
            </div>
        )
    }
}