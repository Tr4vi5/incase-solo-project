import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';

import Nav from '../Nav/Nav';
import BookcaseGridList from '../BookcaseGridList/BookcaseGridList';
import MapContainer from './MapContainer/MapContainer';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  bookcases: state.bookcases
});

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookcases: [], // array of all bookcases from the database 
      currentBookcase: {},
      bookcaseDialogOpen: false
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
      this.props.dispatch({type: 'ADD_BOOKCASES', payload: response.data});
    }).catch((error) => {
      console.log(error);
    })
  }

  setCurrentBookcase = (bookcase) => {
    this.setState({
      currentBookcase: bookcase,
      bookcaseDialogOpen: true
    })
    console.log(bookcase);
  }

  handleBookcaseClose = () => {
    this.setState({
      bookcaseDialogOpen: false
    })
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <Grid container>
            <Grid item xs={3} >
              <div style={{height: '90vh', wordWrap: 'break-word'}}>Sidebar
                {JSON.stringify(this.state.bookcases)}
              </div>
            </Grid>
            <Grid item xs={9} >
              <div style={{ backgroundColor: '#f4f4f4', height: '90vh', width: '100%', position: 'relative', right: 0, bottom: 0}}>
                <MapContainer setCurrentBookcase={this.setCurrentBookcase}/>
              </div>
            </Grid>
          </Grid >
        </div >
      );
    }

    return (
      <div>
        <Nav />
        {content}
        <Dialog
          // actions={actions}
          open={this.state.bookcaseDialogOpen}
        >
          <BookcaseGridList bookcase={this.state.currentBookcase} handleBookcaseClose={this.handleBookcaseClose}/>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserPage);

// <Grid container >
//   {this.state.bookcases.map((bookcase, index) => {
//     return (
//       <Grid item xs={6} key={index}>
//         <BookcaseGridList bookcase={bookcase} />
//       </Grid>)
//   })}
// </Grid>