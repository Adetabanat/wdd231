// Update the current year in the footer
const currentYearElement = document.getElementById("currentyear");
if (currentYearElement) {
  const currentYear = new Date().getFullYear();
  currentYearElement.textContent = currentYear;
}

// Update the "Last Modified" date in the footer
const lastModifiedElement = document.getElementById("lastModified");
if (lastModifiedElement) {
  lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}

// Toggle the navigation menu and hamburger animation
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
}

// Highlight the active navigation link based on the current page
const currentLocation = window.location.pathname.split("/").pop();
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {
  if (item.getAttribute("href") === currentLocation) {
    item.classList.add("active");
  } else {
    item.classList.remove("active");
  }
});

// Manage the members' display in grid or list view
const membersContainer = document.getElementById("members-container");
const gridViewButton = document.getElementById("grid-view");
const listViewButton = document.getElementById("list-view");

async function fetchMembers(view = "grid") {
  try {
    // Fetch data from the JSON file
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Failed to fetch members data");
    const members = await response.json();

    // Display members based on the selected view
    displayMembers(members, view);
  } catch (error) {
    console.error("Error fetching members:", error);
    membersContainer.innerHTML = `<p>Unable to load member information. Please try again later.</p>`;
  }
}



function displayMembers(members, view) {
  const spotlightContainer = document.querySelector(".spotlight"); // Select the spotlight container
  if (!spotlightContainer) {
    console.error("Error: Spotlight container not found.");
    return;
  }

  spotlightContainer.innerHTML = ""; // Clear existing content
  spotlightContainer.className = `spotlight ${view === "grid" ? "grid-view" : "list-view"}`; // Update class

  members.forEach((member) => {
    // Create a member card element
    const memberCard = document.createElement("div");
    memberCard.classList.add("member-card");

    // Ensure member image is valid
    const imageSrc = member.image ? `images/${member.image}` : "images/default.jpg";
    const websiteLink = member.website ? `<a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>` : "";

    // Ensure membership level mapping is safe
    const membershipLevels = ["Member", "Silver", "Gold"];
    const membershipLevel = membershipLevels[member.membershipLevel - 1] || "Unknown";

    // Populate the member card with data
    memberCard.innerHTML = `
      <img src="${imageSrc}" alt="${member.name || "Member"}" class="member-image">
      <h3>${member.name || "Unknown"}</h3>
      <p>${member.description || "No description available."}</p>
      <p>${member.address || "Address not provided."}</p>
      <p>${member.phone || "Phone number unavailable."}</p>
      ${websiteLink}
      <p class="membership-level">Membership Level: ${membershipLevel}</p>
    `;

    // Append the card to the container
    spotlightContainer.appendChild(memberCard);
  });
}
