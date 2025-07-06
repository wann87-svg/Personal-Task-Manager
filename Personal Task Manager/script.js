// --- JavaScript untuk fungsi ---
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const emptyMessage = document.getElementById('emptyMessage');

// Fungsi untuk mengambil tugas dari localStorage
function getTasks() {
    const tasksString = localStorage.getItem('tasks');
    return tasksString ? JSON.parse(tasksString) : [];
}

// Fungsi untuk menyimpan tugas ke localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fungsi untuk menampilkan tugas
function renderTasks() {
    const tasks = getTasks();
    taskList.innerHTML = ''; 

    if (tasks.length === 0) {
        emptyMessage.style.display = 'block';
        taskList.appendChild(emptyMessage);
        return;
    } else {
        emptyMessage.style.display = 'none';
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        if (task.completed) {
            li.classList.add('completed');
        }

        const formCheckDiv = document.createElement('div');
        formCheckDiv.classList.add('form-check');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('form-check-input');
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompleted(index));

        const taskText = document.createElement('label');
        taskText.classList.add('form-check-label', 'task-text');
        taskText.textContent = task.text;

        formCheckDiv.appendChild(checkbox);
        formCheckDiv.appendChild(taskText);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-delete');
        deleteButton.innerHTML = '&times;';
        deleteButton.title = 'Hapus Tugas';
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteTask(index);
        });

        li.appendChild(formCheckDiv);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Fungsi untuk menambahkan tugas
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const tasks = getTasks();
        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);
        taskInput.value = ''; 
        renderTasks(); 
    } else {
        alert('Tugas tidak boleh kosong!');
    }
});

// Event listener untuk tombol 'Enter' pada input tugas
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTaskBtn.click();
    }
});

// Fungsi untuk menandai tugas selesai/belum selesai
function toggleTaskCompleted(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed; 
    saveTasks(tasks);
    renderTasks(); 
}

// Fungsi untuk menghapus tugas
function deleteTask(index) {
    if (confirm('Anda yakin ingin menghapus tugas ini?')) {
        const tasks = getTasks();
        tasks.splice(index, 1); 
        saveTasks(tasks);
        renderTasks();
    }
}

// Muat tugas saat halaman pertama kali dibuka
document.addEventListener('DOMContentLoaded', renderTasks);