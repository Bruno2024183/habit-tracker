const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

// GET all habits
router.get('/habits', habitController.getAllHabits);

// POST create a new habit
router.post('/habits', habitController.createHabit);

// PUT update habit status
router.put('/habits/:id/status', habitController.updateHabitStatus);

// DELETE a habit
router.delete('/habits/:id', habitController.deleteHabit);

// Predictive analysis
router.get('/habits/prediction', habitController.getHabitPrediction);

module.exports = router;