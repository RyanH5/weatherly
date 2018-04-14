import React, { Component } from 'react';
import cleanedData from '../DataCleaner';
import '../styles/currentWeather.css';

export default class CurrentWeather extends Component {
  constructor() {
    super();
  }

  render() {
    const {weather, isLoading} = this.props
    if (isLoading) {
      return <p>Loading... </p>;
    }

    return (
      <div className='current-weather'>
        <h1 className="current-location">{weather.currentWeather.location}</h1>
        <h1 className="current-condition">{weather.currentWeather.condition}</h1>
        <h1 className="current-temp">{weather.currentWeather.temperature}°</h1>
        <h1 className="current-high">{weather.currentWeather.high}</h1>
        <h1 className="current-low">{weather.currentWeather.low}</h1>
      </div>
    )
  }
}