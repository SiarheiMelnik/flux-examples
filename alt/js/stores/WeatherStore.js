'use strict';

import alt from '../alt';
import WeatherAction from '../actions/WeatherActionCreators';

class WeatherStore {
  constructor() {
    this.bindActions(WeatherAction);

    this.weather = null;
    this.location = null;
    this.loading = false;
  }

  onFetch(data) {
    this.location = data;
    this.loading = true;
  }

  onReceiveSuccess(data) {
    this.weather = data;
    this.loading = false;
  }

  onReceiveFailed() {
    this.weather = null;
    this.loading = false;
  }

  static getWeather() {
    return this.getState().weather;
  }

  static getLocation() {
    return this.getState().location;
  }

  static getLoading() {
    return this.getState().loading;
  }

}

export default alt.createStore(WeatherStore, 'WeatherStore');
