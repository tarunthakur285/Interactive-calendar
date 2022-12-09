import holidays from "./holidays.js";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

let d = new Date();
let currentDate = d.getDate();
let currentDay = d.getDay();
let currentMonth = d.getMonth();
let currentYear = d.getFullYear();

function main() {
  loadCalender();
}

function loadCalender() {
  const calender = document.getElementById("calender");
  for (let i = 1; i <= 42; i++) {
    const gridEl = `<div
        id="grid-${i}"
        class="grid-item"></div>`;
    calender.innerHTML += gridEl;
  }
  const gridEls = document.getElementsByClassName("grid-item");

  for (let i = 1; i <= 7; i++){
    const el = document.getElementById("grid-" + i);
    el.innerHTML = days[i - 1]
  }

  document.getElementById("month-before").addEventListener("click", month_before)
  document.getElementById("month-after").addEventListener("click", month_after)
  setMonth(currentYear, currentMonth);
  setHolidays(currentYear, currentMonth);
}

function setMonth(year, month) {
    document.getElementById("month").innerHTML = months[month] + " " + year;
  const firstDay = new Date(year, month, 1).getDay();
  const numberDays = new Date(year, month + 1, 0).getDate();

  for (let i = 8; i <= 42; i++) {
    const dt = i - firstDay - 7;
    const el = document.getElementById("grid-" + i);
    el.innerHTML = "";
  }

  for (let i = firstDay + 8; i <= firstDay + numberDays + 7; i++) {
    if (i > 42) return;
    const dt = i - firstDay - 7;
    const el = document.getElementById("grid-" + i);
    el.innerHTML = dt;
  }

}

function month_before() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear -= 1
    } else {
        currentMonth -= 1;
        currentMonth %= 12;
    }
    setMonth(currentYear, currentMonth);
    setHolidays(currentYear, currentMonth);
}

function month_after() {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear += 1
    } else {
        currentMonth += 1;
        currentMonth %= 12;
    }
    setMonth(currentYear, currentMonth);
    setHolidays(currentYear, currentMonth);
}

function setHolidays(year, month) {
    const holidayContainer = document.getElementById("holidays");
    holidayContainer.innerHTML = "";
    for (let [k, v] of Object.entries(holidays)) {
      const dt = new Date(v);
      if (dt.getFullYear() === year && dt.getMonth() === month) {
        holidayContainer.innerHTML += `<div class="holiday-item">${dt.toLocaleDateString() + ": " + k}</div>`;
      }
    }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
