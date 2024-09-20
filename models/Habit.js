const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Habit = sequelize.define('Habit', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM('completed', 'pending', 'skipped'),
        defaultValue: 'pending'
    },
    streak: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    completionTime: {
        type: DataTypes.DATE, // Nueva columna para almacenar la fecha y hora de finalización
        allowNull: true, // Puede ser nulo si el hábito no ha sido completado
    }
}, {
    timestamps: true
});

module.exports = Habit;