document.addEventListener("DOMContentLoaded", () => {
    const sidebarContent = document.getElementById("sidebar-content");

    try {
        const lastVisit = localStorage.getItem("lastVisit");

        if (!lastVisit) {
            sidebarContent.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const lastVisitDate = new Date(Number(lastVisit));
            const currentDate = new Date();
            const daysDifference = Math.floor((currentDate - lastVisitDate) / (1000 * 60 * 60 * 24));

            sidebarContent.textContent = daysDifference < 1
                ? "Back so soon! Awesome!"
                : `You last visited ${daysDifference} days ago.`;
        }

        localStorage.setItem("lastVisit", Date.now());
    } catch (error) {
        console.error("localStorage unavailable:", error);
    }
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
                    <img src="${place.image}" alt="${place.name}" loading="lazy">
                    <p>${place.description}</p>
                    <button>Learn More</button>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading places:", error));
});
