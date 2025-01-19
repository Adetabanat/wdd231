const currentYearElement = document.getElementById('currentyear');
if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}


const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}
  
 
  const hamburger = document.querySelector("#hamburger");
  const navMenu = document.querySelector("nav ul");
  
  hamburger.addEventListener("click", () => {
    
    navMenu.classList.toggle("active");
    
   
    if (navMenu.classList.contains("active")) {
      hamburger.textContent = "X"; 
    } else {
      hamburger.textContent = "="; 
    }
  });
  