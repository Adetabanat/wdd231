document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("privilegesModal");
    const modalTitle = document.getElementById("modalTitle");
    const closeButton = document.querySelector(".close-btn");
    const privilegeForm = document.getElementById("privilegesForm");
    const privilegeButtons = document.querySelectorAll(".set-privileges");

    privilegeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const role = button.getAttribute("data-role");
            modalTitle.textContent = `Set Privileges for ${role}`;
            modal.style.display = "flex";
        });
    });

    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    privilegeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Privileges saved successfully!");
        modal.style.display = "none";
    });
});
