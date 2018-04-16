import React, { Component } from 'react';
import { inputCleaner } from '../inputCleaner';
import '../styles/userInput.css'
// import cityObject from '../cities';

export default class UserInput extends Component {
  constructor(props) {
    super();
    this.state = {
      inputCity: '',
    }

    this.updateLocation = this.updateLocation.bind(this)
  }

  updateLocation(event) {
    this.setState({inputCity: event.target.value})
  }

  submitBtnUnfocus() {
    document.querySelector('.submit-button').blur();
  }

  render() {
    return (
      <div>
        <input 
          type="text"
          className="user-input-field"
          aria-label="Input location by city or zipcode"
          value={this.state.inputCity}
          onChange={this.updateLocation}
          placeholder="Enter a city or zip"
        />
        <button 
          type="submit"
          className="submit-button"
          onClick = {() => {
            this.props.setCity(this.state.inputCity)
            this.submitBtnUnfocus();
            }
          }
        >
        ▶︎
        </button>
      </div>
    )
  }
}
