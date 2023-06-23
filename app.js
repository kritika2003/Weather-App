const express= require('express');
const https= require('https');
const bodyparser= require('body-parser');
const app= express();
app.use(bodyparser.urlencoded({extended: true}));
app.get('/', function(req, res){
       res.sendFile(__dirname+"/index.html")
        });
        app.post("/",function(req,res){
        console.log
        const query=req.body.cityname;
        const apikey="b95b45e8eb406bcc76eda2ba01da835f";
        const unit="metric";
          https.get("https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit , function(response){
              console.log(response.statusCode);
              response.on('data', function(data){
                const weatherdata= JSON.parse(data);
                console.log(weatherdata);
                const temp= weatherdata.main.temp;
                const weatherdescription= weatherdata.weather[0].description;
                const icon= weatherdata.weather[0].icon;
                const imageURL=" https://openweathermap.org/img/wn/"+icon+"@2x.png";
                res.write("<h1> The temperature of "+query+ " is "+ temp+ " degree celcius </h1>");
                res.write("<p>The weather is currently "+ weatherdescription+ "</p>");
                res.write("<img src="+imageURL+">");
                res.send();
              
              });
          });
        
    });
  
    
app.listen(9091, function(){
   console.log('Server is running at port 9091');
   });

