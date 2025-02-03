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
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "flex";
        }
    };

    // Close modal function
    window.closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
        }
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
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove("active");
                hamburger.classList.remove("active");
            }
        });
    }

    // Set current year in footer
    const currentYearElement = document.getElementById("currentyear");
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Set last modified date
    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = "Last Modified: " + document.lastModified;
    }
});
