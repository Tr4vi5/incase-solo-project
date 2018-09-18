import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';

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
          <li style={{float: 'right'}}>
            <button onClick={this.logout}>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

export default connect()(Nav);