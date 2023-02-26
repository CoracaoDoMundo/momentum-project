import playList from "./playList.js";

const time = document.querySelector(".time"),
  date = document.querySelector(".date"),
  greeting = document.querySelector(".greeting"),
  greetingBlock = document.querySelector(".greeting-container"),
  userName = document.querySelector(".name"),
  hours = new Date().getHours(),
  body = document.querySelector(".body"),
  sliderLeft = document.querySelector(".slide-prev"),
  sliderRight = document.querySelector(".slide-next"),
  weatherBlock = document.querySelector(".weather"),
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
  quoteBlock = document.querySelector(".quote-block"),
  audio = document.querySelector(".audio"),
  playerBlock = document.querySelector(".player"),
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
  settingsBtn = document.querySelector(".settings-btn"),
  settingsMenu = document.querySelector(".settings-menu"),
  engBtn = document.getElementById("radio-en"),
  rusBtn = document.getElementById("radio-ru"),
  timeBtnYes = document.getElementById("radio-time-y"),
  timeBtnNo = document.getElementById("radio-time-n"),
  dateBtnYes = document.getElementById("radio-date-y"),
  dateBtnNo = document.getElementById("radio-date-n"),
  greetingBtnYes = document.getElementById("radio-greeting-y"),
  greetingBtnNo = document.getElementById("radio-greeting-n"),
  quoteBtnYes = document.getElementById("radio-quote-y"),
  quoteBtnNo = document.getElementById("radio-quote-n"),
  weatherBtnYes = document.getElementById("radio-weather-y"),
  weatherBtnNo = document.getElementById("radio-weather-n"),
  audioBtnYes = document.getElementById("radio-audio-y"),
  audioBtnNo = document.getElementById("radio-audio-n"),
  setHeader = document.querySelector(".settings-menu__header"),
  setLang = document.querySelector(".settings-menu__lang"),
  setEngBtn = document.querySelector(".lang-eng-btn"),
  setRusBtn = document.querySelector(".lang-rus-btn"),
  setSections = document.querySelector(".settings-menu__sections"),
  setTime = document.querySelector(".set-time"),
  setDate = document.querySelector(".set-date"),
  setGreeting = document.querySelector(".set-greet"),
  setquote = document.querySelector(".set-quote"),
  setWeather = document.querySelector(".set-weather"),
  setAudio = document.querySelector(".set-audio"),
  setYes = document.querySelectorAll(".yes"),
  setNo = document.querySelectorAll(".no"),
  setBackgrnd = document.querySelector(".settings-menu__background"),
  greetingTranslation = {
    en: ["Good"],
    ru: ["Доброе", "Добрый", "Доброй"],
  },
  weatherTranslation = {
    en: ["wind speed", "humidity", "m/s"],
    ru: ["скорость ветра", "влажность", "м/с"],
  },
  settingsTranslation = {
    en: [
      "Settings",
      "Language",
      "En",
      "Ru",
      "Sections",
      "Time",
      "Date",
      "Greeting",
      "Quote",
      "Weather",
      "Audio",
      "Yes",
      "No",
      "Background",
    ],
    ru: [
      "Настройки",
      "Язык",
      "Англ",
      "Рус",
      "Разделы",
      "Время",
      "Дата",
      "Приветствие",
      "Цитата",
      "Погода",
      "Музыка",
      "Да",
      "Нет",
      "Фон",
    ],
  };

city.value = "Minsk";

let randomNum,
  isPlay = false,
  trackNum = 0,
  lang = greeting.getAttribute("lang"),
  state = {
    language: "en",
    photoSource: "github",
    blocks: ["time", "date", "greeting", "quote", "weather", "audio"],
  };

// local storage usage start //

function setLocalStorage() {
  localStorage.setItem("name", userName.value);
  localStorage.setItem("city", city.value);
  localStorage.setItem("state", JSON.stringify(state));
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    userName.value = localStorage.getItem("name");
  }

  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }

  if (localStorage.getItem("state")) {
    state = JSON.parse(localStorage.getItem("state"));
    lang = state.language;
    translatePage();
    hideTimeOnLoad();
    hideDateOnLoad();
    hideGreetingOnLoad();
    hideWeatherOnLoad();
    hideQuoteOnLoad();
    hideAudioOnLoad();
    console.log(state);
  }
}

