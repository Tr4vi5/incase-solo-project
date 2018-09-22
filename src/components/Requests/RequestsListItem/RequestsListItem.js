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
    

    render() {
        console.log(this.props);
        let listUsername = null;

        if (this.props.user.id === this.props.request.from_users_id){
            listUsername = <ListItemText
                primary="You"
                secondary={`Requested ${this.props.request.title} on ${this.props.request.date}`}
            />;
        } else {
            listUsername = <ListItemText
                primary={this.props.request.username}
                secondary={`Requested ${this.props.request.title} on ${this.props.request.date}`}
            />;
            
        } 
        

        return (
            <ListItem style={{width: '100%'}}>
                <ListItemAvatar>
                    <Avatar src={this.props.request.profile_img_src} alt="User" />
                </ListItemAvatar>
               {listUsername}
                
                <button>Confirm Delivery</button>
                <button>Message User</button>
                <button>Deny Request</button>
            </ListItem>
        )
    }
}

export default connect(mapStateToProps)(RequestsListItem);