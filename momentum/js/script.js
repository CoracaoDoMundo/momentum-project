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
  playListContainer = document.querySelector(".play-list"),
  trackName = document.querySelector(".current-track-name"),
  trackDuration = document.querySelector(".durationTime"),
  soundBtn = document.querySelector(".sound-btn"),
  volumeBar = document.querySelector(".volume-level-bar"),
  progressBar = document.querySelector(".audio-progress-bar"),
  currentTrackTime = document.querySelector(".currentTime"),
  greetingTranslation = {
    en: ["Good"],
    ru: ["Доброе", "Добрый", "Доброй"],
  },
  weatherTranslation = {
    en: ["wind speed", "humidity", "m/s"],
    ru: ["скорость ветра", "влажность", "м/с"],
  };

city.value = "Minsk";

let randomNum,
  isPlay = false,
  trackNum = -1,
  lang = greeting.getAttribute("lang");

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
  let locales;
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hourCycle: "h23",
  };
  switch (lang) {
    case "ru":
      locales = "ru-RU";
      break;
    case "en":
      locales = "en-US";
      break;
  }
  const currentDate = new Date().toLocaleDateString(locales, options);
  date.textContent = currentDate
    .split(" ")
    .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
    .join(" ");
}

// time and date end //

// greetings start //

function getTimeOfDay(lang) {
  let timeOfDay;

  switch (lang) {
    case "en":
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
      break;
    case "ru":
      if (hours >= 0 && hours < 6) {
        timeOfDay = "ночи";
      } else if (hours >= 6 && hours < 12) {
        timeOfDay = "утро";
      } else if (hours >= 12 && hours < 18) {
        timeOfDay = "день";
      } else if (hours >= 18 && hours < 24) {
        timeOfDay = "вечер";
      } else {
        throw alert("Передано неправильное время!");
      }
      break;
  }
  return timeOfDay;
}

