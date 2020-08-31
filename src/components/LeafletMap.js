// @flow

import React from 'react'
import { Map, TileLayer, Marker, Popup } from "react-leaflet"


class LeafletMap extends React.Component {
    constructor(props) {
      super(props)
      console.log(props)
      
      //TODO understand why i couldn't set state  this way and have it available when i needed it.
    //   this.state = {
    //     lat: this.props.coords.lat,
    //     lng: this.props.coords.lng,
    //     zoom: 13
    //   }
    }

    render() {
      console.log(this.props)
      const position = [this.props.coords.lat, this.props.coords.lng];
      console.log(position)

      return (
        <Map center={position} zoom={10}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br/> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      );
    }
  }
  
export default LeafletMap