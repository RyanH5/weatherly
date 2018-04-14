import React, { Component } from 'react';
import cleanedData from '../DataCleaner';
import '../styles/currentWeather.css';

export default class CurrentWeather extends Component {
  constructor() {
    super();
    this.state = {
      weather: {}
    }
  }

  render() {
    return (
      <div className='current-weather'>
        <h1 className="current-location">{cleanedData.currentWeather.location}</h1>
        <h1 className="current-condition">{cleanedData.currentWeather.condition}</h1>
        <h1 className="current-temp">{cleanedData.currentWeather.temperature}°</h1>
        <h1 className="current-high">{cleanedData.currentWeather.high}</h1>
        <h1 className="current-low">{cleanedData.currentWeather.low}</h1>
      </div>

    )
  }
}
