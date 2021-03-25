const express = require("express");

const http = require("http");

const bodyParser = require("body-parser");

const path = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res) {
 res.sendFile( __dirname + "/index.html");
});
app.post("/", function(req, res) {
        const country = req.body.cityName;
        const apiKey = "a31b537fb04f0b9e8e2306952bf6d916"
        const unit = "metric";
        const url = "http://api.openweathermap.org/data/2.5/weather?q=" + country + "&units=" + unit + "&appid=" + apiKey;
        http.get(url, function(response) {
            console.log(response.statusCode);
            response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const dec = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imagUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temperature in " + country + " is " + temp + " degree celcious </h1>");
            res.write("<h4> The weather condition is currently " + dec + "</h4>")
            res.write("<img src=" + imagUrl + ">");
            res.send();
            })
        })
})




















app.listen(path, function(error) {
    if(error) {
        console.log("The server cannot running path ", path);
    } else {
        console.log("The server is running path ",path);
    }
})