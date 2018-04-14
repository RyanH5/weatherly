import React, { Component } from 'react';
import cityObject from '../cities';

export default class UserInput extends Component {
  constructor() {
    super();
    this.state = {
      // location: 'userInput'
    }
  }

  render() {
    return (
      <div>
        <input 
          type="text"
          className="user-input-field"
          aria-label="Input location by city or zipcode"
        />
        <button 
          type="submit"
          className="submit-button"
        >
        Submit
        </button>
      </div>
    )
  }
}
