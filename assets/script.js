$(document).ready(function () {

  // Global variables to be used
  var searchBtn = document.getElementById('searchBtn');
  var formEl = document.getElementById('form1');
  var cityList = document.getElementById('city-list');
  var weatherDiv = document.getElementById('weather-container');
  var currentHead = document.getElementById('current-heading');
  var weatherHead = document.getElementById('weather-head');
  var forecast = document.getElementById('forecast');
  var weather = document.getElementById('weather');
  var foreDiv = document.getElementById('fore-container');
  var weatherCard = $("<div>").addClass("card");
  // var weatherCard = document.createElement('div');
  //   weatherCard.classList.add('card');
  var title = document.createElement('h3');
  title.classList.add('weather-title');
  // var title = $("<h3>").addClass('weather-title');



  function getGeoLocation() {
    var apiKey = '312bdb80adf7dd8b05eda8e9064d9b1a';
    var searchInput = formEl.value;
    var url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + '&limit=&appid=' + apiKey;
    console.log(searchInput); // null

    fetch(url)
      .then(function (response) {
        console.log('geolocation', response); //data
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
        weatherHead.appendChild(title);
        //  return data;

        console.log(name);
        weatherCard.innerHTML = "";
        // forecast.innerHTML = "";
        console.log('weather card:', weatherCard);
        console.log('forecast', forecast);
        forecast.append(weatherCard);
        getCurrenWeather(lat, lon);
        // historyList();
      });
  }

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
        // forecast.append(title);
        for (var i = 0; i < 5; i++) {
          var cardContent = $("<div>").addClass("card-content");
          var dt = data.daily[i].dt;
          // console.log("datetime", dt);
          var date = $("<p>").text(new Date(dt * 1000).toDateString());
          console.log("date/time", date);
          // var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");
          var temp = $("<p>").text("Temp (F): " + Math.floor(data.daily[i].temp.day));
          var humidity = $("<p>").text("Humidity: " + Math.floor(data.daily[i].humidity));
          var windSpeed = $("<p>").text("Wind Speed (MPH): " + Math.floor(data.daily[i].wind_speed));
          // cardContent.attr('style', "border-radius:20px;");
          console.log(cardContent);
          cardContent.append(date, temp, humidity, windSpeed);
          weatherCard.append(cardContent);
          forecast.append(weatherCard);
        }
      });
  }

  function historyList() {
    cityList.innerHTML = "";
    var searchHistory = JSON.parse(window.localStorage.getItem("searchHistory")) || [];
    searchHistory.forEach(function (search) {
      var button = $("<button>").addClass("btn").text(search);
      button.on("click", function () {
        getGeoLocation(search);
      });
      cityList.append(button);
    })
  }

  searchBtn.addEventListener('click', function () {
    var searchInput = formEl.value;
    getGeoLocation(searchInput);
    var searchHistory = JSON.parse(window.localStorage.getItem('search-history')) || [];
    searchHistory.push(searchInput);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    historyList();
  });

  // fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
  // .then((response) => {
  //     return response.json();
  //   console.log(data);
  // })
  // .catch((err) => {

  // });
})



