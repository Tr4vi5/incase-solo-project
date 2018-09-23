import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends React.Component {
    onMarkerClick = () => {
        console.log('Hello');
    }

    render() {
        return (
            <Map google={this.props.google} initialCenter={{ lat: 44.9782629, lng: - 93.2633184 }} zoom={14}>

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>Hi</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAWyNBkFPJCWM5mQNMDrIkzmFvdiXKzjRA'
})(MapContainer)