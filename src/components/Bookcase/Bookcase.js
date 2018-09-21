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
      bookToAdd: {
        title: '',
        author: '',
        release_year: '',
        genre: '',
        cover_src: '',
        isbn: '',
        synopsis: '',
      },
      bookcaseLocation: {
        latitude: '',
        longitude: '',
      },
      userBooks: [],
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getUserBooks();
    this.getBookcaseLocation();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  // begin handleChange functions
  // set this.state.imgToUpdate to the new image URL from the input on the DOM
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

  // set this.state.newBookcaseLocation values from inputs on the DOM
  handleLocationChange = (e) => {
    this.setState({
      bookcaseLocation: { ...this.state.bookcaseLocation, [e.target.name]: e.target.value }
    })
  }

  //end handleChange functions

  // begin http requests
  // Update current user's profile image
  updateImageFormSubmit = (e) => {
    e.preventDefault();
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
      });
    }).catch((error) => {
      console.log('Error getting bookcase of current user', error);
      alert('Could not get your books, please try again later.');
    });
  };

  // Post new book to current user's bookcase
  addBookToBookcase = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: '/api/books',
      data: this.state.bookToAdd
    }).then((response) => {
      console.log('Back from POST', response.data);
      this.getUserBooks(); // Get user books after new book was added
    }).catch((error) => {
      console.log('Error in new book POST', error);
      alert('Sorry, could not add book, please try again later');
    });
  }

  // get currently logged in 
  getBookcaseLocation = () => {
    axios({
      method: 'GET',
      url: '/api/bookcases/user/location'
    }).then((response) => {
      this.setState({
        bookcaseLocation: {
          latitude: response.data[0].latitude,
          longitude: response.data[0].longitude,
        }
      })
    }).catch((error) => {
      console.log('Error getting bookcase location from server', error);
      alert('Sorry, could not get bookcase location data, please try again later');
    });
  }

  // Update location for current user's bookcase
  updateBookcaseLocation = (e) => {
    e.preventDefault();
    axios({
      method: 'PUT',
      url: '/api/bookcases/user/location',
      data: this.state.bookcaseLocation
    }).then((response) => {
      console.log('Back from PUT', response);

    }).catch((error) => {
      console.log('Error updating bookcase location', error);
      alert('Could not update bookcase location, please try again later');
    });
  }

  //end http requests


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
              <div>
                <form onSubmit={this.addBookToBookcase}>
                  <input type="text" name="title" placeholder="Title" value={this.state.bookToAdd.title} onChange={this.handleBookToAddChange} />
                  <input type="text" name="author" placeholder="Author" value={this.state.bookToAdd.author} onChange={this.handleBookToAddChange} />
                  <input type="text" name="release_year" placeholder="Release Year" value={this.state.bookToAdd.release_year} onChange={this.handleBookToAddChange} />
                  <input type="text" name="genre" placeholder="Genre" value={this.state.bookToAdd.genre} onChange={this.handleBookToAddChange} />
                  <input type="text" name="cover_src" placeholder="Cover Image URL" value={this.state.bookToAdd.cover_src} onChange={this.handleBookToAddChange} />
                  <input type="text" name="isbn" placeholder="ISBN (13)" value={this.state.bookToAdd.isbn} onChange={this.handleBookToAddChange} />
                  <textarea cols="40" rows="6" name="synopsis" placeholder="Synopsis" value={this.state.bookToAdd.synopsis} onChange={this.handleBookToAddChange} />
                  <input type="Submit" />
                </form>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <form onSubmit={this.updateBookcaseLocation}>
                  <input type="text" name="latitude" placeholder="Latitude" value={this.state.bookcaseLocation.latitude} onChange={this.handleLocationChange} />
                  <input type="text" name="longitude" placeholder="Longitude" value={this.state.bookcaseLocation.longitude} onChange={this.handleLocationChange} />
                  <input type="Submit" />
                </form>
              </div>
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

export default connect(mapStateToProps)(Bookcase);