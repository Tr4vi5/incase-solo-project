import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.user,
});

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Map
                google={this.props.google}
                initialCenter={{lat: this.props.currentBookcaseLocation.latitude, lng: this.props.currentBookcaseLocation.longitude}}
                center={{ lat: this.props.currentBookcaseLocation.latitude, lng: this.props.currentBookcaseLocation.longitude }}
                zoom={14}
            >
                <Marker
                    position={{ lat: this.props.currentBookcaseLocation.latitude, lng: this.props.currentBookcaseLocation.longitude }}
                />
            </Map>
        );
    }
}

const MapObj = GoogleApiWrapper({
    apiKey: 'AIzaSyAWyNBkFPJCWM5mQNMDrIkzmFvdiXKzjRA'
})(MapContainer);

export default connect(mapStateToProps)(MapObj);