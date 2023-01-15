//varibles for getting the data
var searchButton = $("#searchButton")
var searchForm = $("#searchForm")
var searchCity = $("#searchCity")
var searchState = $("#searchState")
var searchZip = $("#searchZip")
var cityName = $("#cityName")
var days = $(".card")
var currentDay = dayjs().format("MMM DD, YYYY")
var latAndLon = []
var cityData = ""
var weatherData = {}
var currentWeather = $("#cityName")
searchButton.on("click", function (event) {
    event.preventDefault()
    getLocation()
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
    fetch('https://api.openweathermap.org/data/3.0/onecall?lat=' + latAndLon[0] + '&lon=' + latAndLon[1] + '&units=imperial&appid=82b6f72e416a643fc9c8ad973faf1aa5')
        .then(function (reponse) {
            return reponse.json()
        })
        .then(function (data) {
            weatherData = data
            console.log(weatherData)
            populateData()
        })

}
function populateData() {
    currentWeather.append("<h2>" + cityData + "</h2")
    currentWeather.append("<div>" + currentDay + "</div>")
    var weatherId = weatherData.current.weather[0].id
    if (weatherId < 300 && weatherId >= 200) {
        currentWeather.append("<div> &#127785 </div>")
    } else if (weatherId < 600 && weatherId >= 300) {
        currentWeather.append("<div> &#9748 </div>")
    } else if (weatherId < 700 && weatherId >= 600) {
        currentWeather.append("<div> &#127784 </div>")
    } else if (weatherId < 800 && weatherId >= 700) {
        currentWeather.append("<div> &#127786 </div>")
    } else if (weatherId == 800) {
        currentWeather.append("<div> &#127774 </div>")
    } else {
        currentWeather.append("<div> &#127780 </div>")
    }
    currentWeather.append("<div> Tempature: " + weatherData.current.temp + "F</div>")
    currentWeather.append("<div> Wind: " + weatherData.current.wind_speed + "MPH</div>")
    currentWeather.append("<div> Humidity: " + weatherData.current.humidity + "% </div>")
    $.each(days, function (i, v) {
        $(this).append("<h4 class='card-title'>" + dayjs().add(i + 1, 'day').format("MMM DD, YYYY") + "</h4>")
        $(this).append("<div class='card-body'></div>")
        var icon = weatherData.daily[i].weather[0].id
        if (icon < 300 && icon >= 200) {
            $(this).append("<div class='card-text'> &#127785 </div>")
        } else if (icon < 600 && icon >= 300) {
            $(this).append("<div class='card-text'> &#9748 </div>")
        } else if (icon < 700 && icon >= 600) {
            $(this).append("<div class='card-text'> &#127784 </div>")
        } else if (icon < 800 && icon >= 700) {
            $(this).append("<div class='card-text'> &#127786 </div>")
        } else if (icon == 800) {
            $(this).append("<div class='card-text'> &#127774 </div>")
        } else {
            $(this).append("<div class='card-text'> &#127780 </div>")
        }
        $(this).append("<div class='card-text'> High: " + weatherData.daily[i].temp.max + "F</div>")
        $(this).append("<div class='card-text'> Low:" + weatherData.daily[i].temp.min + "F</div>")
    })
}

//setting the elements in the html to data varibles
//pushing the searches to the localStorages
//retrieving the searches to populate