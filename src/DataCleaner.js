// import Data from './components/weatherData';
import apiKey from './api-key';

const currentWeatherCleaner = (Data) => {
  const currentWeatherObj = {
    day: Data.forecast.simpleforecast.forecastday[0].date.weekday,
    location: Data.current_observation.display_location.full,
    zipCode: Data.current_observation.display_location.zip,
    condition: Data.current_observation.weather,
    temperature: Data.current_observation.temp_f,
    high: Data.forecast.simpleforecast.forecastday[0].high.fahrenheit,
    low: Data.forecast.simpleforecast.forecastday[0].low.fahrenheit,
    weatherIcon: Data.current_observation.icon_url,
    description: Data.forecast.txt_forecast.forecastday[0].fcttext
  };
  return currentWeatherObj;
};

const sevenHourCleaner = (Data) => {
  const hourArr = Data.hourly_forecast.map((hour) => {
    let hourObj = {
      hour: hour.FCTTIME.hour,
      hourlyCondition: hour.condition,
      hourlyIcon: hour.icon_url,
      hourlyTemp: hour.temp.english + '°',
      timestamp: hour.FCTTIME.epoch
    };
    return hourObj;
  }).slice(0, 7);
  return hourArr;
};

const tenDayCleaner = (Data) => {
  const dayArr = Data.forecast.simpleforecast.forecastday.map((day) => {
    let dayObj = {
      day: day.date.weekday,
      high: day.high.fahrenheit,
      low: day.low.fahrenheit,
      icon: day.icon_url,
      timestamp: day.date.epoch
    };
    return dayObj;
  });
  return dayArr;
};


const cleanedData = (Data) => {
  const myData = {
    currentWeather: currentWeatherCleaner(Data),
    sevenHourWeather: sevenHourCleaner(Data),
    tenDayWeather: tenDayCleaner(Data),
  };
  return myData;
};


export default cleanedData;
