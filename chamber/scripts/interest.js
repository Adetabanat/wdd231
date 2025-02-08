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
