import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import axios from 'axios';

import Nav from '../Nav/Nav';
import RequestsListItem from './RequestsListItem/RequestsListItem';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
});

class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incomingRequests: [],
            outgoingRequests: [],
            currentRequest: {},
            currentMessages: [],
        }
    }
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getIncomingRequests();
        this.getOutgoingRequests();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    // get current user's incoming requests from the database
    getIncomingRequests = () => {
        axios({
            method: 'GET',
            url: '/api/requests/user/incoming'
        }).then((response) => {
            console.log(response.data);
            this.setState({
                incomingRequests: response.data
            });
        }).catch((error) => {
            console.log('Error getting requests from server', error);
            alert('Could not get requests from server, please try again later');
        });
    }

    // get current user's outgoing request from the database
    getOutgoingRequests = () => {
        axios({
            method: 'GET',
            url: '/api/requests/user/outgoing'
        }).then((response) => {
            console.log(response.data);
            this.setState({
                outgoingRequests: response.data
            });
        }).catch((error) => {
            console.log('Error getting requests from server', error);
            alert('Could not get requests from server, please try again later');
        });
    }

    // deny request
    denyRequest = (request) => {
        axios({
            method: 'PUT',
            url: '/api/requests/deny',
            data: request
        }).then((response) => {
            console.log('Back from database with:', response.data);
            this.getIncomingRequests();
            this.getOutgoingRequests();
        }).catch((error) => {
            console.log('Error denying request', error);
            alert('Sorry, could not deny request, please try again later');
        });
    }

    // confirm request
    confirmRequest = (request) => {
        console.log(request);
        axios({
            method: 'PUT',
            url: '/api/requests/confirm',
            data: request
        }).then((response) => {
            console.log('Back from database with:', response.data);
            this.getIncomingRequests();
            this.getOutgoingRequests();
        }).catch((error) => {
            console.log('Error denying request', error);
            alert('Sorry, could not deny request, please try again later');
        });
    }

    getCurrentMessages = (request) => {
        console.log(request);
        this.setState({
            currentRequest: request
        });
    }


    render() {
        let content = null;
        let messagesContent = null;

        if (this.state.currentRequest){
            messagesContent = (

            )
        } else {
            messagesContent = (
                
            )
        }



        if (this.props.user.userName) {
            content = (
                <div style={{ minHeight: '90vh' }}>
                    <Grid container>
                        <Grid item xs={6}>
                            <div style={{ height: '45vh', overflow: 'auto' }}>
                                <h3>Incoming Requests</h3>
                                <List>
                                    {this.state.incomingRequests.map((request, i) => {
                                        return (
                                            <RequestsListItem
                                                key={i}
                                                request={request}
                                                denyRequest={this.denyRequest}
                                                confirmRequest={this.confirmRequest}
                                                getCurrentMessages={this.getCurrentMessages}
                                            />
                                        )
                                    })}
                                </List>
                            </div>
                            <div style={{ height: '45vh', overflow: 'auto' }}>
                                <h3>Outgoing Requests</h3>
                                <List>
                                    {this.state.outgoingRequests.map((request, i) => {
                                        return (
                                            <RequestsListItem
                                                key={i}
                                                request={request}
                                                denyRequest={this.denyRequest}
                                                getCurrentMessages={this.getCurrentMessages}
                                            />
                                        )
                                    })}
                                </List>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{ borderLeft: '2px solid black', height: '90vh' }}>
                                {messagesContent}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            );
        }

        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Requests);
