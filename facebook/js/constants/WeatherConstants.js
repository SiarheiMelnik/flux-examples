'use strict';

import keyMirror from 'keymirror';

export default {
  API: {
    weather: 'http://api.openweathermap.org/data/2.5/weather',
    forecast: 'http://api.openweathermap.org/data/2.5/forecast/daily'
  },

  LOCATION: {
      all: ['Minsk', 'Mahilyow', 'Homyel'],
      def: 'Minsk'
  },

  ActionTypes: keyMirror({
    FETCH_WEATHER: null,
    RECEIVE_WEATHER_SUCCESS: null,
    RECEIVE_WEATHER_FAILED: null
  })
}
