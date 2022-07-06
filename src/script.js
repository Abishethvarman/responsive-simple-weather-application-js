/* Fetching Data from OpenWeatherMap API */
let weather = {
  apiKey: "aba6ff9d6de967d5eac6fd79114693cc",
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" +city +"&units=metric&appid=" +this.apiKey)
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
      // .then((displayWeather) => this.message1(displayWeather));
  },
  displayWeather: function (data) {
    const { name, visibility,timezone } = data;
    const { icon, description, main } = data.weather[0];
    // const { lat,lon } = data.coord[0];
    const { temp, humidity, feels_like, temp_min, temp_max, pressure } = data.main;
    const { speed } = data.wind;
    const { country,sunrise,sunset } = data.sys;

    document.querySelector(".city").innerText = "Weather in " + name+", "+country;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".main").innerText = "Mainly " + main;
    document.querySelector(".sunrise").innerText = "Sunrise " + moment.utc(sunrise,'X').add(timezone,'seconds').format('HH:mm a');
    document.querySelector(".sunset").innerText = "Sunset at " + moment.utc(sunset,'X').add(timezone,'seconds').format('HH:mm a');
    document.querySelector(".description").innerText = description;
    // document.querySelector(".visibility").innerText = visibility;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".feels_like").innerText ="Feels Like: " + feels_like + "°C";
    document.querySelector(".temp_min").innerText = "Minimum Temperature: " + temp_min + "°C";
    document.querySelector(".temp_max").innerText = "Maximum Temperature: " + temp_max + "°C";
    document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
    document.querySelector(".pressure").innerText ="Pressure: " + pressure + "Hg";
    document.querySelector(".wind").innerText ="Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + name + "')";
    document.querySelector(".temp").innerText = temp + "°C";

  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

/* Fetching Data from OpenCageData Geocoder */
let geocode = {
  reverseGeocode: function (latitude, longitude) {
    var apikey = "90a096f90b3e4715b6f2e536d934c5af";

    var api_url = "https://api.opencagedata.com/geocode/v1/json";

    var request_url =api_url +"?" +"key=" +apikey +"&q=" +encodeURIComponent(latitude + "," + longitude) +"&pretty=1" +"&no_annotations=1";
    var request = new XMLHttpRequest();
    request.open("GET", request_url, true);

    request.onload = function () {

      if (request.status == 200) {
        var data = JSON.parse(request.responseText);
        weather.fetchWeather(data.results[0].components.city);
        console.log(data.results[0].components.city)
      } else if (request.status <= 500) {

        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log("error msg: " + data.status.message);
      } else {
        console.log("server error");
      }
    };

    request.onerror = function () {
      console.log("unable to connect to server");
    };

    request.send(); 
  },
  getLocation: function() {
    function success (data) {
      geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, console.error);
    }
    else {
      weather.fetchWeather("Jaffna");
    }
  }
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Jaffna");

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

geocode.getLocation();

function msg1() {
  let atemp = document.getElementById("temp").innerHTML;

  if(atemp>30){
    document.querySelector(".atemp").innerText =  "Veyil koluthuthu. Konjam melliya cotton sattaiya pottu ponga. Nalla thanni kudinga. 3L minimum sollipottan";
  }
  else{
    document.querySelector(".atemp").innerText =  "Nallarukenna ithama?  ";
  };
  
}

function msg2() {
  let aMain = document.getElementById("main").innerHTML;
  // document.querySelector(".atemp").innerText = atemp + "indaikku malai ";
  // let btemp;
  switch(aMain) {
    case 'Thunderstorm':
      document.querySelector(".aMain").innerText =  "Indaikku idikkum kavanam";
      break;
    case 'Drizzle' :
      document.querySelector(".aMain").innerText =  "Thoothala irukkum kavanam. Thadumalakkum";
      break;
    case 'Rain':
      document.querySelector(".aMain").innerText =   "Mazhai peyyapoguthu. Kudaiyoda ponga. Rain coat um kondu ponga";
      break;
    case 'Snow':
      document.querySelector(".aMain").innerText = "Pani peiyuthu sweater oda ponga";
      break;
     case 'Clear':
      document.querySelector(".aMain").innerText = "Vaanam summa palichendu irukku";
      break;
    case 'Clouds':
      document.querySelector(".aMain").innerText = "Vaanam mekamootathodu kaanapadum";
      break;

    default:
      document.querySelector(".aMain").innerText = "intha naal iniya naal aaka amaiyattum";
  };
  
}

function msg3() {
  let aMain2 = document.getElementById("main").innerHTML;
  // document.querySelector(".atemp").innerText = atemp + "indaikku malai ";
  // let btemp;
  if(aMain2=="Clear"){
    document.querySelector(".aMain2").innerText = "Ippa nallam velikkala seyatpaadukalukku";
  }
  else if(aMain2=="Clear Sky"){
    document.querySelector(".aMain2").innerText = "Ippa nallam velikkala seyatpaadukalukku";
  }
  else{
    document.querySelector(".aMain2").innerText =  "Kastam Bro";
  };
  
}
