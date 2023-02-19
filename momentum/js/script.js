import playList from "./playList.js";

const time = document.querySelector(".time"),
  date = document.querySelector(".date"),
  greeting = document.querySelector(".greeting"),
  userName = document.querySelector(".name"),
  hours = new Date().getHours(),
  body = document.querySelector(".body"),
  sliderLeft = document.querySelector(".slide-prev"),
  sliderRight = document.querySelector(".slide-next"),
  weatherIcon = document.querySelector(".weather-icon"),
  temperature = document.querySelector(".temperature"),
  weatherDescription = document.querySelector(".weather-description"),
  wind = document.querySelector(".wind-speed"),
  humidity = document.querySelector(".humidity"),
  weatherError = document.querySelector(".weather-error"),
  city = document.querySelector(".city"),
  quote = document.querySelector(".quote"),
  author = document.querySelector(".author"),
  quoteBtn = document.querySelector(".change-quote"),
  audio = document.querySelector(".audio"),
  playBtn = document.querySelector(".play"),
  prevBtn = document.querySelector(".play-prev"),
  nextBtn = document.querySelector(".play-next"),
  playListContainer = document.querySelector(".play-list");

city.value = "Minsk";

let randomNum,
  isPlay = false,
  trackNum = 0;

// local storage usage start //

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
window.addEventListener("load", getWeather);

// local storage usage end //

// time and date start //

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString("en-us", { hourCycle: "h23" });

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
    hourCycle: "h23",
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
  } else {
    throw alert("Time is incorrect!");
  }

  return timeOfDay;
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}, `;
  greeting.textContent = greetingText;
}

// greetings end //

// background start //

function getRandomNum(limit) {
  randomNum = Math.ceil(Math.random() * limit);
  return randomNum;
}

function setBg() {
  if (randomNum === undefined) {
    getRandomNum(20);
  }

  let bgNum = randomNum.toString().padStart(2, "0");
  let timeOfDay = getTimeOfDay();
  const img = new Image();

  img.src = `https://github.com/CoracaoDoMundo/momentum-backgrounds/blob/main/${timeOfDay}/${bgNum}.webp?raw=true`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
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

  try {
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherError.textContent = null;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `wind speed: ${Math.round(data.wind.speed)} m/s`;
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

city.addEventListener("blur", getWeather);
city.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

//weather widget end //

// quotes widget start //

async function getQuotes() {
  const quotes = "js/data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  let randomQuoteNum = getRandomNum(data.length);

  quote.textContent = data[randomQuoteNum].text;
  author.textContent = data[randomQuoteNum].author;
}
getQuotes();

quoteBtn.addEventListener("click", getQuotes);

// quotes widget end //

// audio player widget start //

for (let el = 0; el < playList.length; el++) {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = playList[el].title;
  playListContainer.append(li);
}

let songsTitles = document.querySelectorAll(".play-item");

function toggleBtn() {
  if (!isPlay) {
    playBtn.classList.add("pause");
    playAudio();
  } else {
    playBtn.classList.remove("pause");
    playAudio();
  }
}

function deleteSongsItemsSelection() {
  songsTitles.forEach((el) => {
    el.classList.remove("item-active");
  });
}

function startAudio() {
  audio.src = playList[trackNum].src;
  audio.currentTime = 0;
  audio.play();
  songsTitles.forEach((el, i) => {
    if (trackNum === i) {
      el.classList.add("item-active");
    }
  });
}

function playAudio() {
  if (!isPlay) {
    startAudio();
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
    deleteSongsItemsSelection();
  }
}

function playNext() {
  if (trackNum < playList.length - 1) {
    trackNum++;
  } else if (trackNum === playList.length - 1) {
    trackNum = 0;
  } else {
    throw alert("Error! Not correct number of track.");
  }
  deleteSongsItemsSelection();
  startAudio();
}

function playPrev() {
  if (trackNum > 0 && trackNum <= playList.length - 1) {
    trackNum--;
  } else if (trackNum === 0) {
    trackNum = `${playList.length}` - 1;
  } else {
    throw alert("Error! Not correct number of track.");
  }
  deleteSongsItemsSelection();
  startAudio();
}

playBtn.addEventListener("click", toggleBtn);
prevBtn.addEventListener("click", playPrev);
nextBtn.addEventListener("click", playNext);
audio.addEventListener("ended", playNext);

// audio player widget end //
