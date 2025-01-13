// Update the year dynamically
document.getElementById('current-year').textContent = new Date().getFullYear();

// Update last modified date dynamically
document.getElementById('last-modified').textContent = document.lastModified;

// Filter courses based on category
function filterCourses(category) {
    const courseList = document.getElementById('course-list');
    const totalCredits = document.getElementById('total-credits');
    courseList.innerHTML = ''; // Clear the list

    let courses = [];
    if (category === 'all') {
        courses = [
            { name: 'Course 1 (CSE)', credits: 3 },
            { name: 'Course 2 (WDD)', credits: 4 },
            { name: 'Course 3 (CSE)', credits: 3 },
            { name: 'Course 4 (WDD)', credits: 4 },
            { name: 'Course 5 (CSE)', credits: 3 }
        ];
    } else if (category === 'CSE') {
        courses = [
            { name: 'Course 1 (CSE)', credits: 3 },
            { name: 'Course 3 (CSE)', credits: 3 },
            { name: 'Course 5 (CSE)', credits: 3 }
        ];
    } else if (category === 'WDD') {
        courses = [
            { name: 'Course 2 (WDD)', credits: 4 },
            { name: 'Course 4 (WDD)', credits: 4 }
        ];
    }

    let total = 0;
    courses.forEach(course => {
        const courseElement = document.createElement('p');
        courseElement.textContent = `${course.name} - ${course.credits} Credits`;
        courseList.appendChild(courseElement);
        total += course.credits;
    });

    totalCredits.textContent = total;
}
