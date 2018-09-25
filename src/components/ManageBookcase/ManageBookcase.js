import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

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
        defaultLat: '',
        longitude: '',
        defaultLong: ''
      },
      userBooks: [],
      addDialog: false,
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

  // open the add book dialog
  handleAddOpen = () => {
    this.setState({
      addDialog: true,
    })
  }

  // close the add book dialog
  handleAddClose = () => {
    this.setState({
      addDialog: false,
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

  // Delete book from database
  deleteBook = (book) => {
    axios({
      method: 'DELETE',
      url: '/api/books',
    }).then((response) => {
      this.getUserBooks();
    }).catch((error) => {
      console.log('Error in delete book', error);
      alert('Could not delete book, please try again later.');
    })
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
          defaultLat: response.data[0].latitude,
          defaultLong: response.data[0].longitude
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
            <Grid item xs={2}>
              <div style={{ height: '100vh', backgroundColor: '#ccc', padding: '1em' }}>
                <h1>{this.props.user.userName}</h1>
                <Avatar src={this.props.user.profileImage} alt="User" style={{ height: '150px', width: '150px' }} />
                <form onSubmit={this.updateImageFormSubmit}>
                  <TextField
                    id="standard-name"
                    label="Profile Image"
                    placeholder="Image URL"
                    value={this.state.imgToUpdate}
                    onChange={this.handleImgChange}
                    margin="normal"
                    fullWidth
                  />
                  <Button type="submit" variant="contained" size="small" color="primary" >
                    Update Image
                  </Button>
                </form>

                <form onSubmit={this.updateBookcaseLocation}>
                  <TextField
                    id="standard-helperText"
                    label="Latitude"
                    defaultValue={this.state.bookcaseLocation.latitude}
                    helperText={`Current location: ${this.state.bookcaseLocation.defaultLat}`}
                    margin="normal"
                    name="latitude"
                    value={this.state.bookcaseLocation.latitude}
                    onChange={this.handleLocationChange}
                    required
                  />
                  <TextField
                    id="standard-helperText"
                    label="Longitude"
                    defaultValue={this.state.bookcaseLocation.longitude}
                    helperText={`Current location: ${this.state.bookcaseLocation.defaultLong}`}
                    margin="normal"
                    name="longitude"
                    value={this.state.bookcaseLocation.longitude}
                    onChange={this.handleLocationChange}
                    required
                  />
                  <Button type="submit" variant="contained" size="small" color="primary" >
                    Update Location
                  </Button>
                </form>
                <button onClick={this.handleAddOpen}>Add book</button>
              </div>
            </Grid>


            <Grid item xs={10} justifyContent='center'>
              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', height: '100vh', overflow: 'auto', display: 'flex', flexDirection:'row', flexWrap: 'wrap'}}>
                {this.state.userBooks.map((book, index) => {
                  return (
                    <BookCard key={index} book={book} />
                  )
                })}
              </div>
            </Grid>
          </Grid>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
        <Dialog
          open={this.state.addDialog}
        >
          <div style={{ padding: '10px', backgroundColor: '#999' }}>
            <h1>Hello world</h1>
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
            <button onClick={this.handleAddClose}>Close</button>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Bookcase);


{/* <div style={{ height: '400px', backgroundColor: '#333', margin: '5px' }}>
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
</div> */}