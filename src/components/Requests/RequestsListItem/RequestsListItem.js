import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToProps = state => ({
    user: state.user,
});

class RequestsListItem extends Component {

    handleDenyClick = () => {
        alert('Are you sure you want to deny this request?');
        this.props.denyRequest(this.props.request);
    }

    handleCancelClick = () => {
        alert('Are you sure you want to cancel this request?');
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
                secondary={`Requested ${this.props.request.title} ${moment(this.props.request.date).calendar().toLowerCase()}`}
            />;
            listItemInteractions = <div>
                <button onClick={this.handleMessageClick}>Message User</button>
                <IconButton aria-label="Comments">
                    <CommentIcon onClick={this.handleMessageClick}/>
                </IconButton>
                <button onClick={this.handleCancelClick}>Cancel Request</button>
                <IconButton aria-label="Delete">
                    <DeleteIcon onClick={this.handleCancelClick}/>
                </IconButton>
            </div>;
        } else { // incoming request list item return
            listItemUsername = <ListItemText
                primary={this.props.request.username}
                secondary={`Requested ${this.props.request.title} ${moment(this.props.request.date).calendar().toLowerCase()}`}
            />;
            listItemInteractions = <div>
                <button onClick={this.handleConfirmClick}>Confirm Delivery</button>
                <button onClick={this.handleMessageClick}>Message User</button>
                <button onClick={this.handleDenyClick}>Deny Request</button>
            </div>;

        }


        return (
            <ListItem style={{ width: '100%', backgroundColor: '#ccc'}}>
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