const request=require('request');
var getWeather=(latitude,longitude,callback)=>{
  request({
    url:`https://api.darksky.net/forecast/eaeb3dae08eeaa31da63351ac63f9158/${latitude},${longitude}`,
    // 'proxy':'http://192.162.0.103:3128',
    json:true
  },(error,response)=>{
    if(error){
      console.log('Unable to connect to weather services');
  }
    else if(response.body.error){
      callback("Unable to find location");
    }
    else{
      callback(undefined,response.body.daily.data[0].summary+'It is currently '+response.body.currently.temperature+' degrees out.'+'There is a '+response.body.currently.precipProbability+'% chance of rain.');
    }

  });
}
module.exports.getWeather=getWeather;
