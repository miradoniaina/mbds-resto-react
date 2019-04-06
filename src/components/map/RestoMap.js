//Affichage map à partir latitude & longitude
import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

class RestoMap extends Component {
 
  render() {
    const { latitude, longitude } = this.props;
    return (
      <div >
            <Map google={this.props.google}
              style={{width: '100%', height: '100%', position: 'relative'}}
              className={'map'}
              initialCenter={{
                      lat: latitude,
                      lng: longitude
              }}
              zoom={14}>
                <Marker 
                    name={'Restaurant location'}
                    position={{lat: latitude,lng: longitude}} />
                <Marker />
          </Map>
  
      </div>
    );  
  } 
}
export default GoogleApiWrapper({
  apiKey: ("AIzaSyAPeWauMwa4SdEDsVKmk8TBe0Hrg6G41nA")
})(RestoMap)