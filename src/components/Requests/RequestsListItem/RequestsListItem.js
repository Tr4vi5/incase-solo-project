import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.user,
});

class RequestsListItem extends Component {

    handleDenyClick = () => {
        alert('Are you sure you want to deny this request?');
        this.props.denyRequest(this.props.request);
    }

    handleConfirmClick = () => {
        alert('Are you sure you want to confirm this request?');
        this.props.confirmRequest(this.props.request);
    }

    handleMessageClick = () => {
        this.props.getCurrentMessages(this.props.request);
    }

    render() {
        console.log(this.props);
        let listItemUsername = null;
        let listItemInteractions = null;

        if (this.props.user.id === this.props.request.from_users_id) { // outgoing request list item return
            listItemUsername = <ListItemText
                primary="You"
                secondary={`Requested ${this.props.request.title} on ${this.props.request.date}`}
            />;
            listItemInteractions = <div>
                <button onClick={this.handleMessageClick}>Message User</button>
                <button onClick={this.handleDenyClick}>Cancel Request</button>
            </div>;
        } else { // incoming request list item return
            listItemUsername = <ListItemText
                primary={this.props.request.username}
                secondary={`Requested ${this.props.request.title} on ${this.props.request.date}`}
            />;
            listItemInteractions = <div>
                <button onClick={this.handleConfirmClick}>Confirm Delivery</button>
                <button onClick={this.handleMessageClick}>Message User</button>
                <button onClick={this.handleDenyClick}>Deny Request</button>
            </div>;

        }


        return (
            <ListItem style={{ width: '100%' }}>
                <ListItemAvatar>
                    <Avatar src={this.props.request.profile_img_src} alt="User" />
                </ListItemAvatar>
                {listItemUsername}
                {listItemInteractions}
            </ListItem>
        )
    }
}

export default connect(mapStateToProps)(RequestsListItem);