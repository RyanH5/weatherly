import React, { Component } from 'react';
import CurrentWeather from './components/currentWeather';
import SevenHourForecast from './components/sevenHourForecast';
import TenDayForecast from './components/tenDayForecast';
import './styles/App.css';
import UserInput from './components/userInput';
import cleanedData from './DataCleaner';
import apiKey from './api-key';
import cityObject from './cities';


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

  // componentDidMount() {
  //   fetch(`http://api.wunderground.com/api/${apiKey}/conditions/hourly/forecast10day/q/CA/${this.state.currentCity}.json`)
  //   .then((response) => {
  //     return response.json()
  //     .then((data) => {
  //       this.setState({weather: cleanedData(data), isLoading: false});
  //     })
  //   }).catch((error) => console.log('Error', error))
  // }

  setCity(city) {
    this.setState({ currentCity: city }, () => {
        this.fetchFunction()
    })
  }

  fetchFunction() {
    let city = this.state.currentCity;
    let unitedState = cityObject[this.state.currentCity];

    if (this.state.currentCity.includes(' ')) {
      city = this.state.currentCity.split(' ').join('_');
    }
    
    fetch(`http://api.wunderground.com/api/${apiKey}/conditions/hourly/forecast10day/q/${unitedState}/${city}.json`)
      .then((response) => {
        return response.json()
          .then((data) => {
            this.setState({ weather: cleanedData(data), isLoading: false });
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
