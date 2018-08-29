import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import {Container} from 'reactstrap';
import {Redirect} from "react-router-dom";
import axios from 'axios';
import qs from 'qs';

export default class Layout extends Component {
    render() {
        const {user} = this.props;

        if (!sessionStorage.getItem('token')) {
            return <Redirect to={'/login'}/>
        }

        axios.interceptors.request.use((request) => {
            if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                request.data = qs.stringify(request.data);
            }
            return request;
        });

        axios.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('token');

        return (
            <Container fluid className={'layout'}>
                <Header user={user}/>
                <div className={'content'}>
                    {this.props.children}
                </div>
                <Footer/>
            </Container>
        );
    }
}