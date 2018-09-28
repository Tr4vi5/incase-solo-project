import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

const mapStateToProps = state => ({
  user: state.user,
});

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadRequests: 0
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  // get the count of active requests
  getUnreadRequests = () => {
    axios({
      method: 'GET',
      url: '/api/requests/user/unread'
    }).then((response) => {
      this.setState({
        unreadRequests: response.data
      }).catch((error) => {
        console.log('Error getting requests from server', error);
      });
    });
  }

  render() {
    let requestsItem = null;

    if(this.state.unreadRequests > 0){
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
            <h1 style={{ color: 'white', margin: '7px 21px', marginTop: '10px' }}>inCase</h1>
          </li>
          <li>
            <Link to="/discover">
              Discover
            </Link>
          </li>
          <li>
            <Link to="/bookcase">
              Manage Bookcase
            </Link>
          </li>
          <li>
            <Link to="/requests">
              {requestsItem}
            </Link>
          </li>

          <li style={{ float: 'right' }}>
            <span style={{ color: 'white', fontSize: '12px' }}>Welcome, {this.props.user.userName}</span>
            <Button variant="outlined" color="primary" style={{ color: 'white', margin: '7px', border: '2px solid #2903A4' }} onClick={this.logout}>
              Log Out
            </Button>
          </li>
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Nav);