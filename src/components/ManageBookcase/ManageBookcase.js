import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';

import Nav from '../Nav/Nav';
import ManageMap from './ManageMap/ManageMap';
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
      bookToEdit: {
        title: '',
        author: '',
        release_year: '',
        genre: '',
        cover_src: '',
        isbn: '',
        synopsis: '',
      },
      bookcaseLocation: '',
      userBooks: [],
      addDialog: false,
      bookOpen: false,
      editBook: false,
      currentBook: {},
      currentBookcaseLocation: {}
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
    this.getBookcaseLocation();
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

  // set this.state.bookToEdit values from inputs on the DOM
  handleBookToEditChange = (e) => {
    this.setState({
      bookToEdit: { ...this.state.bookToEdit, [e.target.name]: e.target.value }
    })
  }

  // set this.state.newBookcaseLocation values from inputs on the DOM
  handleLocationChange = (e) => {
    this.setState({
      bookcaseLocation: e.target.value
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

  // open book dialog
  handleBookOpen = (book) => {
    this.setState({
      bookOpen: true,
      currentBook: book
    })
  }

  // close book dialog
  handleBookClose = () => {
    this.setState({
      bookOpen: false,
      currentBook: {}
    })
  }
  // render edit fields in book dialog
  handleEditOpen = () => {
    this.setState({
      editBook: true,
      bookToEdit: this.state.currentBook
    });
  }

  // render display fields in book dialog
  handleEditClose = () => {
    this.setState({
      editBook: false
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
      this.handleAddClose();
      this.getUserBooks();
    }).catch((error) => {
      console.log('Error in new book POST', error);
      alert('Sorry, could not add book, please try again later');
    });
  }

  // edit book information
  editBook = (e) => {
    e.preventDefault();
    alert(`Are you sure that you want to edit ${this.state.currentBook.title}?`);
    axios({
      method: 'PUT',
      url: `/api/books/edit`,
      data: this.state.bookToEdit
    }).then((response) => {
      console.log('Success in edit book', response.data);
      this.getUserBooks();
      this.handleEditClose();
      this.handleBookClose();
    }).catch((error) => {
      console.log('Error in edit book', error);
      alert('Error editing book, please try again later');
    });
  }

  // Delete book from database
  deleteBook = () => {
    alert(`Are you sure that you want to delete ${this.state.currentBook.title}?`);
    axios({
      method: 'GET',
      url: `/api/requests/${this.state.currentBook.id}`
    }).then((response) => {
      if (response.data.length) {
        alert('Please resolve all requests before deleting this book');
      } else {
        axios({
          method: 'DELETE',
          url: `/api/books/delete/${this.state.currentBook.id}`,
        }).then((response) => {
          this.getUserBooks();
          this.setState({
            currentBook: {},
          })
          this.handleBookClose();
        }).catch((error) => {
          console.log('Error in delete book', error);
          alert('Could not delete book, please try again later.');
        });
      }
    }).catch((error) => {
      console.log('Error getting requests', error);
      alert('Could not delete book, please try again later.');
    });
  }

  // get currently logged in user's bookcase location
  getBookcaseLocation = () => {
    axios({
      method: 'GET',
      url: '/api/bookcases/user/location'
    }).then((response) => {
      this.setState({
        currentBookcaseLocation: {
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
  callGeocode = (e) => {
    e.preventDefault();
    axios({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?',
      params: { address: this.state.bookcaseLocation, key: 'AIzaSyAWyNBkFPJCWM5mQNMDrIkzmFvdiXKzjRA' }
    }).then((response) => {
      console.log(response.data.results[0].geometry.location);
      this.updateBookcaseLocation(response.data.results[0].geometry.location);
      this.setState({
        bookcaseLocation: ''
      })
      alert('Bookcase location updated');
    }).catch((error) => {
      console.log('Error calling geocode', error);
      alert('Sorry, could not find location, please navigate manually');
    });
  }
  // update database with geocoded location
  updateBookcaseLocation = (locationFromGeocode) => {
    axios({
      method: 'PUT',
      url: '/api/bookcases/user/location',
      data: locationFromGeocode
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
    let bookDialogContent = null;

    if (this.state.editBook === true) {
      bookDialogContent = (
        <div style={{ padding: '10px', backgroundColor: 'white', border: '10px solid white' }}>
          <h1>Edit book</h1>
          <form onSubmit={this.editBook}>
            <TextField
              id="standard-name"
              name="title"
              label="Title"
              placeholder="Title"
              value={this.state.bookToEdit.title}
              onChange={this.handleBookToEditChange}
              margin="normal"
              fullWidth
            />
            <TextField
              id="standard-name"
              name="author"
              label="Author"
              placeholder="Author"
              value={this.state.bookToEdit.author}
              onChange={this.handleBookToEditChange}
              margin="normal"
              fullWidth
            />
            <TextField
              id="standard-name"
              name="release_year"
              label="Publication Date"
              placeholder="Publication Date"
              value={this.state.bookToEdit.release_year}
              onChange={this.handleBookToEditChange}
              margin="normal"
              fullWidth
            />
            <TextField
              id="standard-name"
              name="genre"
              label="Genre"
              placeholder="Genre"
              value={this.state.bookToEdit.genre}
              onChange={this.handleBookToEditChange}
              margin="normal"
              fullWidth
            />
            <TextField
              id="standard-name"
              name="cover_src"
              label="Cover Image URL"
              placeholder="Cover Image URL"
              value={this.state.bookToEdit.cover_src}
              onChange={this.handleBookToEditChange}
              margin="normal"
              fullWidth
            />
            <TextField
              id="standard-name"
              name="isbn"
              label="ISBN(13)"
              placeholder="ISBN(13)"
              value={this.state.bookToEdit.isbn}
              onChange={this.handleBookToEditChange}
              margin="normal"
              fullWidth
            />
            <TextField
              id="standard-name"
              name="synopsis"
              label="Synopsis"
              placeholder="Synopsis"
              value={this.state.bookToEdit.synopsis}
              onChange={this.handleBookToEditChange}
              margin="normal"
              fullWidth
              multiline
              rows="4"
            />
            <Button style={{ margin: '5px', border: '2px solid #2903A4' }} type="submit" variant="contained" color="primary">
              Confirm Changes
            </Button>
            <Button style={{ margin: '5px', border: '2px solid #444' }} variant="contained" onClick={this.handleEditClose}>
              Cancel
            </Button>
          </form>
        </div>
      );
    } else {
      bookDialogContent = (
        <div style={{ padding: '10px', backgroundColor: 'white' }}>
          <img src={this.state.currentBook.cover_src} alt='Cover' style={{ height: '200px', width: '150px', float: 'right' }} />
          <h2>{this.state.currentBook.title}</h2>
          <h4>{this.state.currentBook.author}</h4>
          <p>Published: {this.state.currentBook.release_year}</p>
          <p>Genre: {this.state.currentBook.genre}</p>
          <p>{this.state.currentBook.synopsis}</p>
          <p>ISBN-13: {this.state.currentBook.isbn}</p>
          <Button style={{ margin: '5px', border: '2px solid #2903A4' }} type="submit" variant="contained" color="primary" onClick={this.handleEditOpen}>
            Edit Book
          </Button>
          <Button style={{ margin: '5px', border: '2px solid darkred' }} variant="contained" color="secondary" onClick={this.deleteBook}>
            Delete Book
            </Button>
          <Button style={{ margin: '5px', border: '2px solid #444' }} variant="contained" onClick={this.handleBookClose}>
            Cancel
          </Button>
        </div>
      );
    }

    if (this.props.user.userName) {
      content = (
        <div>
          <Grid container >
            <Grid item xs={2}>
              <div style={{ height: '53vh', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '1em' }}>
                <h1 style={{ marginTop: 0 }}>{this.props.user.userName}</h1>
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

                <form onSubmit={this.callGeocode}>
                  <TextField
                    id="standard-helperText"
                    label="Address"
                    margin="normal"
                    name="address"
                    value={this.state.bookcaseLocation}
                    onChange={this.handleLocationChange}
                    fullWidth
                    required
                  />
                  <Button type="submit" variant="contained" size="small" color="primary" >
                    Update Location
                  </Button>
                </form>

              </div>
              <div className="miniMap" style={{ height: '40vh', backgroundColor: 'white', width: '100%' }}>
                  <ManageMap currentBookcaseLocation={this.state.currentBookcaseLocation} />
              </div>

            </Grid>


            <Grid item xs={10} >
              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', height: '93vh', overflow: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {this.state.userBooks.map((book, index) => {
                  return (
                    <BookCard key={index} book={book} handleBookOpen={this.handleBookOpen} />
                  )
                })}
                <Button variant="fab" color="primary" aria-label="Add" style={{ position: 'fixed', bottom: 20, right: 40 }} onClick={this.handleAddOpen}>
                  <AddIcon />
                </Button>
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
          <div style={{ padding: '10px', backgroundColor: 'white', border: '10px solid white' }}>
            <h1>Add book</h1>
            <form onSubmit={this.addBookToBookcase}>
              <TextField
                id="standard-name"
                name="title"
                label="Title"
                placeholder="Title"
                value={this.state.bookToAdd.title}
                onChange={this.handleBookToAddChange}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-name"
                name="author"
                label="Author"
                placeholder="Author"
                value={this.state.bookToAdd.author}
                onChange={this.handleBookToAddChange}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-name"
                name="release_year"
                label="Publication Date"
                placeholder="Publication Date"
                value={this.state.bookToAdd.release_year}
                onChange={this.handleBookToAddChange}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-name"
                name="genre"
                label="Genre"
                placeholder="Genre"
                value={this.state.bookToAdd.genre}
                onChange={this.handleBookToAddChange}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-name"
                name="cover_src"
                label="Cover Image URL"
                placeholder="Cover Image URL"
                value={this.state.bookToAdd.cover_src}
                onChange={this.handleBookToAddChange}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-name"
                name="isbn"
                label="ISBN(13)"
                placeholder="ISBN(13)"
                value={this.state.bookToAdd.isbn}
                onChange={this.handleBookToAddChange}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-name"
                name="synopsis"
                label="Synopsis"
                placeholder="Synopsis"
                value={this.state.bookToAdd.synopsis}
                onChange={this.handleBookToAddChange}
                margin="normal"
                fullWidth
                multiline
                rows="4"
              />
              <Button type="submit" variant="contained" color="primary" style={{ margin: '5px', border: '2px solid #2903A4' }}>
                Add Book
              </Button>
              <Button style={{ margin: '5px', border: '2px solid #444' }} variant="contained" onClick={this.handleAddClose}>
                Cancel
               </Button>
            </form>
          </div>
        </Dialog>
        <Dialog
          open={this.state.bookOpen}
        >
          {bookDialogContent}
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Bookcase);