import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';



class RequestsListItem extends Component {
    render() {
        return (
            <ListItem style={{width: '100%'}}>
                <ListItemAvatar>
                    <Avatar>
                        <img src="#" alt="User" />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Username"
                    secondary="Is requesting book title"
                />
                <button>Confirm Delivery</button>
                <button>Message User</button>
                <button>Deny Request</button>
            </ListItem>
        )
    }
}

export default RequestsListItem;