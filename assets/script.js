$(document).ready(function () {


  //====================================================================== Global variables ===================================================================

  // Global variables to be used
  var searchBtn = document.getElementById('searchBtn');
  var formEl = document.getElementById('form1');
  var cityList = document.getElementById('city-list');
  var weatherDiv = document.getElementById('weather-container');
  var currentHead = document.getElementById('current-heading');
  var weatherHead = document.getElementById('weather-head');
  var forecast = document.getElementById('forecast');
  // var weather = document.getElementById('weather');
  // var foreDiv = document.getElementById('fore-container');
  // var weatherCard = $("<div>").addClass("card");
  var weatherCard = document.createElement('div');
      weatherCard.classList.add('card-body');
  var weatherCard1 = document.createElement('div');
      weatherCard1.classList.add('card-body');
  var title = document.createElement('h3');
      title.classList.add('weather-title');
      
  // var title = $("<h3>").addClass('weather-title');


  // =============================================================== API call for geoloaction (lat/lon) ========================================================
  // Get lat and lon for city entered in input. Lat and lon is needed to get weather data

  function getGeoLocation() {
    var apiKey = '312bdb80adf7dd8b05eda8e9064d9b1a';
    var searchInput = formEl.value;
    var url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + '&limit=&appid=' + apiKey;
    console.log(searchInput); // null

    fetch(url)
      .then(function (response) {
        // console.log('geolocation', response); //data
        // var lat = re
        return response.json();
      })

      .then(function (data) {
        console.log('geolocation', data); // array of data including lat & lon
        var lat = data[0].lat;
        var lon = data[0].lon;
        console.log(lat, lon);
        var name = data[0].name;
        currentHead.style.display = 'none';
        title.textContent = (data[0].name);
        // weatherHead.appendChild(title);
        //  return data;

        console.log(name);
        // weatherCard.innerHTML = "";
        // forecast.innerHTML = "";
        console.log('weather card:', weatherCard);
        console.log('forecast', forecast);
        forecast.append(weatherCard);
        getCurrenWeather(lat, lon);
        // historyList();
      });
  }
  //============================================================== API call for weather data =============================================================

  function getCurrenWeather(lat, lon, name) {
    var apiKey = '312bdb80adf7dd8b05eda8e9064d9b1a';
    var queryUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';

    fetch(queryUrl)
      .then(function (response) {
        // console.log('current weather', response);
        return response.json();
      })

      .then(function (data) {
        console.log('current weather', data);


  //===================================================================== Get Current Weather ================================================================== 

        var cardContent1 = document.createElement('div');
          cardContent1.classList.add('card-text');  
          
        var dt1 = data.daily[0].dt;
        var date1 = document.createElement('p');
        date1.innerHTML = new Date(dt1 * 1000).toDateString();
        console.log("date/time", date1);

        var icon1 = document.createElement('img');
        icon1 = ('src', "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png");

        var temp1 = document.createElement('p');
        temp1.innerHTML = "Temp (F): " + Math.floor(data.daily[0].temp.day)

        var humidity1 = document.createElement('p');
        humidity1.innerHTML = "Humidity: " + Math.floor(data.daily[0].humidity);

        var windSpeed1 = document.createElement('p');
        windSpeed1.innerHTML = "Wind Speed (MPH): "  + Math.floor(data.daily[0].wind_speed);

        //============================================================================ Get UV index =========================================================================

          var uvIndex = document.createElement('p');
          uvIndex.innerHTML = "UV Index: " + data.current.uvi;

          if (uvIndex <= 2.99) {                  
            uvIndex = $("#uvIndex").css({"background-color": "olivedrab", "display": "block", "border-radius": "12px", "padding": "1.5%", "max-width": "20%"});
        } else if (uvIndex >= 3 & uvIndex <= 5.99) {
            uvIndex = $("#uvIndex").css({"background-color": "gold", "display": "block", "border-radius": "12px", "padding": "1.5%", "max-width": "20%"});
        } else if (uvIndex >= 6 & uvIndex <= 7.99) {
            uvIndex = $("#uvIndex").css({"background-color": "darkorange", "display": "block", "border-radius": "12px", "padding": "1.5%", "max-width": "20%"});
        } else if (uvIndex >= 8) {
            uvIndex = $("#uvIndex").css({"background-color": "firebrick", "display": "block", "border-radius": "12px", "padding": "1.5%", "max-width": "20%"});
        };

        //======================================================================= Display current weather and UV index =============================================================

        console.log(cardContent1);
        cardContent1.append(date1, temp1, humidity1, windSpeed1, uvIndex);
        weatherCard1.append(cardContent1);
        console.log(weatherCard1);
        weatherDiv.append(weatherCard1);

      //========================================================================== Get 5-day Forecast ====================================================================  

        for (var i = 1; i < 6; i++) {
          var cardContent = document.createElement('div');
            cardContent.classList.add('card-text');

          var dt = data.daily[i].dt;
          var date = document.createElement('p');
          date.innerHTML = new Date(dt * 1000).toDateString();
          console.log("date/time", date);

          // var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");
          var icon = document.createElement('img');
          icon = ('src', "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");

          var temp = document.createElement('p');
          temp.innerHTML = "Temp (F): " + Math.floor(data.daily[i].temp.day)

          var humidity = document.createElement('p');
          humidity.innerHTML = "Humidity: " + Math.floor(data.daily[i].humidity);

          var windSpeed = document.createElement('p');
          windSpeed.innerHTML = "Wind Speed (MPH): "  + Math.floor(data.daily[i].wind_speed);
          // cardContent.attr('style', "border-radius:20px;");

          var today = document.createElement('h3');
          var today = data.daily[0].dt;
          today.textContent = new Date(dt * 1000).toDateString();

          //======================================================================== Display 5-day Forecast ===================================================================

          console.log(cardContent);
          cardContent.append(date, temp, humidity, windSpeed);
          weatherCard.append(cardContent);
          console.log(weatherCard);
          forecast.append(weatherCard);
          console.log(forecast);
          weatherHead.appendChild(title);
     
        }
        
      });
  }

  //=============================================================================== Create a list of search histoy ================================================================

  function historyList() {
    // cityList.innerHTML = "";
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    
    searchHistory.forEach(function (search) {
      // var button = $("<button>").addClass("btn").text(search);
      var button = document.createElement('button');
      button.classList.add('btn')
      button.textContent = search;
      button.addEventListener("click", function () {
        getGeoLocation(search);
      });
      cityList.append(button);
    })
  }


  //============================================================================== Start event with click of search button ==============================================================

  searchBtn.addEventListener('click', function () {
    var searchInput = formEl.value;
    getGeoLocation(searchInput);
    var searchHistory = JSON.parse(localStorage.getItem('search-history')) || [];
    searchHistory.push(searchInput); // push(searchHistory)?
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    historyList();
  });

})

