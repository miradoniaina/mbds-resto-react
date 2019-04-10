import React, { Component } from "react";
import {Map,TileLayer,Marker, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
const customMarker = L.icon({ iconUrl: require('leaflet/dist/images/marker-icon.png'), });


class RestoMap extends Component {
  
    render() {
      const position = [this.props.latitude, this.props.longitude];
      return (
        <Map style={{height: '900px',width: '90%'}} center={position} zoom={13}>
          <TileLayer
             url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
        <Marker icon={customMarker} position={position}>
            <Popup>
              <span>{this.props.adresse} <br/>Lat: {position[0]}, Long: {position[1]}</span>
            </Popup>
          </Marker>
        </Map>
      );
    }
  }
  export default RestoMap;