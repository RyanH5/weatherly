import React, { Component } from 'react';
import CurrentWeather from './components/currentWeather';
import SevenHourForecast from './components/sevenHourForecast';
import TenDayForecast from './components/tenDayForecast';
import './styles/App.css';
import UserInput from './components/userInput';
import cleanedData from './DataCleaner';

class App extends Component {
  constructor(data) {
    super();
    this.state = {
      weather: cleanedData
    }
  }


  render() {
    return (
      <div className="App">
        <div className="top-container">
          <UserInput />
          <CurrentWeather />
          <SevenHourForecast />
        </div>
        <TenDayForecast />
      </div>
    );
  }
}

export default App;