// function appearanceOfBlocks(element) {
//   if (!state.blocks.includes(element)) {
//     `${element}` + BtnNo.value = "no";
//   }
// }

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
  let randomQuoteNum = getRandomNum(data.length - 1);

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
    console.log(trackNum);
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
  if (trackDuration.textContent === "") {
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

function translateSettings() {
  setHeader.textContent = settingsTranslation[lang][0];
  setLang.textContent = settingsTranslation[lang][1];
  setEngBtn.textContent = settingsTranslation[lang][2];
  setRusBtn.textContent = settingsTranslation[lang][3];
  setSections.textContent = settingsTranslation[lang][4];
  setTime.textContent = settingsTranslation[lang][5];
  setDate.textContent = settingsTranslation[lang][6];
  setGreeting.textContent = settingsTranslation[lang][7];
  setquote.textContent = settingsTranslation[lang][8];
  setWeather.textContent = settingsTranslation[lang][9];
  setAudio.textContent = settingsTranslation[lang][10];
  setYes.forEach((el) => (el.textContent = settingsTranslation[lang][11]));
  setNo.forEach((el) => (el.textContent = settingsTranslation[lang][12]));
  setBackgrnd.textContent = settingsTranslation[lang][13];
}

function translatePage() {
  if (lang === "ru") {
    rusBtn.value = "yes";
    engBtn.value = "no";
    rusBtn.checked = true;
    engBtn.checked = false;
  } else {
    rusBtn.value = "no";
    engBtn.value = "yes";
    rusBtn.checked = false;
    engBtn.checked = true;
  }
  showGreeting();
  getWeather(lang);
  getQuotes();
  translateTrackName();
  translatePlaylist();
  translateSettings();
}

function translatePageByBtn() {
  if (this.value === "no") {
    this.value = "yes";
    if (this.id === "radio-en") {
      rusBtn.value = "no";
      lang = "en";
      state.language = "en";
    } else {
      engBtn.value = "no";
      lang = "ru";
      state.language = "ru";
    }
    translatePage();
  }
}

engBtn.addEventListener("click", translatePageByBtn);
rusBtn.addEventListener("click", translatePageByBtn);

// translation function end //

// settings block start //

function openSettings() {
  if (!settingsMenu.classList.contains("settings-visible")) {
    settingsMenu.classList.add("settings-visible");
    settingsBtn.classList.add("settings-btn-off");
  }
}

function closeSettings() {
  this.addEventListener("click", (event) => {
    const isClosest = event.target.closest(".settings-menu");
    const isBtn = event.target.closest(".settings-btn");

    if (
      !isClosest &&
      !isBtn &&
      settingsMenu.classList.contains("settings-visible")
    ) {
      settingsMenu.classList.remove("settings-visible");
      settingsBtn.classList.remove("settings-btn-off");
    }
  });
}

settingsBtn.addEventListener("click", openSettings);
document.addEventListener("click", closeSettings);

function hideTimeOnLoad() {
  if (!state.blocks.includes("time")) {
    timeBtnYes.value = "no";
    timeBtnNo.value = "yes";
    timeBtnYes.checked = false;
    timeBtnNo.checked = true;
    time.classList.add("time-hidden");
  }
};

function hideTime() {
  if (this.value === "no") {
    this.value = "yes";
    if (this.id === "radio-time-n") {
      timeBtnYes.value = "no";
    } else {
      timeBtnNo.value = "no";
    }
    if (!time.classList.contains("time-hidden")) {
      time.classList.add("time-hidden");
      state.blocks = state.blocks.filter((el) => el !== "time");
    } else {
      time.classList.remove("time-hidden");
      state.blocks.push("time");
    }
  }
}

timeBtnYes.addEventListener("click", hideTime);
timeBtnNo.addEventListener("click", hideTime);

function hideDateOnLoad() {
  if (!state.blocks.includes("date")) {
    dateBtnYes.value = "no";
    dateBtnNo.value = "yes";
    dateBtnYes.checked = false;
    dateBtnNo.checked = true;
    date.classList.add("date-hidden");
  }
};

function hideDate() {
  if (this.value === "no") {
    this.value = "yes";
    if (this.id === "radio-date-n") {
      dateBtnYes.value = "no";
    } else {
      dateBtnNo.value = "no";
    }
    if (!date.classList.contains("date-hidden")) {
      date.classList.add("date-hidden");
      state.blocks = state.blocks.filter((el) => el !== "date");
    } else {
      date.classList.remove("date-hidden");
      state.blocks.push("date");
    }
  }
}

dateBtnYes.addEventListener("click", hideDate);
dateBtnNo.addEventListener("click", hideDate);

function hideGreetingOnLoad() {
  if (!state.blocks.includes("greeting")) {
    greetingBtnYes.value = "no";
    greetingBtnNo.value = "yes";
    greetingBtnYes.checked = false;
    greetingBtnNo.checked = true;
    greetingBlock.classList.add("greeting-hidden");
  }
};

function hideGreeting() {
  if (this.value === "no") {
    this.value = "yes";
    if (this.id === "radio-greeting-n") {
      greetingBtnYes.value = "no";
    } else {
      greetingBtnNo.value = "no";
    }
    if (!greetingBlock.classList.contains("greeting-hidden")) {
      greetingBlock.classList.add("greeting-hidden");
      state.blocks = state.blocks.filter((el) => el !== "greeting");
    } else {
      greetingBlock.classList.remove("greeting-hidden");
      state.blocks.push("greeting");
    }
  }
}

greetingBtnYes.addEventListener("click", hideGreeting);
greetingBtnNo.addEventListener("click", hideGreeting);

function hideQuoteOnLoad() {
  if (!state.blocks.includes("quote")) {
    quoteBtnYes.value = "no";
    quoteBtnNo.value = "yes";
    quoteBtnYes.checked = false;
    quoteBtnNo.checked = true;
    quoteBlock.classList.add("quote-hidden");
  }
};

function hideQuote() {
  if (this.value === "no") {
    this.value = "yes";
    if (this.id === "radio-quote-n") {
      quoteBtnYes.value = "no";
    } else {
      quoteBtnNo.value = "no";
    }
    if (!quoteBlock.classList.contains("quote-hidden")) {
      quoteBlock.classList.add("quote-hidden");
      state.blocks = state.blocks.filter((el) => el !== "quote");
    } else {
      quoteBlock.classList.remove("quote-hidden");
      state.blocks.push("quote");
    }
  }
}

quoteBtnYes.addEventListener("click", hideQuote);
quoteBtnNo.addEventListener("click", hideQuote);

function hideWeatherOnLoad() {
  if (!state.blocks.includes("weather")) {
    weatherBtnYes.value = "no";
    weatherBtnNo.value = "yes";
    weatherBtnYes.checked = false;
    weatherBtnNo.checked = true;
    weatherBlock.classList.add("weather-hidden");
  }
};

function hideWeather() {
  if (this.value === "no") {
    this.value = "yes";
    if (this.id === "radio-weather-n") {
      weatherBtnYes.value = "no";
    } else {
      weatherBtnNo.value = "no";
    }
    if (!weatherBlock.classList.contains("weather-hidden")) {
      weatherBlock.classList.add("weather-hidden");
      state.blocks = state.blocks.filter((el) => el !== "weather");
    } else {
      weatherBlock.classList.remove("weather-hidden");
      state.blocks.push("weather");
    }
  }
}

weatherBtnYes.addEventListener("click", hideWeather);
weatherBtnNo.addEventListener("click", hideWeather);

function hideAudioOnLoad() {
  if (!state.blocks.includes("audio")) {
    audioBtnYes.value = "no";
    audioBtnNo.value = "yes";
    audioBtnYes.checked = false;
    audioBtnNo.checked = true;
    playerBlock.classList.add("player-hidden");
  }
};

function hideAudio() {
  if (this.value === "no") {
    this.value = "yes";
    if (this.id === "radio-audio-n") {
      audioBtnYes.value = "no";
    } else {
      audioBtnNo.value = "no";
    }
    if (!playerBlock.classList.contains("player-hidden")) {
      playerBlock.classList.add("player-hidden");
      state.blocks = state.blocks.filter((el) => el !== "audio");
    } else {
      playerBlock.classList.remove("player-hidden");
      state.blocks.push("audio");
    }
  }
}

audioBtnYes.addEventListener("click", hideAudio);
audioBtnNo.addEventListener("click", hideAudio);

// settings block end //
