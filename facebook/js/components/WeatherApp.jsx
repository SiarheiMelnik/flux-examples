'use strict';

import React from 'react';
import {Navbar, Grid, Row, Col} from 'react-bootstrap';
import WeatherCard from './WeatherCard';
import WeatherSelect from './WeatherSelect';

export default React.createClass({

  render() {
    return (
      <div>
        <Navbar brand='Weather App'/>
        <Grid>
          <Row>
            <Col md={4}>
              <WeatherSelect />
            </Col>
            <Col md={8}>
              <WeatherCard />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});
