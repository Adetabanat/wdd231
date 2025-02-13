document.addEventListener("DOMContentLoaded", function () {
    const username = sessionStorage.getItem("username");
    const role = sessionStorage.getItem("role");

    if (!username || !role) {
        alert("Access denied! Please log in.");
        window.location.href = "login.html";
    } else {
        document.getElementById("userWelcome").textContent = `Welcome, ${username} (${role})`;
    }
});
