// time and date start //

const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const userName = document.querySelector(".name");
const hours = new Date().getHours();
const body = document.querySelector(".body");
const sliderLeft = document.querySelector(".slide-prev");
const sliderRight = document.querySelector(".slide-next");

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
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    userName.value = localStorage.getItem("name");
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
