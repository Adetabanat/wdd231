document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const role = document.getElementById("role").value;

        if (username.trim() === "") {
            alert("Please enter a username.");
            return;
        }

        // Store session data
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("role", role);

        // Redirect based on role
        switch (role) {
            case "Admin":
                window.location.href = "admin.html";
                break;
            case "Teacher":
                window.location.href = "teacher.html";
                break;
            case "Student":
                window.location.href = "student.html";
                break;
            case "Staff":
                window.location.href = "staff.html";
                break;
            default:
                alert("Invalid role selected!");
        }
    });
});
