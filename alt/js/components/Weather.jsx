'use strict';

import React from 'react';
import moment from 'moment';

export default React.createClass({
  propTypes: {
    weather: React.PropTypes.object
  },

  getIcon(name) {
    let status = {
      clouds: 'wi-cloudy',
      rain: 'wi-rain',
      sun: 'wi-day-sunny'
    }

    return status[name] || 'wi-day-sunny';
  },

  render(){
    let {weather} = this.props;

    let [type] = weather.weather;
    let iconName = this.getIcon(type.main.toLowerCase());

    return (
      <div>
        <div className='w-card-icon'>
          <i className={'wi '+iconName}></i>
        </div>
        <div className='w-card-content'>
          <h5>{weather.name}</h5>
          <h3 className='w-card-content__day'>
            {moment(weather.dt).format('dddd')}
          </h3>
          <div className='w-card-content__temp'>
            {Math.round(weather.main.temp - 273.15)}
          </div>
          <h2>{type.main}</h2>
          <div>Humidity: {weather.main.humidity} %</div>
          <div>Wind: {weather.wind.speed} mps</div>
        </div>
      </div>
    );
  }
});
