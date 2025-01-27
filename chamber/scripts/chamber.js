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
  membersContainer.innerHTML = ""; // Clear existing content
  membersContainer.className = view === "grid" ? "grid-view" : "list-view"; // Set the container class

  members.forEach((member) => {
    // Create a member card element
    const memberCard = document.createElement("div");
    memberCard.classList.add("member-card");

    // Populate the member card with data
    memberCard.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}" class="member-image">
      <h3>${member.name}</h3>
      <p>${member.description}</p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
      <p class="membership-level">Membership Level: ${["Member", "Silver", "Gold"][member.membershipLevel - 1]}</p>
    `;

    // Append the card to the container
    membersContainer.appendChild(memberCard);
  });
}

// Attach event listeners to the grid and list view buttons
if (gridViewButton && listViewButton) {
  gridViewButton.addEventListener("click", () => fetchMembers("grid"));
  listViewButton.addEventListener("click", () => fetchMembers("list"));
}

// Fetch and display members on page load
fetchMembers();
