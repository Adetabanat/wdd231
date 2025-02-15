async function loadHouses() {
    try {
        const response = await fetch('data/houses.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Shuffle the houses array and pick 3 random ones
        let shuffledHouses = data.sort(() => 0.5 - Math.random()).slice(0, 3);
        console.log("Selected Houses:", shuffledHouses); // Debugging log

        shuffledHouses.forEach((house, index) => {
            let houseDiv = document.getElementById(`house${index + 1}`);
            
            if (houseDiv) {
                houseDiv.innerHTML = `
                    <img src="${house.image}" alt="${house.name}">
                    <h3>${house.name}</h3>
                    <p><strong>Motto:</strong> ${house.motto}</p>
                `;
            } else {
                console.warn(`Element #house${index + 1} not found.`);
            }
        });
    } catch (error) {
        console.error('Error loading house data:', error);
    }
}

// Run the function after page loads
document.addEventListener("DOMContentLoaded", loadHouses);
