import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  user: state.user,
  bookcases: state.bookcases
});

class Nav extends Component {

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    return (
      <div>
        <ul className={'navbar'}>
          <li>
            <h1 style={{color: 'white', margin: '7px 21px', marginTop: '10px'}}>inCase</h1>
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
              Requests
            </Link>
          </li>
          
          <li style={{ float: 'right' }}>
            <span style={{ color: 'white', fontSize: '12px' }}>Welcome, {this.props.user.userName}</span>
            <Button variant="outlined" color="primary" style={{ color: 'white', margin: '7px', border: '2px solid #2903A4'}} onClick={this.logout}>
              Log Out
            </Button>
          </li>
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Nav);