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
            currentRequest: null,
            newMessage: '',
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

    //handleChange functions
    handleNewMessageChange = (e) => {
        this.setState({
            newMessage: e.target.value
        })
    }

    // http requests
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

    // get messages for current request
    getCurrentMessages = (request) => {
        console.log(request);
        this.setState({
            currentRequest: request
        });
        axios({
            method: 'GET',
            url: `/api/requests/messages/${request.id}`
        }).then((response) => {
            this.setState({
                currentMessages: response.data
            });
        }).catch((error)=>{
            console.log('Error getting current messages', error);
            alert('Sorry, could not get messages for that request, please try again later.');
        });
    }

    // post message for current request
    newMessageSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.newMessage, this.state.currentRequest);
        let messageToPost = {
            message: this.state.newMessage,
            request: this.state.currentRequest
        }
        axios({
            method: 'POST',
            url: 'api/requests/messages',
            data: messageToPost
        }).then((response) => {
            console.log('Success posting new message', response.data);
            this.setState({
                newMessage: ''
            });
        }).catch((error) => {
            console.log('Error in newMessageSubmit', error);
            alert('Sorry, could not post new message, please try again later');
        });
    }


    render() {
        let content = null;
        let messagesContent = null;

        if (this.state.currentRequest) {
            messagesContent = (
                <div>
                    <h3>Messages:</h3>
                    {JSON.stringify(this.state.currentMessages)}
                    <form onSubmit={this.newMessageSubmit}>
                        <input type="text" placeholder="Message" value={this.state.newMessage} onChange={this.handleNewMessageChange} />
                        <input type="submit" />
                    </form>
                </div>
            )
        } else {
            messagesContent = (
                <div>
                    <h3>Messages:</h3>
                    <form>
                        <input type="text" placeholder="Message" value={this.state.newMessage} onChange={this.handleNewMessageChange} />
                        <input type="submit" disabled />
                    </form>
                </div>
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
