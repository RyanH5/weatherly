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
    this.checkLocalStorage = this.checkLocalStorage.bind(this)
  }

  setCity(city) {
    this.setState({ currentCity: city }, () => {
        this.fetchFunction()
    })
  }

  toggleError() {
    this.setState({showError: true});
  }

  componentDidMount() {
    this.checkLocalStorage();
    console.log('componentdidmount', this.state)
    this.displayApp();
  }

  checkLocalStorage() {
    if(localStorage.length) {

      let storedLocation = JSON.parse(localStorage.getItem(1))

      console.log(storedLocation)

      fetch(`http://api.wunderground.com/api/${apiKey}/conditions/hourly/forecast10day/q/${storedLocation}.json`)
        .then((response) => {
          return response.json()
            .then((data) => {
              console.log('waaaa')
              this.setState({
                currentCity: storedLocation,
                weather: cleanedData(data), isLoading: false,
                showError: false
              });
              console.log(this.state)
            })
        }).catch((error) => {
          this.toggleError();
          console.log('Error', error);
        })
    }
  }

  fetchFunction() {
    let city = inputCleaner(this.state.currentCity);
    let unitedState = cityObject[city];
    let location = `${unitedState}/${city}`;

    
    localStorage.setItem(1, JSON.stringify(location))
 
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
