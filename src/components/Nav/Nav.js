import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';
import Button from '@material-ui/core/Button';

class Nav extends Component {

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    return (
      <div>
        <ul className={'navbar'}>
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
              Requests
            </Link>
          </li>
          <li style={{ float: 'right' }}>
            <Button variant="outlined" color="primary" style={{ color: 'white', margin: '5px'}} onClick={this.logout}>
              Log Out
            </Button>
          </li>
        </ul>
      </div>
    )
  }
}

export default connect()(Nav);