// time and date start //

const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const userName = document.querySelector(".name");
const hours = new Date().getHours();
const body = document.querySelector(".body");
const sliderLeft = document.querySelector(".slide-prev");
const sliderRight = document.querySelector(".slide-next");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");
const city = document.querySelector(".city");

let randomNum;

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();

  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
  showGreeting();
}
showTime();

function showDate() {
  const currentDate = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  date.textContent = currentDate;
}

// time and date end //

// greetings start //

function getTimeOfDay() {
  let timeOfDay;

  if (hours >= 0 && hours < 6) {
    timeOfDay = "night";
  } else if (hours >= 6 && hours < 12) {
    timeOfDay = "morning";
  } else if (hours >= 12 && hours < 18) {
    timeOfDay = "afternoon";
  } else if (hours >= 18 && hours < 24) {
    timeOfDay = "evening";
  }
  return timeOfDay;
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}, `;
  greeting.textContent = greetingText;
}

function setLocalStorage() {
  localStorage.setItem("name", userName.value);
  localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    userName.value = localStorage.getItem("name");
  }

  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
}
window.addEventListener("load", getLocalStorage);

// if (userName.value == '[Enter name]') {userName.value = '';};
// if (thuserNameis.value == '') {userName.value = '[Enter name]';};

// greetings end //

// background start //

function getRandomNum() {
  randomNum = Math.ceil(Math.random() * 20);
}

getRandomNum();

function setBg() {
  let bgNum = randomNum.toString().padStart(2, "0");
  let timeOfDay = getTimeOfDay();
  const img = new Image();

  img.src = `https://github.com/CoracaoDoMundo/momentum-backgrounds/blob/main/${timeOfDay}/${bgNum}.webp?raw=true`;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  };
}

setBg();

// background end //

// background slider start //

function getSlideNext() {
  if (randomNum >= 20) {
    randomNum = 1;
  } else {
    randomNum++;
  }
  setBg();
}

function getSlidePrev() {
  if (randomNum <= 1) {
    randomNum = 20;
  } else {
    randomNum--;
  }
  setBg();
}

sliderRight.addEventListener("click", getSlideNext);
sliderLeft.addEventListener("click", getSlidePrev);

// background slider end //

//weather widget start //

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=57647143539481b4b87c1025aa2843b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  city.value = "Houston";

  try {
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherError.textContent = null;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `wind speed: ${data.wind.speed} m/s`;
    humidity.textContent = `humidity: ${data.main.humidity} %`;
  } catch {
    weatherError.textContent = `City is not found! \n Please, try again.`;
    weatherIcon.className = null;
    temperature.textContent = null;
    weatherDescription.textContent = null;
    wind.textContent = null;
    humidity.textContent = null;
  }
}
// getWeather();

city.addEventListener("blur", getWeather);
city.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

//weather widget end //
