var type = 2;

function myTimer() {
  if (type === 1) getSimpletonTime();
  else getProgrammerTime();
}

function getCurTime() {
  var current = new Date();
  var hrs = current.getHours() % 12 || 12;
  var min = current.getMinutes();
  var sec = current.getSeconds();
  return [hrs, min, sec];
}

function getSimpletonTime() {
  var time = getCurTime();
  document.querySelector(".hrs").innerText = time[0];
  document.querySelector(".min").innerText = time[1];
  document.querySelector(".sec").innerText = time[2];
}
function getProgrammerTime() {
  var time = getCurTime();
  document.querySelector(".hrs").innerText = time[0].toString(2);
  document.querySelector(".min").innerText = time[1].toString(2);
  document.querySelector(".sec").innerText = time[2].toString(2);
}
function changeTimeType() {
  var checkBox = document.getElementById("check");
  if (checkBox.checked == true) {
    type = 2;
  } else {
    type = 1;
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  console.log(position);
  console.log(position.coords.latitude);
  userAction(position.coords.latitude, position.coords.longitude);
}

const userAction = async (lat, lon) => {
  let myJson;
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=metric&appid=74d03fa36147c48fcc230cd738144e66"
    );
    myJson = await response.json(); //extract JSON from the http response
  } catch (e) {
    console.log(e);
  }

  document.getElementById("weather-icon").src =
    "./weather/" + myJson.weather[0].icon + ".png";
  console.log(myJson.main.temp_min);
  document.getElementById("temp").innerHTML =
    Math.floor(myJson.main.temp) + `<sup><sup>o</sup>c</sup>`;
  document.getElementById("description").innerHTML =
    myJson.weather[0].description[0].toUpperCase() +
    myJson.weather[0].description.slice(1);
  document.getElementById("humidity").innerHTML =
    `<i class="fas fa-tint"></i> ` + myJson.main.humidity;
  document.getElementById("pressure").innerHTML =
    `<i class="fas fa-tachometer-alt"></i>  ` + myJson.main.pressure;
  document.getElementById("location").innerHTML = myJson.name;
  console.log(myJson);
  console.log(myJson.weather[0].main);
};

getLocation();
setInterval(myTimer, 500);
