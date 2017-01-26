const yargs = require('yargs');
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')
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

geocode.getAddress(argv.address,(errorMessage,result) =>{
  if(errorMessage){
    console.log(errorMessage);
  }else{
    //console.log(`Result: ${JSON.stringify(result,undefined,2)}`);
    weather.getWeather(result.lat,result.lng,(errorMessage,response) => {
      if(errorMessage){
        console.log(errorMessage);
      }else{
        console.log(`\n============= TEMPERATURE ===============`);
        console.log(`Your Full Address : ${result.address}`);
        console.log(`Currently its ${response.celsius} Celsius. It feels like ${response.apparentTemperature} Celsius and is ${response.summary}`);
        console.log(`=========================================`);
      }
    });
  }
});
