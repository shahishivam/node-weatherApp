const path=require('path')
const express=require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app=express()
const port=process.env.PORT || 3000

//Define paths for express configuration
const publicDirectorypath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,'../template/partials')

//Set up Handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectorypath))

app.get("",(req,res)=>{
  res.render('index',{
    title:'Weather',
    name:'Shivam Shahi'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About Me',
    name:'Shivam Shahi'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    helpMessage:'Click here for help',
    title:'Help',
    name:'Shivam Shahi'
  })
})

app.get('/Weather',(req,res)=>{
  if(!req.query.address)
  {
    return res.send({
      error:'Address must be provided'
    })
  }
  geocode.geocodeAddress(req.query.address,(errorMessage,result)=>{
    if(errorMessage){
      return res.send({
        error:errorMessage
      })
    }
    forecast.getWeather(result.Latitude,result.Longitude,(errorMessage,forecastData)=>{
      if(errorMessage){
        return res.send({
          error:errorMessage
        })
      }
      res.send({
        address:req.query.address,
        location:result.Address,
        forecast:forecastData
      })
    })
  })

})

app.get('/products',(req,res)=>{
  if(!req.query.search)
  {
    return res.send({
      error:'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products:[]
  })
})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    errorMessage:'Help article not found',
    title:'404',
    name:'Shivam Shahi'
  })
})

app.get('*',(req,res)=>{
  res.render('404',{
    errorMessage:'Page not found',
    title:'404',
    name:'Shivam Shahi'
  })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port);
})
