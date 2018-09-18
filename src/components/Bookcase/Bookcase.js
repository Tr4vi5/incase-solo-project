import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import BookCard from './BookCard/BookCard';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
});

class Bookcase extends Component {
  constructor(props){
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

  handleImgChange = (e) => {
    this.setState({
      imgToUpdate: e.target.value,
    })
  }

  getUserBooks = () => {
    axios({
      method: 'GET',
      url: '/api/bookcases/user'
    }).then((response)=>{
      console.log(response.data);
      this.setState({
        userBooks: response.data,
      })
    }).catch((error)=>{
      console.log('Error getting bookcase of current user', error);
    })
  };

 

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <div>
            
            <form>
              <input type="text" placeholder="Image URL" value={this.state.imgToUpdate} onChange={this.handleImgChange}/>
              <input type="submit" value="Update Image"/>
              <img src={this.props.user.profile_img_src} alt="User" />
            </form>
          </div>
          <form>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Author" />
            <input type="text" placeholder="Release Year" />
            <input type="text" placeholder="Genre" />
            <input type="text" placeholder="Cover Image URL" />
            <input type="text" placeholder="ISBN (13)" />
            <input type="text" placeholder="Synopsis" />
            <input type="Submit" value="Add Book" />
          </form>
          {this.state.userBooks.map((book, index)=>{
            return (
              <BookCard key={index} book={book}/>
            )
          })}
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
