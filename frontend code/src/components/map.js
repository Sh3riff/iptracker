import React from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleApiKey } from '../others/apiKey';
import { GoogleMarker } from "../others/Style"
import MarkerIcon from '../others/marker.png'

const Marker = ({ text, image }) => <GoogleMarker>{text} <img src={image} alt="marker"/></GoogleMarker>;

const Map = ({lat, lng}) => {

  const center = {
    lat: "4.7774",
    lng: "7.0134"
  }
  return (
    <div style={{ height: '100%', width: '100%', border: "5px solid black"}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GoogleApiKey }}
        center={[lat, lng]}
        defaultZoom={10}
      >
        <Marker
          lat={lat}
          lng={lng}
          text="user's location"
          image={MarkerIcon}
        />
      </GoogleMapReact>
    </div>
  );
}

export default Map;