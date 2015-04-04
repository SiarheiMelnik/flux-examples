'use strict';

import React from 'react';
import WeatherAction from '../actions/WeatherActionCreators';
import WeatherStore from '../stores/WeatherStore';

function getStateFromStore() {
  return {
    weather: WeatherStore.getWeather()
  }
}

export default React.createClass({

  getInitialState() {
    return getStateFromStore();
  },

  componentDidMount() {
    WeatherStore.addChangeListener(this._onChange);
    WeatherAction.load('Minsk');
  },

  componentWillUnmount() {
    WeatherStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(getStateFromStore);
  },

  render() {
    var {weather} = this.state;

    if (!weather) {
      return null;
    }

    return (
      <h2>{weather.name}, {weather.sys.country}</h2>
    );
  }
});
