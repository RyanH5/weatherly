import React, { Component } from 'react';
import CurrentWeather from './components/currentWeather';
import SevenHourForecast from './components/sevenHourForecast';
import TenDayForecast from './components/tenDayForecast';
import './styles/App.css';
import UserInput from './components/userInput';
import cleanedData from './DataCleaner';
import apiKey from './api-key';
import { cityObject }  from './cities';
import { inputCleaner } from './inputCleaner';

class App extends Component {
  constructor(data) {
    super();
    this.state = {
      weather: null,
      isLoading: true,
      currentCity: null,
      currentState: null,
      showError: false
    };

    this.setCity = this.setCity.bind(this);
    this.toggleError = this.toggleError.bind(this);
    this.checkLocalStorage = this.checkLocalStorage.bind(this);
  }

  setCity(location) {
    const city = location.split(', ')[0];
    const unitedState = location.split(', ')[1];
    fetch(`http://api.wunderground.com/api/${apiKey}/conditions/hourly/forecast10day/q/${unitedState}/${city}.json`)
      .then((response) => response.json())
      .then((data) => {
        this.saveLocation(location)
        this.setState({
          currentCity: city,
          currentState: unitedState,
          weather: cleanedData(data), 
          isLoading: false,
          showError: false
        });
      }).catch(() => {
        localStorage.clear()
        this.toggleError()
      })
  }

  toggleError() {
    this.setState({showError: true});
  }

  componentDidMount() {
    this.checkLocalStorage();
  }

  retrieveData() {
    let storedLocation = JSON.parse(localStorage.getItem('currentLocation'));
    fetch(`http://api.wunderground.com/api/${apiKey}/conditions/hourly/forecast10day/q/${storedLocation}.json`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            currentCity: storedLocation,
            weather: cleanedData(data), isLoading: false,
            showError: false
          });
        }).catch(() => this.toggleError());
  }

  checkLocalStorage() {
    if(localStorage.currentLocation) {
      let storedLocation = JSON.parse(localStorage.getItem('currentLocation'));
      this.retrieveData();      
    }
  }

  saveLocation(location) { 
    localStorage.setItem('currentLocation', JSON.stringify(location))
  }

  displayApp() {
    return (
      <div className="App">
        <h1>{this.state.showError && <div className="error-message">Please Enter a Valid City or Zipcode</div>}</h1>
        <UserInput {...this.state} setCity={this.setCity}/>
        <div className="top-container">          
          <CurrentWeather {...this.state} />
          <SevenHourForecast {...this.state} />
        </div>
        <TenDayForecast {...this.state} />
      </div>
    );
  }

  displaySplash() {
    return(
      <div className="splash-page">
        <h1>W E A T H R L Y</h1>
        <UserInput {...this.state} setCity={this.setCity}/>
        <h1>{this.state.showError && <div className="error-message">Please Enter a Valid City or Zipcode</div>}</h1>
      </div>
    );
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
