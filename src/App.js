import React, { Component } from 'react';
import CurrentWeather from './components/currentWeather';
import SevenHourForecast from './components/sevenHourForecast';
import TenDayForecast from './components/tenDayForecast';
import './styles/App.css';
import UserInput from './components/userInput';
import cleanedData from './DataCleaner';
import apiKey from './api-key';
import cityObject from './cities';
import { inputCleaner } from './inputCleaner'


class App extends Component {
  constructor(data) {
    super();
    this.state = {
      weather: null,
      isLoading: true,
      currentCity: null
    }

    this.setCity = this.setCity.bind(this)
    this.fetchFunction = this.fetchFunction.bind(this)
  }

  setCity(city) {
    this.setState({ currentCity: city }, () => {
        this.fetchFunction()
    })
  }

  fetchFunction() {
    let location;
    if(typeof(this.state.currentCity) === 'number') {
      location = this.state.currentCity;
    } else {
      let city = inputCleaner(this.state.currentCity);
      let unitedState = cityObject[city];
      location = `${unitedState}/${city}`
    }

    fetch(`http://api.wunderground.com/api/${apiKey}/conditions/hourly/forecast10day/q/${location}.json`)
      .then((response) => {
        return response.json()
          .then((data) => {
            this.setState({ weather: cleanedData(data), isLoading: false });
            console.log(data)
          })
      }).catch((error) => console.log('Error', error))
  }

  displayApp() {
    return (
      <div className="App">
        <div className="top-container">
          <UserInput {...this.state} setCity={this.setCity}/>
          <CurrentWeather {...this.state} />
          <SevenHourForecast {...this.state} />
        </div>
        <TenDayForecast {...this.state} />
      </div>
    );
  }

  displaySplash() {
    return(
      <UserInput {...this.state} setCity={this.setCity}/>
    )
  }

  render() {
    return (
      <div className="App">
        {
          this.state.currentCity ? 
          this.displayApp() :
          this.displaySplash() 
        }
      </div>
    );
  }
}

export default App;
