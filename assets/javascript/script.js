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
      // Variables
      let forecast = $("#forecast");
      let forecastContainer = $("<div>");
      let forecastTitle = $("<h3>");
      // Empty the forecast container after a new search
      forecast.empty();
      forecastContainer.css("padding", "15px");
      forecastTitle.text("5-Day Forecast");
      forecastContainer.append(forecastTitle);

      for (let i = 7; i < 40; i += 8) {
        // Forecast day container
        let forecastDayContainer = $("<div>");
        // * The date
        let forecastDateContainer = $("<h4>");
        let forecastDate = moment(
          response.list[i].dt_txt,
          "YYYY-MM-DD HH:mm:ss"
        ).format("D/M/YYYY");
        forecastDateContainer.css("font-size", "1.25rem");
        forecastDateContainer.append(forecastDate);
        forecastDayContainer.append(forecastDateContainer);
        // * An icon representation of weather conditions
        let apiIcon = response.list[i].weather[0].icon;
        let weatherIcon = $("<img>");
        weatherIcon.css("display", "inline");
        weatherIcon.attr(
          "src",
          "http://openweathermap.org/img/wn/" + apiIcon + ".png"
        );
        forecastDayContainer.append(weatherIcon);
        // * The temperature
        let temp = $("<p>");
        temp.text("Temp: " + response.list[i].main.temp.toFixed(2) + " °C");
        forecastDayContainer.append(temp);
        // * The humidity
        let hum = $("<p>");
        hum.text("Humidity: " + response.list[i].main.humidity + " %");
        forecastDayContainer.append(hum);
        // * The wind speed
        let wind = $("<p>");
        wind.text("Wind: " + response.list[i].wind.speed);
        forecastDayContainer.append(wind);

        // Formatting the containers
        forecastDayContainer
          .css("display", "inline-block")
          .css("width", "400px")
          .css("background-color", "#2D3E50")
          .css("color", "white")
          .css("margin-right", "25px");
        forecastDayContainer.attr("class", "col-lg-2");
        // Pushing everything into the daily containers
        forecastContainer.append(forecastDayContainer);
        forecast.append(forecastContainer);
      }
    });
  });
});

("2023-01-31 18:00:00");
("YYYY-MM-DD HH:mm:ss");
//? When a user clicks on a city in the search history they are again presented with current and future conditions for that city.

//? When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history.
