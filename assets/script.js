$(document).ready(function () {


  //====================================================================== Global variables ===================================================================

  var searchBtn = document.getElementById('searchBtn');
  var deleteBtn = document.getElementById('deleteBtn');
  var formEl = document.getElementById('form1');
  var cityList = document.getElementById('city-list');
  var weatherDiv = document.getElementById('weather-container');
  var currentHead = document.getElementById('current-heading');
  var weatherHead = document.getElementById('weather-head');
  var forecast = document.getElementById('forecast');
  var weatherCard = document.createElement('div');
  weatherCard.classList.add('card-body');
  var weatherCard1 = document.createElement('div');
  weatherCard1.classList.add('card-body1');
  var title = document.createElement('h3');
  title.classList.add('weather-title');


  // =============================================================== API call for geoloaction (lat/lon) ========================================================
  // Get lat and lon for city entered in input. Lat and lon is needed to get weather data

  function getGeoLocation(searchInput) {
    var apiKey = '312bdb80adf7dd8b05eda8e9064d9b1a';
    var url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + '&limit=&appid=' + apiKey;

    fetch(url)
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        var name = data[0].name;
        currentHead.style.display = 'none';
        title.textContent = (name);

        //================================================================= Display search city =======================================================

        weatherCard.textContent = "";
        weatherCard1.textContent = "";
        forecast.textContent = "";
        forecast.append(weatherCard);
        getCurrenWeather(lat, lon);
      });
  }
  //============================================================== API call for weather data =============================================================

  function getCurrenWeather(lat, lon) {
    var apiKey = '312bdb80adf7dd8b05eda8e9064d9b1a';
    var queryUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';

    fetch(queryUrl)
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {

        //===================================================================== Get Current Weather ================================================================== 

        var cardContent1 = document.createElement('div');
        cardContent1.classList.add('card-text1');

        var dt1 = data.daily[0].dt;
        var date1 = document.createElement('p');
        date1.innerHTML = new Date(dt1 * 1000).toDateString();

        var icon1 = document.createElement('img');
        icon1.setAttribute('src', "https://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png");   // Doesn't work 

        var temp1 = document.createElement('p');
        temp1.innerHTML = "Temp (F): " + Math.floor(data.daily[0].temp.day)

        var humidity1 = document.createElement('p');
        humidity1.innerHTML = "Humidity: " + Math.floor(data.daily[0].humidity);

        var windSpeed1 = document.createElement('p');
        windSpeed1.innerHTML = "Wind Speed (MPH): " + Math.floor(data.daily[0].wind_speed);

        //============================================================================ Get UV index =========================================================================

        var uvIndex = document.createElement('p');
        uvIndex.classList.add('uvIndex');
        uvIndex.innerHTML = "UV Index: " + data.current.uvi;
        var currentUvi = data.current.uvi;

        if (currentUvi <= 2.99) {
          uvIndex.style.cssText = 'background-color: green; display: block; border-radius: 10px; padding: 5px;';
        } else if (currentUvi >= 3 && currentUvi <= 5.99) {
          uvIndex.style.cssText = 'background-color: gold; display: block; border-radius: 10px; padding: 5px;';
        } else if (currentUvi >= 6 && currentUvi <= 7.99) {
          uvIndex.style.cssText = 'background-color: darkorange; olivedrab; display: block; border-radius: 10px; padding: 5px;';
        } else {
          uvIndex.style.cssText = 'background-color: firebrick; display: block; border-radius: 10px; padding: 5px;';
        };

        //======================================================================= Display current weather and UV index =============================================================

        cardContent1.append(date1, icon1, temp1, humidity1, windSpeed1, uvIndex);    
        weatherCard1.append(cardContent1);
        weatherDiv.append(weatherCard1);

        //========================================================================== Get 5-day Forecast ====================================================================  

        for (var i = 1; i < 6; i++) {
          var cardContent = document.createElement('div');
          cardContent.classList.add('card-text');

          var dt = data.daily[i].dt;
          var date = document.createElement('p');
          date.innerHTML = new Date(dt * 1000).toDateString();

          var icon = document.createElement('img');
          icon.setAttribute('src', "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");

          var temp = document.createElement('p');
          temp.innerHTML = "Temp (F): " + Math.floor(data.daily[i].temp.day)

          var humidity = document.createElement('p');
          humidity.innerHTML = "Humidity: " + Math.floor(data.daily[i].humidity);

          var windSpeed = document.createElement('p');
          windSpeed.innerHTML = "Wind Speed (MPH): " + Math.floor(data.daily[i].wind_speed);

          var today = document.createElement('h3');
          var today = data.daily[0].dt;
          today.textContent = new Date(dt * 1000).toDateString();

          //======================================================================== Display 5-day Forecast ===================================================================

          cardContent.append(date, icon, temp, humidity, windSpeed);
          weatherCard.append(cardContent);
          forecast.append(weatherCard);
          weatherHead.appendChild(title);
        }
      });
  }

  //=============================================================================== Create a list of search histoy ================================================================

  function historyList() {
    cityList.textContent = "";
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    searchHistory.forEach(function (search) {
      var button = document.createElement('button');
      button.classList.add('btn')
      button.textContent = search;
      button.style.cssText = 'background-color: lightblue; margin: 5px; border-radius: 5px;'
      button.addEventListener("click", function () {
        console.log(search);
        getGeoLocation(search);
      });
      cityList.append(button);
    })
  }

  //============================================================================== Start event with click of search button ==============================================================

  searchBtn.addEventListener('click', function () {
    var searchInput = formEl.value.trim();
    getGeoLocation(searchInput);
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    deleteBtn.addEventListener('click', function () {
      localStorage.clear();
      cityList.textContent = "";
    })

    searchHistory.push(searchInput);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    historyList();
  });

});

