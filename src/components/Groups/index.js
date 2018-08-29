import React, {Component} from 'react';
import axios from 'axios';
import {Container,Nav,NavItem,Form,FormGroup,Label,Input,Button} from 'reactstrap'
import '../../css/GroupsHeader.css';
import Layout from "../Misc/Layout";
import UserRow from "../Users/UserRow";



export default class Groups extends Component {
    state = {
        groups: [],
        tab_action: 'owned',
        shouldRerender: false,
        name: '',
        description: '',
        error: false,
        current_tab_content: false,
        id: false
    };

    async componentDidMount() {
        let groups = await axios.get(`${process.env.REACT_APP_API_URL}/group`);

        this.setState({groups: groups.data.data});
    }

    async componentDidUpdate() {
        if (this.state.shouldRerender) {
            let groups = await axios.get(`${process.env.REACT_APP_API_URL}/group`);

            this.setState({groups: groups.data.data, shouldRerender: false});
        }
    }

    _tabAction = (nav) => {
        switch (nav) {
            case 'owned':
                this.setState({tab_action: 'owned',shouldRerender: true,current_tab_content: false});
                break;
            case 'member':
                this.setState({tab_action: 'member',shouldRerender: true,current_tab_content: false});
                break;
            case 'create':
                this.setState({tab_action: 'create',shouldRerender: true,current_tab_content: false});
                break;
            default:
                this.setState({tab_action: 'unknown',shouldRerender: true,current_tab_content: false});
                break;
        }
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _create = async () => {
        const {name,description} = this.state;

        let groups = await axios.post(`${process.env.REACT_APP_API_URL}/group`,{
            name,description
        });

        if(groups && groups.data && groups.data.responseType === 'success')
        {
            this.setState({shouldRerender: true,tab_action: 'owned'});
        }else {
            this.setState({error: groups.data.errorMessage});
        }
    };

    _secondTabAction = (group) => {
        this.setState({current_tab_content: group,id: group.id})
    };

    _delete = async () => {
        let groups = await axios.delete(`${process.env.REACT_APP_API_URL}/group/${this.state.id}`);

        if(groups && groups.data && groups.data.responseType === 'success')
        {
            this.setState({shouldRerender: true,current_tab_content: false});
        }else {
            this.setState({error: groups.data.errorMessage});
        }
    };

    _update = (group) => {
        this.setState({current_tab_content: false,tab_action: 'update',name:group.name,description:group.description})
    };

    render() {
        const {groups,name,description,current_tab_content} = this.state;
        return (
            <Layout>
                <Container>
                    <div>
                        <Nav className={'nav-nav'} tabs>
                            {groups.owner_groups && <NavItem className={'nav-item2'}>
                                <button className={`${this.state.tab_action  === 'owned' ? 'active' : ''} nav-link`} type={'button'} onClick={() => this._tabAction('owned')}>Owned groups</button>
                            </NavItem>}
                            {groups.member_groups && <NavItem className={'nav-item2'}>
                                <button className={`${this.state.tab_action  === 'member' ? 'active' : ''} nav-link`} type={'button'} onClick={() => this._tabAction('member')}>Groups member</button>
                            </NavItem>}
                            <NavItem className={"button-add-nav nav-item2"}>
                                <button className={`${this.state.tab_action  === 'create' ? 'active' : ''} nav-link button-add`} type={'button'} onClick={() => this._tabAction('create')}>Create group</button>
                            </NavItem>
                        </Nav>
                        {this.state.tab_action !== 'create' && <Nav tabs>
                            {this.state.tab_action === 'owned' && groups && groups.owner_groups && groups.owner_groups.map((group, key) => {
                                return <NavItem key={key} className={'nav-item2'}>
                                    <button className={'nav-link'} type={'button'} onClick={() => this._secondTabAction(group)}>{group.name}</button>
                                </NavItem>
                            })}
                            {this.state.tab_action === 'member' && groups.member_groups && groups.member_groups.map((group, key) => {
                                return <NavItem key={key} className={'nav-item2'}>
                                    <button className={'nav-link'} type={'button'} onClick={() => this._secondTabAction(group)}>{group.name}</button>
                                </NavItem>
                            })}
                        </Nav>}
                        {this.state.tab_action === 'create' && <div>
                            <Form>
                                <FormGroup>
                                    <Label for="name">Group name</Label>
                                    <Input className={'input-add'} type="input" name='name' id="name" value={name} onChange={this._onChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Group description</Label>
                                    <Input className={'input-add'} type="textarea" name='description' id="description" value={description} onChange={this._onChange}/>
                                </FormGroup>
                                <Button color="primary" onClick={this._create}>Create</Button>
                            </Form>
                        </div>}
                        {current_tab_content &&
                        <div>
                            <h5>{current_tab_content.name}</h5>
                            <h5>{current_tab_content.description}</h5>
                            <Button color="success" onClick={() => this._update(current_tab_content)}>Update</Button>
                            <Button color="danger" onClick={this._delete}>Delete</Button>
                        </div>
                        }

                    </div>
                </Container>

            </Layout>
        )
    }
}