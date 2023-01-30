//* When a user views the current weather conditions for that city they are presented with:
let cityLat;
let cityLon;
let queryURL;
// API key
let apiKey = "92bb3d5ac67633cb5575c35bd3db54b4";

$("#search-button").on("click", function (e) {
  e.preventDefault();
  // Searched city input
  let searchedCity = $("#search-input").val();
  // geocoding API
  let geoCoding =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    searchedCity +
    "&appid=" +
    apiKey;
  //   weather API

  // Geocoding, getting the lat-lon for the searched city
  $.ajax({
    url: geoCoding,
    method: "GET",
  }).then(function (response) {
    cityLat = response[0].lat.toFixed(2);
    cityLon = response[0].lon.toFixed(2);
    console.log(cityLat, cityLon);
    queryURL =
      "http://api.openweathermap.org/data/2.5/forecast?lat=" +
      cityLat +
      "&lon=" +
      cityLon +
      "&appid=" +
      apiKey;
    // Weather AJAX function
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      //   Today section
      let today = $("#today");
      // The city name
      let cityName = $("<h2>");
      cityName.text(response.city.name);
      today.append(cityName);
      // The date
      let currentDate = moment().format(" (D/M/YYYY)");
      cityName.append(currentDate);
      // An icon representation of weather conditions
      let apiIcon = response.list[0].weather.icon;
      let weatherIcon = $("<img");
      weatherIcon.attr(
        "src",
        "http://openweathermap.org/img/wn/" + apiIcon + ".png"
      );
      console.log(weatherIcon);
      today.append(weatherIcon);
      // The temperature
      // The humidity
      // The wind speed
    });
  });
});

//* When a user views future weather conditions for that city they are presented with a 5-day forecast that displays:
// The date
// An icon representation of weather conditions
// The temperature
// The humidity

//* When a user clicks on a city in the search history they are again presented with current and future conditions for that city.

//* When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history.
