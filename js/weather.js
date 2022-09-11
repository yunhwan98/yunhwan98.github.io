const API_KEY= "65ff9802eeef4756e1b051104dafe9d9";

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    //console.log("You live in",lat,lng);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    console.log(url);
    fetch(url).then(response => response.json()).then(data=>{
        const weather=document.querySelector("#weather span:first-child");
        const city =document.querySelector("#weather span:last-child");
        city.innerText= data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
        //console.log(data.name,data.weather[0].main);
    });
}
function onGeoError(){
    alert("Can't find you. No weather for you.");
}
navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);