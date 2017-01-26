// var somePromise = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//       //resolve('Resolved');
//       reject('Rejected');
//     },2500);
// });
//
// somePromise.then((message)=>{
//     console.log(message);
// },(errorMessage)=>{
//     console.log(errorMessage);
// });

const request = require('request');

var getAddress = (address) =>{
var encodedURIAddress = encodeURIComponent(address);
  return new Promise((resolve,reject)=>{
    request({
      url : `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedURIAddress}`,
      json : true
    },(error,response,body)=>{
      if(error){
        reject('Something went wrong! Check your connection and try again');
      }else if (body.status === 'OK') {
        //console.log(`Address : ${JSON.stringify(body.results[0].formatted_address,undefined,2)}`);
        //console.log(`Latitude : ${JSON.stringify(body.results[0].geometry.location.lat,undefined,2)}`);
        //console.log(`Latitude : ${JSON.stringify(body.results[0].geometry.location.lng,undefined,2)}`);
        resolve({
          address : body.results[0].formatted_address,
          lat : body.results[0].geometry.location.lat,
          lng : body.results[0].geometry.location.lng
        });
      }else if(body.status == "ZERO_RESULTS"){
        reject('No address found! Try entering something different');
      }
    });

  });
};

getAddress('-----').then((success)=>{
    console.log(`Sucess : ${success.address}`);
},(errorMessage)=>{
  console.log(`Error : ${errorMessage}`);
});
