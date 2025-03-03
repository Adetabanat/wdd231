const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands-on with students actually participating in simple web designs and programming.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

function toggleMenu() {
    document.getElementById("nav-menu").classList.toggle("hidden");
}

function updateFooter() {
    const currentYear = new Date().getFullYear();
    document.getElementById("current-year").textContent = currentYear;
    document.getElementById("last-modified").textContent = document.lastModified;
}

function renderCourses(coursesToRender) {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = "";

    let totalCredits = 0;

    coursesToRender.forEach((course) => {
        const courseDiv = document.createElement("div");
        courseDiv.className = `course ${course.completed ? "completed" : "not-completed"}`;
        courseDiv.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            
        `;
        courseList.appendChild(courseDiv);
        totalCredits += course.credits;
    });

    document.getElementById("total-credits").textContent = totalCredits;
}

function filterCourses(type) {
    if (type === "all") {
        renderCourses(courses);
    } else {
        const filteredCourses = courses.filter((course) => course.subject === type);
        renderCourses(filteredCourses);
    }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
    updateFooter();
    renderCourses(courses);
});
