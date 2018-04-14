import React, { Component } from 'react';
import cleanedData from '../DataCleaner';
import Card from './card.js';
import '../styles/sevenHourForecast.css';

export default class SevenHourForecast extends Component{
  create_cards(weather) {
    return weather.map((hour) => <Card {...hour} key={hour.timestamp}/>);
  }

  render() {

    const {weather, isLoading} = this.props;
    if (isLoading) {
      return <p>Loading... </p>;
    }

    return (
      <div className='seven-hour-forecast'>
        <h1 className='seven-hour-header'>Seven Hour Forecast</h1>
        <div className='hourly-card-container'>
          {this.create_cards(weather.sevenHourWeather)}
        </div>
      </div>
    )
  }
}



