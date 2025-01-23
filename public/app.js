document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            
            // Get input values
            const taskTitle = document.getElementById('input-box').value;
            const taskDescription = document.getElementById('description').value;
             const taskId = document.getElementById('task-id').value;

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
                <button onclick="completeTask('${task.id}', this)">Completed</button>
            `;
            document.getElementById('task-list').appendChild(li);
        });
    }

    window.deleteTask = function (button) {
        const task = button.parentElement;
        const taskTitle = task.querySelector('h3').innerText;

        // Remove the task from the DOM
        task.remove();

        // Remove the task from local storage
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t.title !== taskTitle);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    window.completeTask = function(taskId, button) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => task.id === taskId ? { ...task, completed: true } : task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Mark the task as completed in the DOM
        const task = button.parentElement;
        task.classList.add('completed');
    
    }

    // Load tasks when the page loads
    if (document.getElementById('task-list')) {
        loadTasks();
    }
});