const currentYearElement = document.getElementById('currentyear');
if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}


const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}
  
 
  const hamburger = document.querySelector("#hamburger");
  const navMenu = document.querySelector("nav ul");
  
  hamburger.addEventListener("click", () => {
    
    navMenu.classList.toggle("active");
    
   
    if (navMenu.classList.contains("active")) {
      hamburger.textContent = "X"; 
    } else {
      hamburger.textContent = "="; 
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
