import React from 'react';
import Card from '../card';
import { shallow , mount } from 'enzyme';

describe('Card tests', () => {

  it('should return ten-day card if day property is present', () => {
    const wrapper = shallow(<Card
      props={
      }
      />)
    
    expect(wrapper).toMatchSnapshot();
  });

  it('should return seven-hour card if day property is not present', () => {

  });
});