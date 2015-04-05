'use strict';

import React from 'react';
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
    WeatherStore.addChangeListener(this._onChange);
    WeatherAction.load(LOCATION.def);
  },

  componentWillUnmount() {
    WeatherStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(getStateFromStore);
  },

  render() {
    var {weather, loading, location} = this.state;

    if(loading) {
      return <p>Loading ... </p>
    }

    if (!weather) {
      return <p>Error loading weather data, check location</p>;
    }

    let [type] = weather.weather;

    return (
      <div>
        <h2>{weather.name}, {weather.sys.country}</h2>
        <div>{weather.dt}</div>
        <div>{Math.round(weather.main.temp - 273.15)}</div>
        <div>
          {type.main}
        </div>
        <img src={'http://openweathermap.org/img/w/'+type.icon+'.png'} />
        <div>Humidity: {weather.main.humidity} %</div>
        <div>Wind: {weather.wind.speed} mps</div>
      </div>
    );
  }
});
