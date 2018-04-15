import React, { Component } from 'react';
import cleanedData from '../DataCleaner';
import '../styles/card.css';



let Card = (props) => {
  let newHour = props.hour;
  if(props.hour > 12) {
    newHour -= 12;
  }

  if(props.day) {
    return(
      <div className="ten-day-card">
        <h1>{props.day}</h1>
        <h1>{props.high}</h1>
        <h1>{props.low}</h1>
        <img src={props.icon}/>
      </div>
    )
  } else {
    return (
      <div className="seven-hour-card">
        <h1>{newHour}</h1>
        <h1 className="hourly-condition">{props.hourlyCondition}</h1>
        <img src={props.hourlyIcon} />
        <h1>{props.hourlyTemp}</h1>
      </div>      
    )
  }
}

export default Card;
