const yargs = require('yargs');
const axios = require('axios');
const apiKey = '{api-key-for-forecast.io}';

const argv = yargs
  .options({
    a:{
      demand : true,
      describe : "Address to find weather",
      alias : "address",
      string :true
    }
  })
  .help()
  .help('help','h')
  .argv;

var encodedURIAddress = encodeURIComponent(argv.address);
var getGeocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedURIAddress}`;

axios.get(getGeocodeUrl).then((response)=>{
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find that address');
  }else {
    var latitude = response.data.results[0].geometry.location.lat;
    var longtitude = response.data.results[0].geometry.location.lng;
    var getWeatherUrl = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longtitude}`;
    console.log(getWeatherUrl);
    return axios.get(getWeatherUrl);
  }
}).then((weatherResponse)=>{
      console.log(`Currently its ${getTemperatureInCelsius(weatherResponse.data.currently.temperature)}. Its feels like ${getTemperatureInCelsius(weatherResponse.data.currently.apparentTemperature)}`);
      console.log(`And its ${getTemperatureInCelsius(weatherResponse.data.currently.summary)}`);
}).catch((error)=>{
  if(error.code == 'ENOTFOUND'){
    console.log('Unable to connect with server');
  }else{
    console.log(error.message);
  }
});


getTemperatureInCelsius = (temperatureInF) => {
  var celsius = (5/9) * (temperatureInF - 32);
  return Math.round(celsius);
};
