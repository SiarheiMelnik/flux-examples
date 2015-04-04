'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import {API, ActionTypes} from '../constants/WeatherConstants';
import request from 'superagent';

export default {
  load(location) {
    AppDispatcher.dispatch({
      type: ActionTypes.FETCH_WEATHER
    });

    let url = `${API.weather}?q=${location}`;

    request.get(url, (err, res) => {
      if (err) {
        return this.receiveFailed(`fetch err ${err}`);
      }
      this.receiveSuccess(res.body);
    });
  },
  receiveSuccess(data) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_WEATHER_SUCCESS,
      payload: data
    });
  },
  receiveFailed(err) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_WEATHER_FAILED,
      payload: err
    });
  }
}
