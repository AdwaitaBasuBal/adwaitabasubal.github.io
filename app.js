//ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp-value p");
const descElement = document.querySelector(".temp-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//App data

const weather = {};
weather.temperature = {
    unit : "celsius"
}

const key = "9d4489ceb51b1dde52e934ccbd843f79";

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "Browser doesn't support geolocation";
}

//Set users position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);

}

//Show error if issues

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;

}

//GET Weather

function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
       .then(function(response){
        let data = response.json();
        return data;
       })
       .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - 273);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
       })
       .then(function(){
        displayWeather();
       });

}
//DIsplay Weather
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

function converter(temperature){
    return (temperature * 9/5) +32;
}

tempElement.addEventListener("click", function(){

if(weather.temperature.value == undefined) 
    return;
if(weather.temperature.unit == "celsius"){
    let fahrenheit = converter(weather.temperature.value)
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}°<span>F<span>`;
    weather.temperature.unit = "fahrenheit";
}
else{
    tempElement.innerHTML = `${weather.temperature.value}°<span>C<span>`;
    weather.temperature.unit = "celsius";
}
})