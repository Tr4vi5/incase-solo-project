import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Dialog from '@material-ui/core/Dialog';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const mapStateToProps = state => ({
  user: state.user,
});

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadRequests: 0,
      showTechDialog: false
    }
  }

  componentDidMount() {
    this.getUnreadRequests();
  }

  componentDidUpdate() {
    this.getUnreadRequests();
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  showTech = () => {
    this.setState({
      showTechDialog: true
    });
  }

  hideTech = () => {
    this.setState({
      showTechDialog: false
    });
  }

  // get the count of active requests
  getUnreadRequests = () => {
    axios({
      method: 'GET',
      url: '/api/requests/user/unread'
    }).then((response) => {
      this.setState({
        unreadRequests: response.data[0].count
      })
    }).catch((error) => {
      console.log('Error getting requests from server', error);
    });
  }

  render() {
    let requestsItem = null;

    if (this.state.unreadRequests > 0) {
      requestsItem = (
        <Badge badgeContent={this.state.unreadRequests} color="primary">Requests&nbsp;</Badge>
      )
    } else {
      requestsItem = (
        'Requests'
      )
    }
    return (
      <div>
        <ul className={'navbar'}>
          <li>
            <img src="/images/logo.png" height="50px" onClick={this.showTech} />
          </li>
          <li>
            <h1 style={{ color: 'white', margin: '7px 21px', marginTop: '10px' }}>inCase</h1>
          </li>
          <li style={{ marginLeft: 17 }}>
            <NavLink to="/discover" activeClassName="activeNav">
              Discover
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookcase" activeClassName="activeNav">
              Manage Bookcase
            </NavLink>
          </li>
          <li>
            <NavLink to="/requests" activeClassName="activeNav">
              {requestsItem}
            </NavLink>
          </li>

          <li style={{ float: 'right' }}>
            <span style={{ color: 'white', fontSize: '12px' }}>Welcome, {this.props.user.userName}</span>
            <Button variant="outlined" color="primary" style={{ color: 'white', margin: '7px', border: '2px solid rgb(59, 75, 154)' }} onClick={this.logout}>
              Log Out
            </Button>
          </li>
        </ul>
        <Dialog open={this.state.showTechDialog}>
          <div style={{ margin: '10px', fontSize: '20px' }}>
            <List>
              <ListItem>
                <img src="/images/techlogos/reactlogo.png" height="50" width="50" />
                <ListItemText
                  primary="React"
                />
              </ListItem>
              <ListItem>
                <img src="/images/techlogos/reduxlogo.png" height="50" width="50" />
                <ListItemText
                  primary="Redux"
                />
              </ListItem>
              <ListItem>
                <img src="/images/techlogos/sagaslogo.png" height="30" width="50" />
                <ListItemText
                  primary="Sagas"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src="/images/techlogos/expresslogo.png"/>
                </ListItemAvatar>
                <ListItemText
                  primary="Express.js"
                />
              </ListItem>
              <ListItem>
                <img src="/images/techlogos/nodelogo.png" height="50" width="50" />
                <ListItemText
                  primary="Node.js"
                />
              </ListItem>
              <ListItem>
                <img src="/images/techlogos/pglogo.png" height="50" width="50" />
                <ListItemText
                  primary="PostgreSQL"
                />
              </ListItem>
              <ListItem>
                <img src="/images/techlogos/gmaplogo.png" height="50" width="50" />
                <ListItemText
                  primary="Google Maps API"
                />
              </ListItem>
              <ListItem>
                <img src="/images/techlogos/geocodinglogo.png" height="50" width="50" />
                <ListItemText
                  primary="Google Geocoding API"
                />
              </ListItem>
              <ListItem>
                <img src="/images/techlogos/githublogo.png" height="50" width="50" />
                <ListItemText
                  primary="Git / GitHub"
                />
              </ListItem>
              <ListItem>
                <img src="/images/techlogos/vaultboy.png" height="50" width="50" />
                <ListItemText
                  primary="Code comments"
                />
              </ListItem>
            </List>
            <Button onClick={this.hideTech}>Close</Button>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Nav);