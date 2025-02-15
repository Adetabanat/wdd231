document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        // Accessibility: Toggle aria-expanded
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !expanded);
    });
});

class SchoolManagement {
    constructor() {
        this.students = [];
    }

    addStudent(name, grade, section) {
        const id = this.students.length + 1;
        this.students.push({
            id, name, grade, section,
            attendance: {},
            grades: {},
            communication: [],
            billing: { totalFees: 0, paid: 0, due: 0 }
        });
    }

    markAttendance(studentId, date, status) {
        const student = this.students.find(s => s.id == studentId);
        if (student) student.attendance[date] = status;
    }

    addGrade(studentId, subject, grade) {
        const student = this.students.find(s => s.id == studentId);
        if (student) student.grades[subject] = grade;
    }

    sendMessage(studentId, message) {
        const student = this.students.find(s => s.id == studentId);
        if (student) student.communication.push({ date: new Date().toISOString().split('T')[0], message });
    }

    updateBilling(studentId, totalFees, paid) {
        const student = this.students.find(s => s.id == studentId);
        if (student) {
            student.billing.totalFees = totalFees;
            student.billing.paid = paid;
            student.billing.due = totalFees - paid;
        }
    }

    showRecords() {
        document.getElementById("output").innerHTML = this.students.map(student => `
            <strong>ID:</strong> ${student.id} <br>
            <strong>Name:</strong> ${student.name} <br>
            <strong>Grade:</strong> ${student.grade} <br>
            <strong>Section:</strong> ${student.section} <br>
            <strong>Billing:</strong> ${JSON.stringify(student.billing)} <br><hr>
        `).join("");
    }
}

const school = new SchoolManagement();


/*  Features */
function openUser(role) {
    alert("Opening " + role + " dashboard...");
    // You can replace the alert with a navigation link
    window.location.href = role + ".html";  // Redirects to admin.html, teacher.html, etc.
}

// Highlight active navigation link
const currentLocation = window.location.pathname.split("/").pop();
const navItems = document.querySelectorAll("#nav-links a");

navItems.forEach((item) => {
  if (item.getAttribute("href") === currentLocation) {
    item.classList.add("active");
  } else {
    item.classList.remove("active");
  }
});


// Set current year and last modified date
const currentYearElement = document.getElementById("currentyear");
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

const lastModifiedElement = document.getElementById("lastModified");
if (lastModifiedElement) {
  lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}