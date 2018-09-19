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
      bookToAdd: {},
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

  // set this.state.imgToUpdate to the new image URL
  handleImgChange = (e) => {
    this.setState({
      imgToUpdate: e.target.value,
    })
  }

  // set this.state.bookToAdd values from inputs on the DOM
  handleBookToAddChange = (e) => {
    this.setState({
      bookToAdd: { ...this.state.bookToAdd, [e.target.name]: e.target.value }
    })
  }

  // Update current user's profile image
  updateImageFormSubmit = () => {
    axios({
      method: 'PUT',
      url: '/api/user/register',
      data: { imgToUpdate: this.state.imgToUpdate }
    }).then((response) => {
      this.props.dispatch({ type: USER_ACTIONS.FETCH_USER }); // grab the new user information from redux
    }).catch((error) => {
      console.log('Error updating profile picture', error);
      alert('Could not update profile picture, please try again later.');
    });
  }

  // Get all books for the currently logged in user
  getUserBooks = () => {
    axios({
      method: 'GET',
      url: '/api/bookcases/user'
    }).then((response) => {
      this.setState({
        userBooks: response.data,
      })
    }).catch((error) => {
      console.log('Error getting bookcase of current user', error);
      alert('Could not get your books, please try again later.');
    })
  };

  // Post new book to current user's bookcase
  addBookToBookcase = () => {
    axios({
      method: 'POST',
      url: '/api/books',
      data: this.state.bookToAdd
    }).then((response)=>{
      console.log('Back from POST', response.data);
      this.getUserBooks(); // Get user books after new book was added
    }).catch((error)=>{
      console.log('Error in new book POST', error);
      alert('Could not add book, please try again later');
    })
  }


  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <Grid container >
            <Grid item xs={4}>
              <div>
                <img src={this.props.user.profileImage} alt="User" style={{ height: '150px', width: '150px' }} />
                <form onSubmit={this.updateImageFormSubmit}>
                  <input type="text" placeholder="Image URL" value={this.state.imgToUpdate} onChange={this.handleImgChange} />
                  <input type="submit" value="Update Image" />
                </form>
              </div>
            </Grid>
            <Grid item xs={4}>
              <form>
                <input type="text" name="title" placeholder="Title" value={this.state.bookToAdd.title} onChange={this.handleBookToAddChange} />
                <input type="text" name="author" placeholder="Author" value={this.state.bookToAdd.author} onChange={this.handleBookToAddChange} />
                <input type="text" name="release_year" placeholder="Release Year" value={this.state.bookToAdd.release_year} onChange={this.handleBookToAddChange} />
                <input type="text" name="genre" placeholder="Genre" value={this.state.bookToAdd.genre} onChange={this.handleBookToAddChange} />
                <input type="text" name="cover_src" placeholder="Cover Image URL" value={this.state.bookToAdd.cover_src} onChange={this.handleBookToAddChange} />
                <input type="text" name="isbn" placeholder="ISBN (13)" value={this.state.bookToAdd.isbn} onChange={this.handleBookToAddChange} />
                <textarea cols="40" rows="6" name="synopsis" placeholder="Synopsis" value={this.state.bookToAdd.synopsis} onChange={this.handleBookToAddChange} />
                <input type="Submit" />
              </form>
            </Grid>
            <Grid item xs={4}>
              <form>
                <input type="text" placeholder="Latitude" />
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
