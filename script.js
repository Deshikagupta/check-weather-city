document.addEventListener("DOMContentLoaded",()=>{
    const cityInput= document.getElementById("city-input");
    const getBtn= document.getElementById("get-btn");
    const weatherInfo= document.getElementById("weather-info");    
    const cityName= document.getElementById("city-name");    
    const tempDisplay= document.getElementById("temperature");
    const discptDisplay= document.getElementById("discription");
    const error= document.getElementById("error-msg");

    const API_KEY="YOUR_API_KEY_HERE";

    getBtn.addEventListener("click",async()=>{
        const city=cityInput.value.trim();
        if(!city){
            alert("City Name is Required.");
            return;
        } 

        try {
            const weatherData=await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            errorMessage();
        }
    });

    async function fetchWeatherData(city){
        //take input
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response=await fetch(url);
        
        if(!response.ok){
            throw new Error("City Not Found");
        }
        const data=await response.json();
        return data;
    }

    function displayWeatherData(data){
        //display details
        console.log(data);
        const {name,  main,  weather} = data;
        cityName.textContent=name;
        tempDisplay.textContent=`Temperature : ${main.temp}`;
        discptDisplay.textContent=`Weather : ${weather[0].description}`;

        weatherInfo.classList.remove("hidden");
        error.classList.add("remove");
    }

    function errorMessage(){
        weatherInfo.classList.add("hidden");
        error.classList.remove("hidden");
    }
});
