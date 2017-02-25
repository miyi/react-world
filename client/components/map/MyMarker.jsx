import React from 'react';
import { defaultProps } from 'recompose';
import myMarkerStyle from './myMarker.css';


const myMarker = ({ theme, color, hover, name}) => (
  <div className={theme.component}>
    <div className={`${theme.content} ${theme[`color_${color}`]} ${hover ? theme.hover : ''}`}>
      {name}
    </div>
  </div>
);

export default defaultProps({
  theme : myMarkerStyle,
})(myMarker)