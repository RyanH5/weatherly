import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow , mount } from 'enzyme';
import { inputCleaner } from '../inputCleaner';

describe('App tests', () => {
  let renderedApp;

  window.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn()
  };

  beforeEach(() => {
    renderedApp = shallow(<App />);
  });

  it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
  });

  it('should exist', () => {
    expect(renderedApp).toBeDefined();
  });

  it('App should have a default state of key and it should be default value', ()=>{
          
      const expectDefaultState = {
        weather: null,
        isLoading: true,
        currentCity: null,
        showError: false
      };
    
      expect(renderedApp.state()).toEqual(expectDefaultState);
    });

  it('should toggle showError state from default of false to true after running toggleError', () => {
    renderedApp.instance().toggleError();
    expect(renderedApp.state('showError')).toBe(true)
  });

  it('should update the currentCity state property to the passed in city', () => {
    renderedApp.instance().fetchFunction = jest.fn();
    renderedApp.instance().setCity('Atlanta');
    expect(renderedApp.state('currentCity')).toBe('Atlanta')
  });

  it('should run the displayApp method when there is a state of current city and there is not a showError state', () => {
    renderedApp.instance().displayApp = jest.fn(); 
    renderedApp.instance().fetchFunction = jest.fn();
    renderedApp.instance().setState({currentCity: 'Atlanta'});
    renderedApp.instance().render();
    expect(renderedApp.instance().displayApp).toHaveBeenCalled();
  });

  it('should run the displaySplash method when there is not a state of current city and/or there is not a showError state', () => {
    renderedApp.instance().displaySplash = jest.fn(); 
    renderedApp.instance().fetchFunction = jest.fn();
    renderedApp.instance().setState({currentCity: ''});
    renderedApp.instance().render();
    expect(renderedApp.instance().displaySplash).toHaveBeenCalled();
  });

  it('should run the displaySplash method when there is not a state of current city and/or there is not a showError state', () => {
    renderedApp.instance().displaySplash = jest.fn(); 
    renderedApp.instance().fetchFunction = jest.fn();
    renderedApp.instance().setState({currentCity: 'Atlanta'});
    renderedApp.instance().setState({showError: true});
    renderedApp.instance().render();
    expect(renderedApp.instance().displaySplash).toHaveBeenCalled();
  });

  it('should run the displaySplash method when there is not a state of current city and/or there is not a showError state', () => {
    renderedApp.instance().displaySplash = jest.fn(); 
    renderedApp.instance().fetchFunction = jest.fn();
    renderedApp.instance().setState({currentCity: ''});
    renderedApp.instance().setState({showError: false});
    renderedApp.instance().render();
    expect(renderedApp.instance().displaySplash).toHaveBeenCalled();
  });

  it('should call the inputCleaner method when fetchFunction is invoked', () => {
    renderedApp.instance().fetchFunction = jest.fn();
    renderedApp.instance().fetchFunction();
    expect(renderedApp.instance().fetchFunction).toHaveBeenCalled();
  });
});