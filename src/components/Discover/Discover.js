import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';

import Nav from '../Nav/Nav';
import BookcaseGridList from '../BookcaseGridList/BookcaseGridList';
import MapContainer from './MapContainer/MapContainer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
      bookcaseDialogOpen: false,
      currentLocation: '',
      initialCenter: { lat: 44.9782629, lng: - 93.2633184 },
      welcome: false,
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getBookcases();
    this.bookcaseCheck();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
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

  handleLocationChange = (e) => {
    this.setState({
      currentLocation: e.target.value
    })
  }

  bookcaseCheck = () => {
    axios({
      method: 'GET',
      url: `/api/bookcases/check`
    }).then((response)=>{
      console.log(response.data);
      if (!response.data.length) {
        this.setState({
          welcome: true
        });
      } 
    }).catch((error)=>{
      console.log('Error', error);
      alert('Unable to get bookcases, please try again later');
    });
  } 

  getBookcases = () => {
    axios({
      method: 'GET',
      url: '/api/bookcases/all'
    }).then((response) => {
      this.setState({
        bookcases: response.data
      })
      this.props.dispatch({ type: 'ADD_BOOKCASES', payload: response.data });
    }).catch((error) => {
      console.log(error);
    })
  }

  callGeocode = (e) => {
    e.preventDefault();
    axios({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?',
      params: { address: this.state.currentLocation, key: 'AIzaSyAWyNBkFPJCWM5mQNMDrIkzmFvdiXKzjRA' }
    }).then((response)=>{
      console.log(response.data.results[0].geometry.location);
      this.setState({
        initialCenter: response.data.results[0].geometry.location
      });
    }).catch((error)=>{
      console.log('Error calling geocode', error);
      alert('Sorry, could not find location, please navigate manually');
    });
  }


  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <Grid container>
            <Grid item xs={2} >
              <div style={{ height: '93vh', wordWrap: 'break-word', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: 5, borderRight: '2px solid black' }}>
                <h1 style={{ margin: 0 }}>Discover a book!</h1>
                <form onSubmit={this.callGeocode}>
                  <TextField
                    id="standard-full-width"
                    label="Address"
                    style={{ margin: 5, width: '90%'}}
                    helperText="Enter an address"
                    margin="normal"
                    onChange={this.handleLocationChange}
                    value={this.state.currentLocation}
                    required
                  />
                  <Button style={{marginRight: 20, float:'right'}} type="submit" variant="contained" size="small" color="primary" >
                    Search
                  </Button>
                </form>
              </div>
            </Grid>
            <Grid item xs={10} >
              <div style={{ backgroundColor: '#f4f4f4', height: '93vh', width: '100%', position: 'relative', right: 0, bottom: 0 }}>
                <MapContainer setCurrentBookcase={this.setCurrentBookcase} initialCenter={this.state.initialCenter}/>
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
          open={this.state.bookcaseDialogOpen}
        >
          <BookcaseGridList bookcase={this.state.currentBookcase} handleBookcaseClose={this.handleBookcaseClose} />
        </Dialog>
        <Dialog
          open={this.state.welcome}
        >
          <h1>Hello</h1>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserPage);