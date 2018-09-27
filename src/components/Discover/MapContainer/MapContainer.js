import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.user,
    bookcases: state.bookcases
});

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookcaseDialogOpen: false
        }
    }

    onMarkerClick = (bookcase) => {
        this.props.setCurrentBookcase(bookcase)
    }

    onInfoWindowClose = () => {

    }

    render() {
        console.log(this.props.initialCenter);
        return (
            <Map
                google={this.props.google}
                initialCenter={this.props.initialCenter}
                center={this.props.initialCenter}
                zoom={15}
            >
                {this.props.bookcases.bookcases.map((bookcase, i) => {
                    return (
                            <Marker
                                key={i}
                                onClick={()=> this.onMarkerClick(bookcase)}
                                position={{ lng: bookcase.longitude, lat: bookcase.latitude }}
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