document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const maxAttempts = 3;

    // Simulated user database (replace with a backend in production)
    const users = {
        "admin": { password: "admin123", role: "Admin" },
        "teacher": { password: "teacher123", role: "Teacher" },
        "student": { password: "student123", role: "Student" },
        "staff": { password: "staff123", role: "Staff" }
    };

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const role = document.getElementById("role").value;
            let attemptsLeft = localStorage.getItem("loginAttempts");

            if (attemptsLeft === null) {
                attemptsLeft = maxAttempts;
            } else {
                attemptsLeft = parseInt(attemptsLeft);
            }

            // Check if user is locked out
            if (attemptsLeft <= 0) {
                alert("Too many failed login attempts. Please try again later.");
                return;
            }

            if (!username || !password) {
                alert(`Please enter both username and password. You have ${attemptsLeft} attempts left.`);
                return;
            }

            // Validate credentials
            if (users[username] && users[username].password === password && users[username].role === role) {
                const user = { username, role };
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                localStorage.removeItem("loginAttempts"); // Reset attempts on success

                alert(`Welcome, ${username}! You are logged in as ${role}.`);

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
                        window.location.href = "index.html";
                }
            } else {
                attemptsLeft--;
                localStorage.setItem("loginAttempts", attemptsLeft);
                alert(`Incorrect credentials. You have ${attemptsLeft} login attempts left.`);

                if (attemptsLeft <= 0) {
                    alert("Too many failed attempts. Please try again later.");
                }
            }
        });
    }

    // Logout function
    function logout() {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("loginAttempts");
        alert("You have been logged out.");
        window.location.href = "login.html";
    }
});
