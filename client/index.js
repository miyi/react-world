import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Map from './components/map/Map.jsx';
import { AppContainer } from 'react-hot-loader';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Map);

if (module.hot) {
  module.hot.accept('./components/map/Map.jsx', () => {
    render(Map);
  });
}