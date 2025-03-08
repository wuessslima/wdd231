const courses = [
    { code: "CSE 110", name: "Programming Building Blocks", credits: 3, completed: true },
    { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "CSE 111", name: "Programming with Functions", credits: 3, completed: false },
    { code: "CSE 210", name: "Programming with Classes", credits: 3, completed: false },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, completed: false },
    { code: "WDD 231", name: "Advanced Web Development", credits: 3, completed: false },
  ];
  
  const courseList = document.getElementById('course-list');
  
  function displayCourses(filter = 'all') {
    courseList.innerHTML = '';
    courses.forEach(course => {
      if (filter === 'all' || course.code.startsWith(filter)) {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
          <h3>${course.code}</h3>
          <p>${course.name}</p>
          <p>Credits: ${course.credits}</p>
          <p>Status: ${course.completed ? 'Completed' : 'In Progress'}</p>
        `;
        courseList.appendChild(card);
      }
    });
  }
  
  document.getElementById('show-all').addEventListener('click', () => displayCourses('all'));
  document.getElementById('show-cse').addEventListener('click', () => displayCourses('CSE'));
  document.getElementById('show-wdd').addEventListener('click', () => displayCourses('WDD'));
  
  displayCourses();