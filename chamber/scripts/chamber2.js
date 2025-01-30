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
          const companySection = document.createElement('section');
          companySection.className = 'card';
          companySection.innerHTML = `
              <h3 class="name">${org.name}</h3>
              <hr>
              <img class="busimg" src="images/${org.image}" alt="${org.name} Logo">
              <p class="phone"><strong>Phone:</strong> ${org.phone}</p>
              <p class="url"><strong>URL:</strong> <a href="${org.website}" target="_blank">${org.website}</a></p>
              <p class="address"><strong>Address:</strong> ${org.address}</p>
              <p class="level"><strong>Member Level:</strong> ${org.membershipLevel}</p>
          `;
          buscards.appendChild(companySection);
      });

  } catch (error) {
      console.error('Error fetching organizations:', error);
  }
});