function showGreeting() {
  const timeOfDay = getTimeOfDay(lang);
  let greetingText;

  if (lang === "en") {
    userName.setAttribute("placeholder", "[Enter name]");
    greetingText = `${greetingTranslation[lang]} ${timeOfDay}, `;
  } else if (lang === "ru") {
    userName.setAttribute("placeholder", "[Введите имя]");
    if (timeOfDay === "день" || timeOfDay === "вечер") {
      greetingText = `${greetingTranslation[lang][1]} ${timeOfDay}, `;
    } else if (timeOfDay === "утро") {
      greetingText = `${greetingTranslation[lang][0]} ${timeOfDay}, `;
    } else if (timeOfDay === "ночи") {
      greetingText = `${greetingTranslation[lang][2]} ${timeOfDay}, `;
    }
  }
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
  let timeOfDay = getTimeOfDay("en");
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
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=57647143539481b4b87c1025aa2843b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  try {
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherError.textContent = null;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${weatherTranslation[lang][0]}: ${Math.round(
      data.wind.speed
    )} ${weatherTranslation[lang][2]}`;
    humidity.textContent = `${weatherTranslation[lang][1]}: ${data.main.humidity} %`;
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

  switch (lang) {
    case "ru":
      quote.textContent = data[randomQuoteNum].text_ru;
      author.textContent = data[randomQuoteNum].author_ru;
      break;
    case "en":
      quote.textContent = data[randomQuoteNum].text;
      author.textContent = data[randomQuoteNum].author;
      break;
  }
}
getQuotes();

quoteBtn.addEventListener("click", getQuotes);

// quotes widget end //

// audio player widget start //

function formPlaylist() {
  for (let el = 0; el < playList.length; el++) {
    const li = document.createElement("li");
    li.classList.add("playlist-item");
    const trackNameText = document.createElement("p");
    trackNameText.classList.add("play-item");
    switch (lang) {
      case "ru":
        trackNameText.textContent = `${el + 1}. ${playList[el].title_ru}`;
        break;
      case "en":
        trackNameText.textContent = `${el + 1}. ${playList[el].title}`;
        break;
    }
    playListContainer.append(li);
    li.append(trackNameText);
    const smPlayBtn = document.createElement("div");
    smPlayBtn.classList.add("play-pause-track-btn");
    li.append(smPlayBtn);
  }
}

formPlaylist();

let songsTitles = document.querySelectorAll(".play-item"),
  playPauseSmBtns = document.querySelectorAll(".play-pause-track-btn");

function toggleBtn() {
  if (!isPlay) {
    playBtn.classList.add("pause");
    startTrack();
  } else {
    playBtn.classList.remove("pause");
    pauseTrack();
  }
}

function deleteSongsItemsSelection() {
  songsTitles.forEach((el) => {
    el.classList.remove("item-active");
  });
}

function deleteSmBtnsSelection() {
  playPauseSmBtns.forEach((el) => {
    el.style.opacity = "0";
  });
}

function startNewTrack() {
  audio.src = playList[trackNum].src;
  audio.play();
  translateTrackName();
  trackDuration.textContent = `${playList[trackNum].duration}`;
  songsTitles.forEach((el, i) => {
    if (trackNum === i) {
      el.classList.add("item-active");
    }
    measureProgressBar();
  });
  playPauseSmBtns.forEach((el, i) => {
    if (trackNum === i) {
      el.style.opacity = "1";
    }
  });
  playPauseSmBtns[trackNum].classList.remove("play-track-btn");
}

function startTrack() {
  if (trackName.textContent === "") {
    audio.src = playList[trackNum].src;
    translateTrackName();
    trackDuration.textContent = `${playList[trackNum].duration}`;
  }
  isPlay = true;
  audio.play();
  songsTitles.forEach((el, i) => {
    if (trackNum === i) {
      el.classList.add("item-active");
    }
    measureProgressBar();
  });
  playPauseSmBtns.forEach((el, i) => {
    if (trackNum === i) {
      el.style.opacity = "1";
    }
  });
  playPauseSmBtns[trackNum].classList.remove("play-track-btn");
}

function pauseTrack() {
  isPlay = false;
  audio.pause();
  playPauseSmBtns[trackNum].classList.add("play-track-btn");
}

function playNext() {
  if (!playBtn.classList.contains("pause")) {
    playBtn.classList.add("pause");
  }

  if (trackNum < playList.length - 1) {
    trackNum++;
  } else if (trackNum === playList.length - 1) {
    trackNum = 0;
  } else {
    throw alert("Error! Not correct number of track.");
  }
  deleteSongsItemsSelection();
  deleteSmBtnsSelection();
  startNewTrack();
}

function playPrev() {
  if (!playBtn.classList.contains("pause")) {
    playBtn.classList.add("pause");
  }

  if (trackNum > 0 && trackNum <= playList.length - 1) {
    trackNum--;
  } else if (trackNum === 0) {
    trackNum = `${playList.length}` - 1;
  } else {
    throw alert("Error! Not correct number of track.");
  }
  deleteSongsItemsSelection();
  deleteSmBtnsSelection();
  startNewTrack();
}

playBtn.addEventListener("click", toggleBtn);
prevBtn.addEventListener("click", playPrev);
nextBtn.addEventListener("click", playNext);
audio.addEventListener("ended", playNext);

// audio player widget end //

// advanced audio player start //

function muteSound() {
  if (!soundBtn.classList.contains("sound-off")) {
    soundBtn.classList.add("sound-off");
    audio.muted = true;
  } else {
    soundBtn.classList.remove("sound-off");
    audio.muted = false;
  }
}

soundBtn.addEventListener("click", muteSound);

function controlVolume() {
  audio.volume = volumeBar.value;

  volumeBar.addEventListener("input", () => {
    volumeBar.style.background =
      "linear-gradient(to right, rgb(197, 179, 88), rgb(197, 179, 88)" +
      100 * volumeBar.value +
      "%, \n#ffffff " +
      100 * volumeBar.value +
      "%, \n#ffffff)";
  });
}

volumeBar.addEventListener("input", controlVolume);

// Функция контроля маленькими кнопками рядом с треком:

function controlBySmBtns() {
  playPauseSmBtns.forEach((el) => {
    el.addEventListener("click", () => {
      if (isPlay === true) {
        el.classList.add("play-track-btn");
        audio.pause();
        isPlay = false;
        playBtn.classList.remove("pause");
      } else {
        el.classList.remove("play-track-btn");
        audio.play();
        isPlay = true;
        playBtn.classList.add("pause");
      }
    });
  });
}

controlBySmBtns();

function controlByClickOnItem() {
  songsTitles.forEach((el, i) => {
    el.addEventListener("click", () => {
      let x = trackNum;
      trackNum = i;
      console.log(x);
      console.log(i);
      if (!isPlay) {
        if (x === -1) {
          startNewTrack();
        } else if (i === x) {
          startTrack();
        } else {
          deleteSongsItemsSelection();
          deleteSmBtnsSelection();
          startNewTrack();
        }
        isPlay = true;
        playBtn.classList.add("pause");
      } else {
        if (i === x) {
          pauseTrack();
          playBtn.classList.remove("pause");
          isPlay = false;
        } else {
          deleteSongsItemsSelection();
          deleteSmBtnsSelection();
          startNewTrack();
        }
      }
    });
  });
}

controlByClickOnItem();

function measureProgressBar() {
  let barWidth = playList[trackNum].duration.split(":");
  let minSec = barWidth[0] * 60;
  progressBar.max = +barWidth[1] + +minSec;
}

function updateProgressBar() {
  if (trackName.textContent !== "") {
    progressBar.value = audio.currentTime;
    currentTrackTime.innerHTML = formatTimeSecToMin(
      Math.floor(audio.currentTime)
    );
    colorProgressBar(progressBar);
  }
}

function formatTimeSecToMin(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

setInterval(updateProgressBar, 1000);

function colorProgressBar(theBar) {
  let min = parseInt(theBar.value);
  let max = parseInt(theBar.max);
  let mult = 100 / max;
  let val = mult * min;
  theBar.style.background =
    "linear-gradient(to right, rgb(197, 179, 88), rgb(197, 179, 88)" +
    val +
    "%, \n#ffffff " +
    val +
    "%, \n#ffffff)";
}

function scrollBar() {
  audio.currentTime = progressBar.value;
}

progressBar.addEventListener("click", scrollBar);

// advanced audio player end //

// translation function start //

function translateTrackName() {
  switch (lang) {
    case "ru":
      trackName.textContent = `${playList[trackNum].title_ru}`;
      break;
    case "en":
      trackName.textContent = `${playList[trackNum].title}`;
      break;
  }
}

function translatePlaylist() {
  switch (lang) {
    case "ru":
      songsTitles.forEach((el, i) => {
        el.textContent = `${i + 1}. ${playList[i].title_ru}`;
      });
      break;
    case "en":
      songsTitles.forEach((el, i) => {
        el.textContent = `${i + 1}. ${playList[i].title}`;
      });
      break;
  }
}

function translatePage() {
  if (lang === "ru") {
    lang = "en";
  } else if (lang === "en") {
    lang = "ru";
  }
  showGreeting();
  getWeather(lang);
  getQuotes();
  translateTrackName();
  translatePlaylist();
}

// time.addEventListener("click", translatePage);

// translation function end //
