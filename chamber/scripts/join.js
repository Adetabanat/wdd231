document.addEventListener("DOMContentLoaded", () => {
    const membershipCards = document.querySelectorAll(".membership-cards .card");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close");
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
  
    // Animate membership cards on load
    setTimeout(() => {
      membershipCards.forEach(card => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      });
    }, 300);
  
    // Open modal function
    window.openModal = (modalId) => {
      document.getElementById(modalId).style.display = "flex";
    };
  
    // Close modal function
    window.closeModal = (modalId) => {
      document.getElementById(modalId).style.display = "none";
    };
  
    // Close modals when clicking outside content
    modals.forEach(modal => {
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });
    });
  
    // Close modals with close button
    closeButtons.forEach(button => {
      button.addEventListener("click", () => {
        button.closest(".modal").style.display = "none";
      });
    });
  
    // Hamburger menu toggle
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  
    // Set current year in footer
    document.getElementById("currentyear").textContent = new Date().getFullYear();
  
    // Set last modified date
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;
  });

  
  // Select the hamburger button and navigation links
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
}