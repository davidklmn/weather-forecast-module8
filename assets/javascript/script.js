//? When a user views the current weather conditions for that city they are presented with:

$("#search-button").on("click", function (e) {
  e.preventDefault();
  // * API key
  let apiKey = "92bb3d5ac67633cb5575c35bd3db54b4";
  // * Searched city input
  let searchedCity = $("#search-input").val();
  // * geocoding API
  let geoCoding =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    searchedCity +
    "&appid=" +
    apiKey;

  // ! Geocoding, getting the lat-lon for the searched city
  $.ajax({
    url: geoCoding,
    method: "GET",
  }).then(function (response) {
    let cityLat = response[0].lat.toFixed(2);
    let cityLon = response[0].lon.toFixed(2);
    // ! Weather API
    let queryURL =
      "http://api.openweathermap.org/data/2.5/forecast?lat=" +
      cityLat +
      "&lon=" +
      cityLon +
      "&appid=" +
      apiKey +
      "&units=metric";
    // * Weather AJAX function
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      // ! Today section
      let today = $("#today");
      today.empty();
      today.css("border", "1px solid black").css("padding", "0.5rem");
      // * The city name
      let cityName = $("<h2>");
      cityName.text(response.city.name);
      today.append(cityName);
      // * The date
      let currentDate = moment().format(" (D/M/YYYY)");
      cityName.append(currentDate);
      // * An icon representation of weather conditions
      let apiIcon = response.list[0].weather[0].icon;
      let weatherIcon = $("<img>");
      weatherIcon.css("display", "inline");
      weatherIcon.attr(
        "src",
        "http://openweathermap.org/img/wn/" + apiIcon + ".png"
      );
      cityName.append(weatherIcon);
      // * The temperature
      let temp = $("<p>");
      temp.text("Temp: " + response.list[0].main.temp.toFixed(2) + " °C");
      today.append(temp);
      // * The humidity
      let hum = $("<p>");
      hum.text("Humidity: " + response.list[0].main.humidity + " %");
      today.append(hum);
      // * The wind speed
      let wind = $("<p>");
      wind.text("Wind: " + response.list[0].wind.speed);
      today.append(wind);

      // ? When a user views future weather conditions for that city they are presented with a 5-day forecast that displays:
      // ! Forecast section
      let forecast = $("#forecast");
      let forecastContainer = $("<div>");
      let forecastTitle = $("<h3>");
      forecastContainer.css("padding", "15px");
      forecastTitle.text("5-Day Forecast");
      forecastContainer.append(forecastTitle);
      for (let i = 0; i < 6; i++) {
        // * The date
        let forecastDate;
        // * An icon representation of weather conditions
        // * The temperature
        // * The humidity
        forecast.append(forecastContainer);
      }
    });
  });
});

//? When a user clicks on a city in the search history they are again presented with current and future conditions for that city.

//? When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history.
