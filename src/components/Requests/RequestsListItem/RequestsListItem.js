import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    user: state.user,
});

class RequestsListItem extends Component {

    handleDenyClick = () => {
        alert('Are you sure you want to deny this request?');
        this.props.denyRequest(this.props.request);
    }

    render() {
        console.log(this.props);
        let listItemUsername = null;
        let listItemInteractions = null;


        if (this.props.user.id === this.props.request.from_users_id){
            listItemUsername = <ListItemText
                primary="You"
                secondary={`Requested ${this.props.request.title} on ${this.props.request.date}`}
            />;
            listItemInteractions = <div>
                <button>Message User</button>
                <button>Cancel Request</button>
            </div>
        } else {
            listItemUsername = <ListItemText
                primary={this.props.request.username}
                secondary={`Requested ${this.props.request.title} on ${this.props.request.date}`}
            />;
            listItemInteractions = <div>
                <button>Confirm Delivery</button>
                <button>Message User</button>
                <button onClick={this.handleDenyClick}>Deny Request</button>
            </div>
            
        } 
        

        return (
            <ListItem style={{width: '100%'}}>
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