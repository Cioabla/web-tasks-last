import React, {Component} from 'react';
import Layout from "../Misc/Layout";

export default class Home extends Component {
    render() {
        const {user} = this.props;

        return (
            <Layout user={user}>
                Home
            </Layout>
        )
    }
}
