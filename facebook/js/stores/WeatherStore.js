'use strict';

import {EventEmitter} from 'events';
import {ActionTypes} from '../constants/WeatherConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

var CHANGE_EVENT = 'change';

var _weather = null;
var _location = null;
var _loading = false;

var _addWeather = function(data) {
  _weather = data;
  _loading = false;
};

var _fetchWeather = function(data) {
  _location = data;
  _loading = true;
};

var WeatherStore = Object.assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getWeather() {
    return _weather;
  },

  getLocation() {
    return _location;
  },

  getLoading() {
    return _loading;
  }

});

WeatherStore.dispatchToken = AppDispatcher.register((action) => {

  switch(action.type) {
    case ActionTypes.FETCH_WEATHER:
      _fetchWeather(action.payload);
      WeatherStore.emitChange();
      break;
    case ActionTypes.RECEIVE_WEATHER_SUCCESS:
      _addWeather(action.payload);
      WeatherStore.emitChange();
      break;
    case ActionTypes.RECEIVE_WEATHER_FAILED:
      _addWeather(null);
      WeatherStore.emitChange();
      break;
  }

});

export default WeatherStore;
