import React, { Component } from 'react';
import { inputCleaner } from '../inputCleaner';
import '../styles/userInput.css';
import { Trie } from '@seamus-quinn/autocomplete'
import { garbageData } from '../cities';

const suggestions = new Trie();
suggestions.populate(garbageData.data);

export default class UserInput extends Component {
  constructor(props) {
    super();
    this.state = {
      userLocation: '',
    }

    this.updateLocation = this.updateLocation.bind(this)
  }

  updateLocation(event) {
    this.setState({userLocation: event.target.value})
  }

  submitBtnUnfocus() {
    document.querySelector('.submit-button').blur();
  }

  render() {
    suggestions.suggest(this.state.userLocation)
    let citySuggestions = null;
    if(suggestions.suggestionArray) {
      citySuggestions = suggestions.suggestionArray.map((suggestion, index) => (<option key={index}>{suggestion}</option>))
    }
    return (
      <div>
        <input 
          type="text"
          className="user-input-field"
          aria-label="Input location by city or zipcode"
          value={this.state.userLocation}
          onChange={this.updateLocation}
          placeholder="Enter a city or zip"
          list="city"
        />
        <datalist id="city">
        {citySuggestions}
        </datalist>
        <button 
          type="submit"
          className="submit-button"
          onClick = {() => {
            this.props.setCity(this.state.userLocation)
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
