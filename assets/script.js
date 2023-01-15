//varibles for getting the data
var searchButton = $("#searchButton")
var searchForm = $("#searchForm")
var searchCity = $("#searchCity")
var searchState = $("#searchState")
var searchZip = $("#searchZip")
var cityName = $("#cityName")
var days = $(".card")
var currentDay = dayjs("MMM DD, YYYY")
var latAndLon = []
var cityData = ""
var weatherData = {}

searchButton.on("click", function (event) {
    event.preventDefault()
    getLocation()
    populateData()

})

function getLocation() {
    cityData = searchCity.val() + "," + searchState.val() + "," + searchZip.val()
    var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityData + "&appid=82b6f72e416a643fc9c8ad973faf1aa5"
    //parsing through the data
    fetch(geoURL)
        .then(function (reponse) {
            return reponse.json()
        })
        .then(function (data) {
            latAndLon.push(data[0].lat)
            latAndLon.push(data[0].lon)
            getWeather()
        })
}
function getWeather() {
    fetch('https://api.openweathermap.org/data/3.0/onecall?lat=' + latAndLon[0] + '&lon=' + latAndLon[1] + '&appid=82b6f72e416a643fc9c8ad973faf1aa5')
        .then(function (reponse) {
            return reponse.json()
        })
        .then(function (data) {
            weatherData = data
            console.log(weatherData)
        })

}
function populateData() {
    
}

//setting the elements in the html to data varibles
//pushing the searches to the localStorages
//retrieving the searches to populate