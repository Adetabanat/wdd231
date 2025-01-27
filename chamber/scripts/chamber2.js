// Set current year and last modified date
const currentYearElement = document.getElementById('currentyear');
if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}

const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}
  
// Select the hamburger button and navigation links
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Toggle menu visibility and icon animation
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

const currentLocation = window.location.pathname.split('/').pop();
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(item => {
  if (item.getAttribute('href') === currentLocation) {
    item.classList.add('active');
  } else {
    item.classList.remove('active');
  }
});

// OpenWeatherMap API Key and URL
const apiKey = "05b955313b7fd4b1aa06fa1873c92340";
const latitude = "5.1247745930521"; // Cape Coast, Ghana
const longitude = "-1.2707352821394184";
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

// DOM Elements
const townElement = document.getElementById("town");
const graphicElement = document.getElementById("graphic");
const descriptionElement = document.getElementById("description");
const temperatureElement = document.getElementById("temperature");
const eventsListElement = document.getElementById("events-list");

// Fetch current weather data
async function fetchCurrentWeather() {
  try {
    const response = await fetch(currentWeatherUrl);
    if (!response.ok) throw new Error("Failed to fetch current weather data");

    const data = await response.json();
    updateCurrentWeather(data);
  } catch (error) {
    console.error("Error fetching current weather:", error);
    descriptionElement.textContent = "Unable to fetch current weather.";
  }
}

// Fetch 3-day forecast data
async function fetchWeatherForecast() {
  try {
    const response = await fetch(forecastWeatherUrl);
    if (!response.ok) throw new Error("Failed to fetch forecast data");

    const data = await response.json();
    updateWeatherForecast(data);
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    eventsListElement.innerHTML = `<li>Unable to fetch forecast data.</li>`;
  }
}

// Update current weather card
function updateCurrentWeather(data) {
  const currentTemp = Math.round(data.main.temp);
  const currentDescription = data.weather[0].description;
  const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  // Update current weather details
  townElement.textContent = data.name;
  graphicElement.src = weatherIcon;
  graphicElement.alt = currentDescription;
  descriptionElement.textContent = capitalizeFirstLetter(currentDescription);
  temperatureElement.textContent = `${currentTemp}°C`;
}

// Update 3-day forecast
function updateWeatherForecast(data) {
  const forecast = [];
  const forecastList = data.list.filter((item) => item.dt_txt.includes("12:00:00")); // Get midday forecasts
  forecastList.slice(0, 3).forEach((item) => {
    const date = new Date(item.dt_txt).toLocaleDateString(undefined, { weekday: "long" });
    const temp = Math.round(item.main.temp);
    const description = capitalizeFirstLetter(item.weather[0].description);
    forecast.push(`<li>${date}: ${temp}°C, ${description}</li>`);
  });

  // Update the forecast in the DOM
  eventsListElement.innerHTML = forecast.join("");
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize weather data fetch
fetchCurrentWeather();
fetchWeatherForecast();

// Load spotlight members from JSON file
function loadSpotlights() {
  fetch('members.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const container = document.getElementById("spotlight-container");
          const goldAndSilverMembers = data.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
          const shuffled = goldAndSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

          shuffled.forEach(member => {
              const card = document.createElement("div");
              card.className = "card";

              card.innerHTML = `
                  <img src="${member.image}" alt="${member.name} logo">
                  <h2>${member.name}</h2>
                  <p>Membership Level: ${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
                  <p>${member.address}</p>
                  <p>${member.phone}</p>
                  <a href="${member.website}" target="_blank">Visit Website</a>
              `;

              container.appendChild(card);
          });
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
}

document.addEventListener("DOMContentLoaded", loadSpotlights);
