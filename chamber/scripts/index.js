document.addEventListener("DOMContentLoaded", () => {
  // Get all "Learn More" buttons
  const openButtons = document.querySelectorAll(".modal-open");
  const closeButtons = document.querySelectorAll(".modal-close");
  const modals = document.querySelectorAll(".modal");

  // Function to open a modal
  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = "flex";
    });
  });

  // Function to close a modal
  closeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal");
      if (modal) modal.style.display = "none";
    });
  });

  // Close modal when clicking outside content
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});



// Set current year and last modified date
const currentYearElement = document.getElementById("currentyear");
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

const lastModifiedElement = document.getElementById("lastModified");
if (lastModifiedElement) {
  lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}

// Select the hamburger button and navigation links
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
}

// Highlight active navigation link
const currentLocation = window.location.pathname.split("/").pop();
const navItems = document.querySelectorAll("#nav-links a");

navItems.forEach((item) => {
  if (item.getAttribute("href") === currentLocation) {
    item.classList.add("active");
  } else {
    item.classList.remove("active");
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
    if (descriptionElement) {
      descriptionElement.textContent = "Unable to fetch current weather.";
    }
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
    if (eventsListElement) {
      eventsListElement.innerHTML = `<li>Unable to fetch forecast data.</li>`;
    }
  }
}

// Update current weather card
function updateCurrentWeather(data) {
  if (!data || !data.weather || !data.main) {
    console.error("Invalid weather data:", data);
    return;
  }

  const currentTemp = Math.round(data.main.temp ?? 0);
  const currentDescription = data.weather[0]?.description ?? "No data";
  const weatherIcon = data.weather[0]?.icon
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : "";

  if (townElement) townElement.textContent = data.name ?? "Unknown";
  if (graphicElement) {
    graphicElement.src = weatherIcon;
    graphicElement.alt = currentDescription;
  }
  if (descriptionElement)
    descriptionElement.textContent = capitalizeFirstLetter(currentDescription);
  if (temperatureElement)
    temperatureElement.textContent = `${currentTemp}°C`;
}

// Update 3-day forecast
function updateWeatherForecast(data) {
  if (!data || !data.list) {
    console.error("Invalid forecast data:", data);
    return;
  }

  const forecast = [];
  const forecastList = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  ); // Get midday forecasts

  forecastList.slice(0, 3).forEach((item) => {
    const date = new Date(item.dt_txt).toLocaleDateString(undefined, {
      weekday: "long",
    });
    const temp = Math.round(item.main.temp);
    const description = capitalizeFirstLetter(item.weather[0].description);
    forecast.push(`<li>${date}: ${temp}°C, ${description}</li>`);
  });

  if (eventsListElement) eventsListElement.innerHTML = forecast.join("");
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize weather data fetch
fetchCurrentWeather();
fetchWeatherForecast();

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();

        function getRandomOrganizations(data) {
            // Filter only level 2 and 3 members
            const filteredOrgs = data.filter(org => org.membershipLevel === 2 || org.membershipLevel === 3);
            const randomOrgs = [];

            while (randomOrgs.length < 3 && filteredOrgs.length > 0) {
                const randomIndex = Math.floor(Math.random() * filteredOrgs.length);
                randomOrgs.push(filteredOrgs[randomIndex]);
                filteredOrgs.splice(randomIndex, 1); // Remove selected org
            }

            return randomOrgs;
        }

        const selectedOrgs = getRandomOrganizations(data);
        const buscards = document.getElementById('buscards');

        selectedOrgs.forEach(org => {
            const card = document.createElement('div');
            card.className = 'spotlight-card';
            card.innerHTML = `
                <img src="images/${org.image}" alt="${org.name} Logo">
                <h3>${org.name}</h3>
                <p><strong>Phone:</strong> ${org.phone}</p>
                <p><strong>URL:</strong> <a href="${org.website}" target="_blank">${org.website}</a></p>
                <p><strong>Address:</strong> ${org.address}</p>
                <p><strong>Member Level:</strong> ${org.membershipLevel}</p>
            `;
            buscards.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching organizations:', error);
    }
});

// DIRECTORY//
const membersContainer = document.getElementById("members-container");
const gridViewButton = document.getElementById("grid-view");
const listViewButton = document.getElementById("list-view");

async function fetchMembers(view = "grid") {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Failed to fetch members data");
        const members = await response.json();
        displayMembers(members, view);
    } catch (error) {
        console.error("Error fetching members:", error);
        membersContainer.innerHTML = `<p>Unable to load member information. Please try again later.</p>`;
    }
}

function displayMembers(members, view) {
    membersContainer.innerHTML = "";
    membersContainer.className = view === "grid" ? "grid-view" : "list-view";

    members.forEach(member => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("member-card");

        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" class="member-image">
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership-level">Membership Level: ${["Member", "Silver", "Gold"][member.membershipLevel - 1]}</p>
        `;

        membersContainer.appendChild(memberCard);
    });
}

gridViewButton.addEventListener("click", () => fetchMembers("grid"));
listViewButton.addEventListener("click", () => fetchMembers("list"));

// Fetch members on page load
fetchMembers();



// Interest//
document.addEventListener("DOMContentLoaded", () => {
  const sidebarContent = document.getElementById("sidebar-content");
  
  // Get last visit timestamp from localStorage
  const lastVisit = localStorage.getItem("lastVisit");

  if (!lastVisit) {
      sidebarContent.textContent = "Welcome! Let us know if you have any questions.";
  } else {
      const lastVisitDate = new Date(parseInt(lastVisit));
      const currentDate = new Date();
      const timeDifference = currentDate - lastVisitDate;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      if (daysDifference < 1) {
          sidebarContent.textContent = "Back so soon! Awesome!";
      } else if (daysDifference === 1) {
          sidebarContent.textContent = "You last visited 1 day ago.";
      } else {
          sidebarContent.textContent = `You last visited ${daysDifference} days ago.`;
      }
  }

  // Store the current visit timestamp in localStorage
  localStorage.setItem("lastVisit", Date.now().toString());
});


document.addEventListener("DOMContentLoaded", () => {
  fetch("data/places.json")
      .then(response => response.json())
      .then(data => {
          const container = document.getElementById("places-container");
          data.places.forEach(place => {
              const card = document.createElement("div");
              card.classList.add("card");

              card.innerHTML = `
                  <h2>${place.name}</h2>
                  <figure>
                      <img src="${place.image}" alt="${place.name}" class="hover-effect">
                  </figure>
                  <address>${place.address}</address>
                  <p>${place.description}</p>
                  <button>Learn More</button>
              `;

              container.appendChild(card);
          });
      })
      .catch(error => console.error("Error loading places:", error));
});


