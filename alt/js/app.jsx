'use strict';

require('../scss/main.scss');

import React from 'react';
import WeatherApp from './components/WeatherApp';

React.render(
  <WeatherApp />,
  document.getElementById('weather')
);
