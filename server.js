const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Updated path for database.js
const habitRoutes = require('./routes/habitRoutes'); // Updated path for habitRoutes.js

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serves static files from the public directory

// Use Habit Routes
app.use('/api', habitRoutes);

// Sync database and start the server
sequelize.sync({ force: false }) // This will NOT drop tables, it will just create them if they don't exist
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.log('Error syncing database:', err));