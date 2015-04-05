'use strict';

import React from 'react';
import {Input} from 'react-bootstrap';
import {LOCATION} from '../constants/WeatherConstants';
import WeatherAction from '../actions/WeatherActionCreators';

export default React.createClass({

  _onChange(e) {
    WeatherAction.load(e.target.value);
  },

  render() {
    let locations = LOCATION.all;

    return (
      <Input
        type="select"
        onChange={this._onChange}
        value={locations.def}
        >
        {locations.map((v, i) => {
          return <option key={'loc-'+i} value={v}>{v}</option>
        })}
      </Input>
    );
  }
});
