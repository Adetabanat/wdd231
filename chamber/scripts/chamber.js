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
