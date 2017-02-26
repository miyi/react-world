import React from 'react';
import { defaultProps, withState, compose, withHandlers } from 'recompose';
import GoogleMapReact from 'google-map-react';
import MyMarker from './MyMarker.jsx';
import GmapConfig from '../../settings/Gmapconfig.js'; 
import markerData from './markerData.js'
//

const map = ({
  onMapPropsChange,
  mapProps: {
    center, 
    zoom
  },
  markers,
  distanceToMouse,
  onChildMouseEnter,
  onChildMouseLeave,
  hoveredMarkerId
}) => (
  <GoogleMapReact
  	bootstrapURLKeys={GmapConfig}
    onChange={onMapPropsChange}
    center={center}
    zoom={zoom}
    distanceToMouse={distanceToMouse}
    hoverDistance={1}
    onChildMouseEnter={onChildMouseEnter}
    onChildMouseLeave={onChildMouseLeave}
  >
    {
      markers.map(({ Lat, Lng, name }, index) => (
        <MyMarker 
          key={index}
          name={name}
          lat={Lat} 
          lng={Lng} 
        />
      ))
    }
  </GoogleMapReact>
)

export default compose(
	defaultProps({
  		markers: markerData
  	}),
  withState('mapProps', 'onMapPropsChange', {
    center: {
     lat: 49.2633682,
     lng: -123.251087
    },
    zoom: 15
  }),
  withState('hoveredMarkerId', 'setHoveredMarkerId', () => undefined),
  withHandlers({
    distanceToMouse: () => ({ x, y }, { x: mouseX, y: mouseY }, markerProps) => {
      // if mouse outside marker rectangle return some big number
      const MARKER_WIDTH = 50;
      const MARKER_HEIGHT = 50;      
      if (
        Math.abs(x - mouseX) > MARKER_WIDTH / 2 ||  
        Math.abs(y - mouseY) > MARKER_HEIGHT / 2
      ) {
        return Number.MAX_SAFE_INTEGER;
      }
      // marker inside rectangle normalize distance and return
      const dX = Math.abs(x - mouseX) / (MARKER_WIDTH / 2);
      const dY = Math.abs(y - mouseY) / (MARKER_HEIGHT / 2);
      return Math.sqrt(dX * dX + dY * dY);
    },
    onChildMouseEnter: ({ setHoveredMarkerId }) => (_, { id }) => {
      setHoveredMarkerId(id);
    },
    onChildMouseLeave: ({ setHoveredMarkerId }) => () => {
      setHoveredMarkerId(undefined);
    }
  })
)(map)
