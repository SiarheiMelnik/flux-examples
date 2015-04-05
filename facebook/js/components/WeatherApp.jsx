'use strict';

import React from 'react';
import WeatherCard from './WeatherCard';
import WeatherLocation from './WeatherLocation';

export default React.createClass({

  render() {
    return (
      <div className='w-wrap'>
        <WeatherLocation />
        <WeatherCard />
      </div>
    );
  }
});
