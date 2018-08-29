import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import Users from './components/Users/Users';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import ForgotPassword from "./components/Auth/ForgotPassword";
import Register from "./components/Auth/Register";
import {LoggedUser} from "./components/Misc/LoggedUser";
import Tasks from "./components/Tasks";
import Groups from "./components/Groups";

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LoggedUser(Home)}/>
                    <Route exact path="/users" component={LoggedUser(Users)}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/forgot-password" component={ForgotPassword}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/tasks" component={LoggedUser(Tasks)}/>
                    <Route exact path="/logout" component={Logout}/>
                    <Route exact path="/groups" component={Groups}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
