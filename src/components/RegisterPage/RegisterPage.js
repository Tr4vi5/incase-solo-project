import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
    } else {
      const body = {
        username: this.state.username,
        password: this.state.password,
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div className="login">
        {this.renderAlert()}
        <form onSubmit={this.registerUser}>
          <h1 style={{ marginBottom: '0px' }}>Register User</h1>
          <img src="/images/logo.png" height="150px" />
          <div>
              <TextField
               
                label="Username"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
          </div>
          <div>
              <TextField
                type="password"
                label="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
          </div>
          <div>
            <Button color="primary" type="submit" name="submit" style={{ margin: 5 }}>
              Register
            </Button>
            <Button color="primary" style={{ margin: 5 }} onClick={()=> this.props.history.push('home')}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterPage;

