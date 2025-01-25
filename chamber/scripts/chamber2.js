// Set current year and last modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

/// Fetch weather data
async function fetchWeather() {
    const apiKey = "your_api_key_here";
    const city = "Timbuktu";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
    const data = await response.json();
    
    const weatherContainer = document.getElementById("current-weather");
    weatherContainer.innerHTML = `
        <p>Temperature: ${Math.round(data.main.temp)}°F</p>
        <p>${data.weather.map(w => capitalizeWords(w.description)).join(", ")}</p>
    `;
}

// Capitalize words
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Load spotlights from JSON
async function loadSpotlights() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    const goldSilverMembers = members.filter(m => m.level === 'Gold' || m.level === 'Silver');
    const spotlightContainer = document.querySelector('.spotlight-container');

    goldSilverMembers.slice(0, 3).forEach(member => {
        const spotlight = document.createElement('div');
        spotlight.classList.add('spotlight');
        spotlight.innerHTML = `
            <img src="${member.logo}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.tagline}</p>
            <p>Email: ${member.email}</p>
            <p>Phone: ${member.phone}</p>
            <a href="${member.website}">${member.website}</a>
        `;
        spotlightContainer.appendChild(spotlight);
    });
}

// Initialize
fetchWeather();
loadSpotlights();
