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
      currentCity: null,
      showError: false
    }

    this.setCity = this.setCity.bind(this)
    this.fetchFunction = this.fetchFunction.bind(this)
    this.toggleError = this.toggleError.bind(this)
  }

  setCity(city) {
    this.setState({ currentCity: city }, () => {
        this.fetchFunction()
    })
  }

  toggleError() {
    this.setState({showError: true});
  }

  fetchFunction() {
    let city = inputCleaner(this.state.currentCity);
    let unitedState = cityObject[city];
    let location = `${unitedState}/${city}`;
 
    fetch(`http://api.wunderground.com/api/${apiKey}/conditions/hourly/forecast10day/q/${location}.json`)
      .then((response) => {
        return response.json()
          .then((data) => {
            this.setState({ weather: cleanedData(data), isLoading: false,
              showError: false 
            });
            console.log(data)
          })
      }).catch((error) => {
        this.toggleError();
        console.log('Error', error);
        })
    }

  displayApp() {
    return (
      <div className="App">
        <div className="top-container">
          <h1>{this.state.showError && <div className="error-message">Please Enter a Valid City or Zipcode</div>}</h1>
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
      <div>
        <UserInput {...this.state} setCity={this.setCity}/>
        <h1>{this.state.showError && <div className="error-message">Please Enter a Valid City or Zipcode</div>}</h1>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        {
          this.state.currentCity && !this.state.showError ? 
          this.displayApp() :
          this.displaySplash() 
        }
      </div>
    );
  }
}

export default App;
