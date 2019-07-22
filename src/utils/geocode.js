const request=require('request');
var geocodeAddress=(address,callback)=>{
  var encodedAddress=encodeURIComponent(address);
  request({
    url:`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1Ijoic2hpdmFtMjE5NyIsImEiOiJjanh1ZndzbDExMHp2M2JvMTlqam8yYWx3In0.aGA8CmO_FouxAMZxKm8hBg`,
    'proxy':'http://192.162.0.103:3128',
    json:true
  },(error,response)=>{
     //console.log(JSON.stringify(body,undefined,2));
    if(error){
      callback('Unable to connect to Geolocation services',undefined);
    }else if(response.body.features.length===0){
      callback('Unable to find that address.Try another search',undefined);
    }
    else{
      callback(undefined,{
        Address:response.body.features[0].place_name,
        Latitude:response.body.features[0].center[1],
        Longitude:response.body.features[0].center[0]
      })
    }
  });
};
module.exports={
  geocodeAddress:geocodeAddress
};
