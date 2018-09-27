import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';
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
                
                <Button aria-label="Messages" onClick={this.handleMessageClick}>
                    <CommentIcon />
                </Button>
                <Button aria-label="Delete" onClick={this.handleCancelClick}>
                    <DeleteIcon />
                </Button>
            </div>;
        } else { // incoming request list item return
            listItemUsername = <ListItemText
                primary={this.props.request.username}
                secondary={`Requested ${this.props.request.title} ${moment(this.props.request.date).calendar().toLowerCase()}`}
            />;
            listItemInteractions = <div>
                <Button>
                    <ShareIcon aria-label="Transfer" onClick={this.handleConfirmClick}/>
                </Button>
                <Button aria-label="Messages" onClick={this.handleMessageClick}>
                    <CommentIcon />
                </Button>
                <Button aria-label="Delete" onClick={this.handleDenyClick}>
                    <DeleteIcon />
                </Button>
            </div>;

        }


        return (
            <ListItem style={{ width: '100%', backgroundColor: '#f4f4f4'}}>
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