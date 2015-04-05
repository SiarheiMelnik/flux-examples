'use strict';

import React from 'react';
import moment from 'moment';

import WeatherAction from '../actions/WeatherActionCreators';
import WeatherStore from '../stores/WeatherStore';
import {LOCATION} from '../constants/WeatherConstants';

function getStateFromStore() {
  return {
    weather: WeatherStore.getWeather(),
    loading: WeatherStore.getLoading(),
    location: WeatherStore.getLocation()
  }
}

export default React.createClass({

  getInitialState() {
    return getStateFromStore();
  },

  componentDidMount() {
    WeatherStore.listen(this._onChange);
    WeatherAction.fetch(LOCATION.def);
  },

  componentWillUnmount() {
    WeatherStore.unlisten(this._onChange);
  },

  _onChange() {
    this.setState(getStateFromStore);
  },

  getIcon(name) {
    let status = {
      clouds: 'wi-cloudy',
      rain: 'wi-rain',
      sun: 'wi-day-sunny'
    }

    return status[name] || 'wi-day-sunny';
  },

  getRenderData() {

    let {weather, loading} = this.state;

    if(loading) {
      return <div className='w-card-loading'>Loading ... </div>
    }

    if (!weather) {
      return <p>Error loading weather data, check location</p>;
    }

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
  },

  render() {
    return (
      <div className='w-card'>
        {this.getRenderData()}
      </div>
    );
  }
});
