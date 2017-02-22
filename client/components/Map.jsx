import React from 'react';
import { defaultProps, withState, compose, withHandlers } from 'recompose';
import GoogleMapReact from 'google-map-react';
import MyMarker from './MyMarker.jsx';
import GmapConfig from '../settings/Gmapconfig.js'; 
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
      markers.map(({ lat, lng, id }, index) => (
        <MyMarker 
          key={id}
          id={id}
          hover={hoveredMarkerId === id}
          color={index}
          lat={lat} 
          lng={lng} 
        />
      ))
    }
  </GoogleMapReact>
)

export default compose(
	defaultProps({
  		markers: [
     		{ id: 'one', lat: 55.7558, lng: 37.6173 },
     		{ id: 'two', lat: 55.9658, lng: 38.7373 }
   		]
  	}),
  withState('mapProps', 'onMapPropsChange', {
    center: {
     lat: 55.7558,
     lng: 37.6173
    },
    zoom: 4
  }),
  withState('hoveredMarkerId', 'setHoveredMarkerId', () => undefined),
  withHandlers({
    distanceToMouse: () => ({ x, y }, { x: mouseX, y: mouseY }, markerProps) => {
      // if mouse outside marker rectangle return some big number
      const MARKER_WIDTH = 70;
      const MARKER_HEIGHT = 30;      
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
