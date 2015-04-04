'use strict';

import {EventEmitter} from 'events';
import {ActionTypes} from '../constants/WeatherConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

var CHANGE_EVENT = 'change';

var _weather = null;

var _addWeather = function(data) {
  _weather = Object.assign({}, data);
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

  getWeather(data) {
    return _weather;
  }

});

WeatherStore.dispatchToken = AppDispatcher.register((action) => {

  switch(action.type) {
    case ActionTypes.RECEIVE_WEATHER_SUCCESS:
      _addWeather(action.payload);
      WeatherStore.emitChange();
      break;
  }

});

export default WeatherStore;
