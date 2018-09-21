import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';



class RequestsListItem extends Component {
    render() {
        console.log(this.props);
    
        return (
            <ListItem style={{width: '100%'}}>
                <ListItemAvatar>
                    <Avatar src={this.props.request.profile_img_src} alt="User" />
                </ListItemAvatar>
                <ListItemText
                    primary={this.props.request.username}
                    secondary={`Requested ${this.props.request.title} on ${this.props.request.date}`}
                />
                
                <button>Confirm Delivery</button>
                <button>Message User</button>
                <button>Deny Request</button>
            </ListItem>
        )
    }
}

export default RequestsListItem;