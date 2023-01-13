//varibles for getting the data
var searchButton = $("#searchButton")
var searchForm = $("#searchForm")
var searchCity = $("#searchCity")
var searchState = $("#searchState")
var searchZip = $("#searchZip")
var cityName = $("#cityName")
var days = $(".card")
var currentDay = dayjs("MMM DD, YYYY")
var lat = 0
var long = 0
var cityData = ""

searchButton.on("click", function (event) {
    event.preventDefault()
    cityData = searchCity.val() + "," + searchState.val() + "," + searchZip.val()
    var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityData + "&appid=82b6f72e416a643fc9c8ad973faf1aa5"
    console.log(cityData)
    //parsing through the data
    fetch(geoURL)
        .then(function (reponse) {
            if (reponse.status === 400) {
                return
            } else {
                return reponse.json()
            }
        })
        .then(function (data) {
            console.log(data)
        })
})


//setting the elements in the html to data varibles
//pushing the searches to the localStorages
//retrieving the searches to populate