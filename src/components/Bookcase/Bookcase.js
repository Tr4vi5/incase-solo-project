import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
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
            <img src={this.props.user.profile_img_src} alt="User"/>
            <form>
              <input type="text" placeholder="Image URL" value={this.state.imgToUpdate} onChange={this.handleImgChange}/>
              <input type="submit" value="Update Image"/>
            </form>
          </div>
          {this.state.userBooks.map((book, index)=>{
            return (
              <div key={index}>
                <img src={book.cover_src} alt="book cover"/>
                <p>{book.title}</p>
              </div>
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
