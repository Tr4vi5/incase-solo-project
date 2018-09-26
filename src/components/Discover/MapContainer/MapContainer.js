import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.user,
    bookcases: state.bookcases
});

class MapContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    onMarkerClick = () => {
        console.log(this.props.bookcases);
    }

    render() {
        console.log(this.props.bookcases);
        return (
            <Map 
                google={this.props.google} 
                initialCenter={{ lat: 44.9782629, lng: - 93.2633184 }} 
                zoom={14}
            >
                {this.props.bookcases.bookcases.map((bookcase, i)=>{
                    return (
                        <Marker 
                            key={i}
                            onClick={this.onMarkerClick}
                            position={{ lng: bookcase.longitude, lat: bookcase.latitude}}
                            text={bookcase}
                        />
                    )
                })}
                
            </Map>
        );
    }
}

const MapObj = GoogleApiWrapper({
    apiKey: 'AIzaSyAWyNBkFPJCWM5mQNMDrIkzmFvdiXKzjRA'
})(MapContainer);

export default connect(mapStateToProps)(MapObj);