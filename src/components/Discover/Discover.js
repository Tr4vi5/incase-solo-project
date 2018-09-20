import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Nav from '../Nav/Nav';
import GridList from '../GridList/GridList';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookcases: [] // array of all bookcases from the database 
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getBookcases();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  getBookcases = () => {
    axios({
      method: 'GET',
      url: '/api/bookcases/all'
    }).then((response) => {
      this.setState({
        bookcases: response.data
      })
    }).catch((error) => {
      console.log(error);
    })
  }



  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, {this.props.user.userName}!
          </h1>
          <p>Your ID is: {this.props.user.id}</p>
          <Grid>
            {this.state.bookcases.map((bookcase, index) => {
              return (
                <Grid item xs={6}>
                  <GridList key={index} bookcase={bookcase} />
                </Grid>)
            })}
          </Grid>
          {JSON.stringify(this.state.bookcases)}
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserPage);

