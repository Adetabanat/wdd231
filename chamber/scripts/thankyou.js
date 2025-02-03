document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
  
    const fields = {
      fname: params.get("fname") || "Not Provided",
      lname: params.get("lname") || "Not Provided",
      email: params.get("email") || "Not Provided",
      phone: params.get("phone") || "Not Provided",
      "org-name": params.get("company-name") || "Not Provided",
      membership: params.get("membership") || "Not Provided",
      timestamp: new Date().toLocaleString(),
    };
  
    Object.keys(fields).forEach((key) => {
      const element = document.getElementById(key);
      if (element) element.textContent = fields[key];
    });
  });

  // Get form data from URL parameters
const urlParams = new URLSearchParams(window.location.search);

document.getElementById('first-name').textContent = urlParams.get('first-name') || "N/A";
document.getElementById('last-name').textContent = urlParams.get('last-name') || "N/A";
document.getElementById('email').textContent = urlParams.get('email') || "N/A";
document.getElementById('phone').textContent = urlParams.get('phone') || "N/A";
document.getElementById('organization').textContent = urlParams.get('organization') || "N/A";
document.getElementById('timestamp').textContent = urlParams.get('timestamp') || "N/A";

  // Set current year and last modified date
const currentYearElement = document.getElementById("currentyear");
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

const lastModifiedElement = document.getElementById("lastModified");
if (lastModifiedElement) {
  lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}

// Select the hamburger button and navigation links
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
}