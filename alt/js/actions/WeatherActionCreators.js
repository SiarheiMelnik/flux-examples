'use strict';

import alt from '../alt';
import {API} from '../constants/WeatherConstants';
import request from 'superagent';

class WeatherAction {
  constructor() {
    this.generateActions(
      'receiveSuccess',
      'receiveFailed'
    );
  }

  fetch(location) {
    this.dispatch(location);

    let url = `${API.weather}?q=${location}`;

    request.get(url, (err, res) => {
      if (err) {
        return this.actions.receiveFailed(`fetch err ${err}`);
      }
      if(!res.body.weather) {
        return this.actions.receiveFailed(`location err ${err}`);
      }
      this.actions.receiveSuccess(res.body);
    });
  }
}

export default alt.createActions(WeatherAction);
