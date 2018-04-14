import React, { Component } from 'react';
import CurrentWeather from './components/currentWeather';
import SevenHourForecast from './components/sevenHourForecast';
import TenDayForecast from './components/tenDayForecast';
import './styles/App.css';
import UserInput from './components/userInput';
import cleanedData from './DataCleaner';
import apiKey from './api-key';


class App extends Component {
  constructor(data) {
    super();
    this.state = {
      weather: null,
      isLoading: true
    }
  }

  componentDidMount() {
    fetch(`http://api.wunderground.com/api/${apiKey}/conditions/hourly/forecast10day/q/CA/San_Francisco.json`)
    .then((response) => {
      return response.json()
      .then((data) => {

        this.setState({weather: cleanedData(data), isLoading: false});
      })
    }).catch((error) => console.log('Error', error))
  }

  render() {
    return (
      <div className="App">
        <div className="top-container">
          <UserInput />
          <CurrentWeather {...this.state}/>
          <SevenHourForecast {...this.state}/>
        </div>
        <TenDayForecast {...this.state}/>
      </div>
    );
  }
}

export default App;
