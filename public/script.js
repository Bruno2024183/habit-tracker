document.getElementById('habit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('habit-name').value;
    const description = document.getElementById('habit-description').value;
    
    // Obtener la hora de finalización ingresada
    const completionTime = document.getElementById('habit-completion-time').value;

    const response = await fetch('/api/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, completionTime })
    });
    
    await response.json();
    loadHabits();
});

// Load habits and display them on the calendar
async function loadHabits() {
    try {
        const response = await fetch('/api/habits');
        const habits = await response.json();

        if (!Array.isArray(habits)) {
            throw new Error('Expected an array of habits');  // Añade un mensaje de error si no es un array
        }

        const habitList = document.getElementById('habit-list');
        habitList.innerHTML = habits.map(habit => `
            <div>
                <strong>${habit.name}</strong>: ${habit.description} 
                <p>Status: ${habit.status} | Streak: ${habit.streak}</p>
                <button onclick="updateStatus(${habit.id}, 'completed')">Mark as Completed</button>
                <button onclick="updateStatus(${habit.id}, 'skipped')">Mark as Skipped</button>
                <button onclick="deleteHabit(${habit.id})">Delete</button>
            </div>
        `).join('');

        loadCalendar(habits);  // Cargar el calendario con los hábitos
    } catch (err) {
        console.error('Error loading habits:', err);  // Añade logs detallados del error
    }
}

// Initialize and load the calendar
function loadCalendar(habits) {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: habits
            .filter(habit => habit.status === 'completed')
            .map(habit => ({
                title: habit.name,
                start: habit.completionTime, // Use habit's completion time for the event
                backgroundColor: '#28a745'
            }))
    });
    calendar.render();
}

// Fetch prediction and display suggested best time
async function loadPrediction() {
    const response = await fetch('/api/habits/prediction');
    const prediction = await response.json();

    const predictionContainer = document.getElementById('prediction');
    predictionContainer.innerHTML = `Optimal Time to Complete Habits: ${prediction.bestCompletionHour}:00`;
}

// Update habit status (e.g., completed or skipped)
async function updateStatus(id, status) {
    await fetch(`/api/habits/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
    loadHabits();
}

// Delete a habit
async function deleteHabit(id) {
    await fetch(`/api/habits/${id}`, { method: 'DELETE' });
    loadHabits();
}

// Fetch prediction and display suggested best time
async function loadPrediction() {
    const response = await fetch('/api/habits/prediction');
    const prediction = await response.json();

    const predictionContainer = document.getElementById('prediction');
    predictionContainer.innerHTML = `Optimal Time to Complete Habits: ${prediction.bestCompletionHour}:00`;
}

// Initial loading of habits and prediction
loadHabits();
loadPrediction();