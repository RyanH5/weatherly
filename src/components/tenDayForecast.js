import React, { Component } from 'react';
import cleanedData from '../DataCleaner';
import Card from './card.js';
import '../styles/tenDayForecast.css';

export default class TenDayForecast extends Component {
  

  create_cards(weather) {
    return weather.map((day) => <Card {...day} key={day.timestamp}/>);
  }

  render() {
    return (
      <div className='ten-day-forecast'>
        <h1 className='ten-day-header'>Ten Day Forecast</h1>
        <div className='ten-day-card-container'>
          {this.create_cards(cleanedData.tenDayWeather)}
        </div>
      </div>
    )
  }
}

