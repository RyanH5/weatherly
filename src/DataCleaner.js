import Data from './components/weatherData';
import apiKey from './api-key';


// componentDidMount() {
//   fetch(`http://api.wunderground.com/api/${apiKey}/conditions/q/CO/Denver.json`)
//   .then((response) => {
//     response.json()
//     .then((data) => {
//       console.log(data);
//       return data;
//     })
//   }).catch((error) => console.log('Error', error))
// }

const currentWeatherCleaner = (Data) => {
  const currentWeatherObj = {
    day: Data.forecast.simpleforecast.forecastday[0].date.weekday,
    location: Data.current_observation.display_location.full,
    zipCode: Data.current_observation.display_location.zip,
    condition: Data.current_observation.weather,
    temperature: Data.current_observation.temp_f,
    high: Data.forecast.txt_forecast.forecastday[0].fcttext.split('. ')[1].split(' ')[1],
    low: Data.forecast.txt_forecast.forecastday[1].fcttext.split('. ')[1].split(' ')[1],
    weatherIcon: Data.current_observation.icon_url,
  }
  return currentWeatherObj;
}

const sevenHourCleaner = (Data) => {
  const hourArr = Data.hourly_forecast.map((hour) => {
    let hourObj = {
    hour: hour.FCTTIME.hour,
    hourlyCondition: hour.condition,
    hourlyIcon: hour.icon_url,
    hourlyTemp: hour.temp.english + 'F',
    timestamp: hour.FCTTIME.epoch
    }
    return hourObj;
  }).slice(0, 7)
  return hourArr;
}

const tenDayCleaner = (Data) => {
  const dayArr = Data.forecast.simpleforecast.forecastday.map((day) => {
    let dayObj = {
      day: day.date.weekday,
      high: day.high.fahrenheit,
      low: day.low.fahrenheit,
      icon: day.icon_url,
      timestamp: day.date.epoch
    }
    return dayObj;
  })
  return dayArr
}

const cleanedData = {
  currentWeather: currentWeatherCleaner(Data),
  sevenHourWeather: sevenHourCleaner(Data),
  tenDayWeather: tenDayCleaner(Data),
}


export default cleanedData
