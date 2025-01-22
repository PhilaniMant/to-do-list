document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            
            // Get input values
            const taskTitle = document.getElementById('input-box').value;
            const taskDescription = document.getElementById('description').value;

            if (taskTitle === '' || taskDescription === '') {
                alert('Please provide both title and description');
                return;
            }

            // Save the task to local storage
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push({ title: taskTitle, description: taskDescription });
            localStorage.setItem('tasks', JSON.stringify(tasks));

            // Redirect to home page
            window.location.href = '/home.html';
        });
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('task-item');
            li.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <button onclick="deleteTask(this)">Delete</button>
            `;
            document.getElementById('task-list').appendChild(li);
        });
    }

    function deleteTask(button) {
        const task = button.parentElement;
        task.remove(); // Remove the task from the list
        removeTask(task.querySelector('h3').innerText);
    }

    function removeTask(title) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.title !== title);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks when the page loads
    if (document.getElementById('task-list')) {
        loadTasks();
    }
});