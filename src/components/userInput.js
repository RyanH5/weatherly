import React, { Component } from 'react';
import { inputCleaner } from '../inputCleaner'
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

  render() {
    return (
      <div>
        <input 
          type="text"
          className="user-input-field"
          aria-label="Input location by city or zipcode"
          value={this.state.inputCity}
          onChange={this.updateLocation}
        />
        <button 
          type="submit"
          className="submit-button"
          onClick = {() => this.props.setCity(this.state.inputCity)}
        >
        Submit
        </button>
      </div>
    )
  }
}
