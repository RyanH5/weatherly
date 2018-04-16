import React from 'react';
import Card from '../card';
import { shallow , mount } from 'enzyme';

describe('Card tests', () => {

  describe('Ten-Day-Card', () => {
    it('should return ten-day card if day property is present', () => {
    const wrapper = shallow(<Card 
      props={

      }
      />)
    });
  })

  describe('Seven-Hour-Card', () => {
    it('should return seven-hour card if day property is not present', () => {

    });

    it('should change the military time to standard time if the time is past 12:00', () => {

    })
  })
  
});