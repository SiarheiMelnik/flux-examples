'use strict';

import React from 'react';

import WeatherAction from '../actions/WeatherActionCreators';
import WeatherStore from '../stores/WeatherStore';
import {LOCATION} from '../constants/WeatherConstants';
import Weather from './Weather';

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

  getRenderData() {

    let {weather, loading} = this.state;

    if(loading) {
      return <div className='w-card-loading'>Loading ... </div>
    }

    if (!weather) {
      return <p>Error loading weather data, check location</p>;
    }

    return (
      <Weather weather={weather} />
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
