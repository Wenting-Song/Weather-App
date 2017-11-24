var APPID = "32ff6833fb6797b110a33d5d1586324f";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;
var background;


function updateByZip(zip){
    var url = "http://api.openweathermap.org/data/2.5/weather?" + "zip=" +zip +"&APPID=" + APPID;
    sendRequest(url);
}

function updateByGeo(lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" +lat +"&lon=" + lon + "&APPID=" + APPID;
    sendRequest(url);
}

function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
          var data = JSON.parse(xmlhttp.responseText);
          var weather = {};
          weather.icon = data.weather[0].id;
          weather.humidity = data.main.humidity + "%";
          weather.wind = data.wind.speed + "m/s";
          weather.direction = degToCompass(data.wind.deg);
          weather.loc = data.name;
          weather.temp = K2F(data.main.temp)+"°F";
          update(weather);
        }
    };
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function K2C(k){
    return Math.round(k-273.15);
}

function K2F(k){
    return Math.round(k*(9/5)-459.67);
}

function degToCompass(degrees){
    var num =  Math.floor((degrees / 22.5) + 0.5);
    var directions = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return directions[(num % 16)];
}

function update(weather){
    wind.innerHTML = weather.wind;
    direction.innerHTML = weather.direction;
    humidity.innerHTML = weather.humidity;
    loc.innerHTML = weather.loc;
    temp.innerHTML = weather.temp;
    icon.src = "imgs/codes/" + weather.icon + ".png";
    background.background = "backgrounds/" + weather.icon + ".jpg";
    console.log(icon.src);
    console.log( background.src);
}

function showPosition(position){
    updateByGeo(position.coords.latitude, position.coords.longitude);
}



window.onload = function(){
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");
    background = document.getElementById("background");
    navigator.geolocation.getCurrentPosition(showPosition);
    var zip = window.prompt("Search weather by zipcode. Please enter the zipcode here:");
    updateByZip(zip);
   
}