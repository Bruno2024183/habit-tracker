const Habit = require('../models/Habit');

exports.getAllHabits = async (req, res) => {
    try {
        const habits = await Habit.findAll();
        console.log(habits);  // Añadir un console.log para revisar qué se está devolviendo
        res.json(habits);
    } catch (err) {
        console.error('Error fetching habits:', err); // Añade un log detallado del error
        res.status(500).json({ error: 'Failed to fetch habits' });
    }
};

// Create a new habit
exports.createHabit = async (req, res) => {
    try {
        const { name, description, completionTime } = req.body;
        
        // Crear el hábito con completionTime
        const habit = await Habit.create({ 
            name, 
            description, 
            completionTime: completionTime ? new Date(`1970-01-01T${completionTime}:00Z`) : null 
        });
        
        res.status(201).json(habit);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create habit' });
    }
};

// Update habit status (completed, pending, skipped)
exports.updateHabitStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const habit = await Habit.findByPk(id);

        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }

        if (['completed', 'pending', 'skipped'].includes(status)) {
            habit.status = status;

            // Update streak and log completion time if marked as completed
            if (status === 'completed') {
                habit.streak += 1;
                habit.completionTime = new Date(); // Log the time the habit was completed
            } else if (status === 'skipped') {
                habit.streak = 0; // Reset streak if skipped
            }
            
            await habit.save();
            res.json(habit);
        } else {
            res.status(400).json({ error: 'Invalid status' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update habit status' });
    }
};

// Delete habit
exports.deleteHabit = async (req, res) => {
    try {
        const { id } = req.params;
        const habit = await Habit.findByPk(id);

        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }

        await habit.destroy();
        res.json({ message: 'Habit deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete habit' });
    }
};

// Predict best time to complete habits
exports.getHabitPrediction = async (req, res) => {
    try {
        const completedHabits = await Habit.findAll({ where: { status: 'completed' } });
        
        if (completedHabits.length === 0) {
            return res.status(404).json({ error: 'No completed habits found' });
        }

        // Log para ver si los hábitos completados llegan correctamente
        console.log('Completed Habits:', completedHabits);

        // Obtener la hora promedio de finalización
        const hours = completedHabits.map(habit => habit.completionTime ? habit.completionTime.getHours() : null).filter(hour => hour !== null);

        if (hours.length === 0) {
            return res.status(404).json({ error: 'No valid completion times found' });
        }

        const averageHour = Math.floor(hours.reduce((a, b) => a + b, 0) / hours.length);
        res.json({ bestCompletionHour: averageHour });
    } catch (err) {
        console.error('Error predicting best completion time:', err); // Log detallado
        res.status(500).json({ error: 'Failed to predict best time' });
    }
};