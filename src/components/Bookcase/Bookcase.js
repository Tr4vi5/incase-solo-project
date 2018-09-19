import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import Nav from '../Nav/Nav';
import BookCard from './BookCard/BookCard';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
});

class Bookcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgToUpdate: '',
      userBooks: [],
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getUserBooks();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  //set this.state.imgToUpdate to the new image URL
  handleImgChange = (e) => {
    this.setState({
      imgToUpdate: e.target.value,
    })
  }

  updateImageFormSubmit = () => {
    console.log(this.state.imgToUpdate)
    
    axios({
      method: 'PUT',
      url: '/api/user/register',
      data: {imgToUpdate: this.state.imgToUpdate}
    }).then((response)=>{
      console.log(response.data);
      this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }).catch((error)=>{
      console.log('Error updating profile picture', error);
      alert('Could not update profile picture, please try again later.');
    });
  }

  getUserBooks = () => {
    axios({
      method: 'GET',
      url: '/api/bookcases/user'
    }).then((response) => {
      console.log(response.data);
      this.setState({
        userBooks: response.data,
      })
    }).catch((error) => {
      console.log('Error getting bookcase of current user', error);
    })
  };



  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <Grid container >
            <Grid item xs={4}>
              <div>
                <img src={this.props.user.profileImage} alt="User" style={{height: '150px', width:'150px'}}/>
                <form onSubmit={this.updateImageFormSubmit}>
                  <input type="text" placeholder="Image URL" value={this.state.imgToUpdate} onChange={this.handleImgChange} />
                  <input type="submit" value="Update Image" />
                </form>
              </div>
            </Grid>
            <Grid item xs={4}>
              <form>
                <input type="text" placeholder="Title" />
                <input type="text" placeholder="Author" />
                <input type="text" placeholder="Release Year" />
                <input type="text" placeholder="Genre" />
                <input type="text" placeholder="Cover Image URL" />
                <input type="text" placeholder="ISBN (13)" />
                <textarea cols="40" rows="6" placeholder="Synopsis" />
                <input type="Submit" />
              </form>
            </Grid>
            <Grid item xs={4}>
              <form>
                <input type="text" placeholder="Latitude"/>
                <input type="text" placeholder="Longitude" />
                <input type="Submit" />
              </form>
            </Grid>
          </Grid>
          <Grid container spacing={24} justify="center">
            {this.state.userBooks.map((book, index) => {
              return (
                <BookCard key={index} book={book} />
              )
            })}
          </Grid>
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

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Bookcase);
