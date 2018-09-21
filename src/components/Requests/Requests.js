import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import axios from 'axios';

import Nav from '../Nav/Nav';
import RequestsListItem from './RequestsList/RequestsList';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
});

class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            currentRequest: {},
            currentMessages: [],
        }
    }
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    // get current user's requests from the database
    getRequests = () => {
        axios({
            method: 'GET',
            url: '/api/requests'
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log('Error getting requests from server', error);
            alert('Could not get requests from server, please try again later');
        });
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <Grid container>
                        <Grid item xs={6}>
                            <div>Requests
                                <List>
                                    <RequestsListItem />
                                </List>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div>Messages</div>
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
